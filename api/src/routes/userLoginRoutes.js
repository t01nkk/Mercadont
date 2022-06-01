const { Router } = require("express");
const router = Router();
const passport = require("passport");
const { auth } = require("../middlewares/PasswordUtils");
const { genPassword } = require("../middlewares/PasswordUtils");
const { User } = require("../db");

router.get('/findUser', async (req, res) => {
  const { email } = req.body;
  let find = await User.findOne({ where: { email: email } })
  if (find) res.send(find);
  else res.status(404).send({ msg: "This user doesn't exist" });
})

router.post("/register", async (req, res, next) => {
  // const { email, password } = req.body;
  const { name, lastname, email, password, address, image, payment } = req.body;
  if (!password) throw new Error({ msg: "Password is required" });
  try {
    const userExist = await User.findOne({ where: { email: email } });
    // console.log(userExist ? userExist : null, "HERE BE USER");
    if (!userExist) {
      await User.create({
        email: email,
        password: genPassword(password),
        name: name,
        lastname: lastname,
        address: address,
        image: image,
        payment: payment,
        created: true
      });

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
  console.log(req.session)
  res.send(req.session);
});

router.get("/fail", (req, res) => {
  try {
    return res.send({ msg: "Something went wrong" });
  } catch (err) {
    console.log(err);
  }
});


// router.get("/logout", auth, (req, res, next) => {
//   req.logout();
//   res.redirect("/login");
// });

router.post('/logout', function (req, res, next) {
  try {
    req.logout(function (err) {
      if (err) { return next(err); }
      res.redirect('/user');
    });

  } catch (err) {
    console.log(err.message);
  }
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

router.post("/login", passport.authenticate("local", {
  failureRedirect: "/user/fail",
  successRedirect: "/user/Profile/auth",
})
);

///////////////// GOOGLE ///////////////////

require("../middlewares/googleauth")

router.get('/login/google', passport.authenticate('google', {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ],
  session: true,
  failureRedirect: '/login',
  failureMessage: true
}));

router.get('/googleAuth',
  passport.authenticate('google'),
  function (req, res) {
    res.redirect('/user/Profile/auth');
  });

// server.use(
//   "/login/google",
//   passport.authenticate("google", {
//     scope: [
//       "https://www.googleapis.com/auth/userinfo.profile",
//       "https://www.googleapis.com/auth/userinfo.email",
//     ],
//     session: true,
//     failureRedirect: '/login',
//     failureMessage: true
//   })
// );

/*-------------------------------------------------------------- */
/*-------------------------Emails------------------------------- */

module.exports = router;