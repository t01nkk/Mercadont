var GoogleStrategy = require("passport-google-oauth20");
var passport = require("passport");
const { User } = require("../db");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const { v4: uuidv4 } = require("uuid");

const createUuid = async () => {
  const id = uuidv4();
  const exists = await User.findByPk(id);
  if (!exists) {
    return id;
  } else createUuid();
};

const create = async (profile) => {
  await User.findOrCreate({
    where: {
      name: profile.displayName,
      lastname: profile.name.givenName,
      email: profile.name.familyName,
      image: profile?._json?.image?.url || "",
      userCreated: true,
    },
  });
};

const findUser = async (email) => {
  await User.findOne({ where: { email: email } });
};

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.REACT_APP_DOMAIN}/user/googleAuth`,
    },
    async function (accessToken, refreshToken, profile, done) {
      const exists = await findUser(profile?.emails[0]?.value);
      if (exists) {
        return done(null, profile);
      } else {
        await User.findOrCreate({
          where: {
            name: profile.displayName,
            lastname: profile.name.givenName,
            email: profile.emails[0]?.value,
            image: profile?._json?.image?.url || "",
            userCreated: true,
          },
        });
        return done(null, profile);
      }
    }
  )
);

passport.serializeUser(async (user, done) => {
  if (user.emails) {
    const UserId = await User.findOne({
      where: { email: user.emails[0]?.value },
    });
    done(null, UserId.dataValues.id);
  } else {
    done(null, user.id);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const UserId = await User.findOne({ where: { id } }); // lo busacamos en la base de datos
    done(null, UserId); // devolvemos el usuario
  } catch (err) {
    done(err);
  }
});
