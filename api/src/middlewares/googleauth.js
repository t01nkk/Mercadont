var GoogleStrategy = require('passport-google-oauth20');
// const { OAuth2Strategy as GoogleStrategy } =require ("passport-google-oauth");
var passport = require('passport');
const { User } = require("../db");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const { v4: uuidv4 } = require('uuid');

const createUuid = async () => {
    const id = uuidv4()
    const exists = await User.findByPk(id)
    if (!exists) {
        console.log("soy Id papu", id)
        return id;
    } else createUuid()
};

const create = async (profile) => {
    await User.findOrCreate({
        where: {
            name: profile.displayName,
            lastname: profile.name.givenName,
            email: profile.name.familyName,
            image: profile?._json?.image?.url || '',
            userCreated: true
        }
    })
}

const findUser = async (email) => {
    await User.findOne({ where: { email: email } })
}


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/user/googleAuth'
},
    async function (accessToken, refreshToken, profile, done) {
        console.log("SOY EL PROFILE", profile)
        const exists = await findUser(profile?.emails[0]?.value)
        if (exists) {
            done(null, profile);
        } else {
            await User.findOrCreate({
                where: {
                    id: await createUuid(),
                    name: profile.displayName,
                    lastname: profile.name.givenName,
                    email: profile.emails[0]?.value,
                    image: profile?._json?.image?.url || '',
                    userCreated: true
                }
            })
            done(null, profile);
        }
    }
));

passport.serializeUser(async (user, done) => {
    console.log("SOY EMAIL", user)
    if (user.emails) {
        const UserId = await User.findOne({ where: { email: user.emails[0]?.value } });
        console.log("serializeUser", UserId); //usuario logueado
        console.log("soy userid", user.id); //id hgenerado en la tabla
        done(null, UserId.dataValues.id);

    } else {
        done(null, user.id);
    }
});

passport.deserializeUser(async (id, done) => {
    console.log("soy userid deserialise", id); // recive id de la sesion
    try {
        const UserId = await User.findOne({ where: { id } }); // lo busacamos en la base de datos
        console.log("soy userid deserialise base", UserId);
        done(null, UserId); // devolvemos el usuario
    } catch (err) {
        done(err);
    }
});