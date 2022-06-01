// const {
//     SESSION_SECRET
// } = process.env;
// const { User } = require("../db")
// const { Router } = require("express")
// const bcrypt = require("bcrypt")
// const passport = require('passport');
// const { initialize, validateInputUser } = require('../middlewares/middlewares');
// // const session = require('express-session');



// function checkAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/user/login');
// }

// function checkNotAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         res.redirect('/user')
//     }
//     next()
// }

// async function findUser(email) {
//     // console.log(email,)
//     const userEmail = await User.findOne({ where: { email: email } })
//     // console.log(userEmail)
//     return userEmail
// }

// async function findById(name) {
//     const userId = await User.findOne({ where: { name: name } });
//     return userId
// }

// initialize(passport, email => findUser(email), name => findById(name))

// //
// const router = Router()

// //Create User
// function getUser(user) {
//     return user
// }

// //
// router.get("/login", async (req, res) => {
//     return res.send({ msg: 'Failure to authenticate credentials' })
// })

// //Checked logged-in statussss
// router.get("/", async (req, res) => {
//     console.log(req,)
//     const users = await getUser(req.user);
//     if (users) { return res.status(200).send(users) }
//     try {
//         res.send({ msg: "Logged In" });

//     } catch (err) {
//         console.log({ msg: err.message });
//     }
// })

// //??
// router.get("/register", checkNotAuthenticated, async (req, res) => {
//     res.send({ msg: 'reg' })
// })

// //Log in with valid user
// router.post("/login", checkNotAuthenticated, passport.authenticate('local', {
//     successRedirect: '/user',
//     failureRedirect: '/user/login',
//     failureFlash: true
// })
//     , async (req, res) => {
//         const user = await getUser(req.user)
//         console.log(req)
//         // console.log(user)
//         if (user) {
//             res.status(200).send(user.dataValues)
//         } else {
//             return res.status(401).send({ msg: "you need to log in" })
//         }
//     }
// )

// //Log out from valid user
// router.post('/logout', function (req, res, next) {
//     req.logout(function (err) {
//         if (err) { return next(err); }
//         res.redirect('/user');
//     });
// });

// //Register a new user
// router.post("/register", checkNotAuthenticated, async (req, res) => {
//     if (req.user) {
//         return res.status(400).send({ message: "You can't register right now, you're already logged in!" })
//     }
//     const { name, lastname, email, password, address, image, payment } = req.body;

//     let errors = validateInputUser(name, lastname, email, password)
//     if (errors.length) return res.status(400).send({ msg: errors });

//     const exists = await User.findOne({ where: { email: email } });

//     try {
//         if (!exists) {
//             const hashPass = await bcrypt.hash(password, 10);
//             await User.create({ name, lastname, email, password: hashPass, address, image, payment });
//             res.status(201).send("New User Created")
//         } else {
//             res.status(400).send({ msg: "This user already exists" });
//         }

//     } catch (error) {
//         res.status(401).send(error)
//     }
// });

// //Get User
// router.get("/:id", checkAuthenticated, async (req, res) => {
//     const { id } = req.params

//     try {
//         const user = await User.findOne({
//             where: { id: id }
//         });
//         if (!user) {
//             return res.status(404).send("User Not Found")
//         }
//         return res.status(200).send(user)

//     } catch (error) {
//         res.status(404).send(error)
//     }
// });

// //Update User
// router.put("/:id", async (req, res) => {
//     const { id } = req.params
//     const { name, lastname, email, password, address, image, payment } = req.body;

//     let errors = validateInputUser(name, lastname, email, password)
//     if (errors.length) return res.status(400).send({ msg: errors });

//     try {
//         const updatedUser = await User.update(
//             {
//                 name: name,
//                 lastname: lastname,
//                 email: email,
//                 password: password,
//                 address: address,
//                 image: image,
//                 payment: payment,
//             },
//             { where: { id: id } }
//         );
//         return res.status(202).send(updatedUser)

//     } catch (error) {
//         res.status(400).send(error)
//     }
// });


// //Get Banned Users
// router.get("/ban/", async (req, res) => {

//     try {
//         const user = await User.findAll({
//             where: { banned: true }
//         });
//         if (!user) {
//             return res.status(404).send("There aren't any banned users yet")
//         }
//         return res.status(200).send(user)

//     } catch (error) {
//         res.status(404).send(error)
//     }
// });

// //Ban User
// router.put("/ban/:id", async (req, res) => {
//     const { id } = req.params;

//     try {
//         const bannedUser = await User.update(
//             {
//                 banned: true
//             },
//             { where: { id: id } });
//         res.status(200).send(bannedUser);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

// //Set Admin credencials

// router.put("/admin/:id", async (req, res) => {
//     const { id } = req.params;
//     const { status } = req.body;

//     try {
//         const setAdmin = await User.update(
//             {
//                 isAdmin: status
//             },
//             { where: { id: id } });
//         res.status(200).send(setAdmin);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });
// module.exports = router