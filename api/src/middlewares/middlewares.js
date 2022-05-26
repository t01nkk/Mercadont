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

function validateInputUser(name, lastname, email, password){
    let errors = [];
    if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) errors.push("Email address is not valid");
    if(!name || name.length > 30) errors.push("Name is not valid");
    if(!lastname || lastname.length > 30) errors.push("Last name is not valid");
    if(!/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/.test(password)) errors.push("Password must have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long");
    //VALIDATE PAYMENT AND ADDRESS??????????? 
    return errors;
}

function validateInputProduct(name,price,description,image,stock,categories){
    let errors = [];
    if(!name || name.length > 60) errors.push("Name is not valid");
    if(!price || price < 1) errors.push("Price is not valid");
    if(!description) errors.push("Description is not valid");
    if(!image) errors.push("Please, add at least one image of the product");
    if(!stock || stock < 1) errors.push("Stock is not valid");
    if(!categories.length) errors.push("Please, add at least one category that the product belongs to");
    return errors;
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
    initialize,
    validateInputUser,
    validateInputProduct
}