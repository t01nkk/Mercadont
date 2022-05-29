const { Router } = require("express");
const router = Router();
const passport = require("passport");
const { auth } = require("../middlewares/PasswordUtils");
const { genPassword } = require("../middlewares/PasswordUtils");
const { User } = require("../db");
// const axios = require('axios');

// router.get('/SignIn', (req, res, next)=>{
//   const form = '<h1>Register Page</h1><form method="post" action="/SignIn">\
//                     Enter Username:<br><input type="text" name="username">\
//                     <br>Enter Password:<br><input type="password" name="password">\
//                     <br><br><input type="submit" value="Submit"></form>';

//     res.send(form)
// })

// router.get('/login', (req, res, next)=>{
//   const form = '<h1>Login Page</h1><form method="POST" action="/login">\
//     Enter Username:<br><input type="text" name="username">\
//     <br>Enter Password:<br><input type="password" name="password">\
//     <br><br><input type="submit" value="Submit"></form>';
//   res.send(form)
// })

// router.get('/', (req, res, next)=>{
//     res.status(200).send('<h1>Home</h1><p>Please <a href="/SignIn">register</a></p>');
// })

router.post("/register", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userExist = await User.findOne({ where: { email: email } });
    console.log(userExist ? userExist : null, "HERE BE USER");
    if (!userExist) {
      await User.create({ email: email, password: genPassword(password) });

      res.send({ msg: "User Registered" });
    } else {
      res.status(401).send("Username is already taken");
    }
  } catch (err) {
    next(err);
  }
});

router.get("/Profile/auth", auth, (req, res, next) => {
  //Create auth

  res.send(req.session);
});

router.get("/fail", (req, res) => {
  try {
    return res.send({ msg: "Something went wrong" });
  } catch (err) {
    console.log(err);
  }
});

router.post(
  "/login",

  passport.authenticate("local", {
    failureRedirect: "/user/fail",
    successRedirect: "/user/Profile/auth",
  })
);

router.get("/logout", auth, (req, res, next) => {
  req.logout();
  res.redirect("/login");
});

router.post("/findUser", async (req, res) => {
  const { id } = req.body;
  let userInfo = await User.findOne({ where: { id: id } });
  if (userInfo) res.send(userInfo);
  else res.status(404).send({ msg: "This user doesn't exist" });
});

router.get("/findAll", async (req, res) => {
  const all = await User.findAll();
  try {
    return res.send(all);
  } catch (err) {
    console.log(err);
  }
});

/*-------------------------------------------------------------- */
/*-------------------------Emails------------------------------- */

module.exports = router;
