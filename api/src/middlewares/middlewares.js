const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email)
        if (user === null) {
            return done(null, false, { msg: 'No user with that email' });
        }
        try {
            // console.log(user.dataValues.password);
            if (await bcrypt.compare(password, user.dataValues.password)) {
                return done(null, user);
            }
        } catch (err) {
            return done(err)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.dataValues.id))
    passport.deserializeUser((id, done) => done(null, getUserById(id)))
}

// passport.use(new Strategy(
//     function(username, password, done) {
//       db.users.findByUsername(username)
//         .then((user) => {
//           if(!user) {
//             return done(null, false);
//           }
//           if(user.password != password) {
//             return done(null, false);
//           }
//           return done(null, user);
//         })
//       .catch(err => {
//         return done(err);
//       })
//     }));

// function initialize(passport, getUserByEmail, getUserById) {
//     console.log(passport)
//     const authenticateUser = async (email, password, done) => {
//         const user = getUserByEmail(email)
//         if (user === null) {
//             return done(null, false, { msg: 'No user with that email' });
//         }
//         try {
//             if (await bcrypt.compare(password, user.password)) {
//                 return done(null, user);
//             }
//         } catch (err) {
//             return done(err)
//         }
//     }
//     passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
//     passport.serializeUser((user, done) => done(null, user.id))
//     passport.deserializeUser((id, done) => done(null, getUserById(id)))
// }

module.exports = {
    initialize
}