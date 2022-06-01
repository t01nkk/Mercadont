const { Router } = require("express");
const router = Router();
const passport = require("passport");
const { auth } = require("../middlewares/PasswordUtils");
const { genPassword } = require("../middlewares/PasswordUtils");
const { User, Product } = require("../db");
const { validateInputUser } = require("../middlewares/middlewares");
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

/*-------------------------------------------------------------- */
/*-------------------------Login------------------------------- */

router.get('/findUser', async (req, res) => {
  const { email } = req.body;
  let find = await User.findOne({ where: { email: email } })
  if (find) res.send(find);
  else res.status(404).send({ msg: "This user doesn't exist" });
})

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

// router.get("/logout", auth, (req, res, next) => {
//   req.logout();
//   res.redirect("/login");
// });

router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/user');
  });
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

/*-------------------------------------------------------------- */
/*-------------------------UserInfo------------------------------- */

// Get User
router.get("/details/:id", async (req, res) => {
  const { id } = req.params

  try {
      const user = await User.findOne({
          where: { id: id },
      });
      if (!user) {
          return res.status(404).send("User Not Found")
      }
      return res.status(200).send(user)

  } catch (error) {
    console.log("error:",error)
    res.status(404).send(error)
  }
});

// Update User
router.put("/details/:id", async (req, res) => {
  const { id } = req.params
  const { name, lastname, email, password, address, image, payment } = req.body;

  let errors = validateInputUser(name, lastname, email, password)
  if (errors.length) return res.status(400).send({ msg: errors });

  try {
      const updatedUser = await User.update(
          {
              name: name,
              lastname: lastname,
              email: email,
              password: password,
              address: address,
              image: image,
              payment: payment,
          },
          { where: { id: id } }
      );
      return res.status(202).send(updatedUser)

  } catch (error) {
      res.status(400).send(error)
  }
});

/*-------------------------------------------------------------- */
/*-------------------------Favorites-----------------------------*/

router.post('/addFavorite', async (req, res) =>{
  const {idUser, idProduct} = req.body
  try {
    const user = await User.findOne({where: {id:idUser}});
    const favoriteProduct = await Product.findOne({where: {id:idProduct}});
    const favorite = await user.addProduct(favoriteProduct);
    return res.status(200).send(favorite);
  } catch (error) {
    console.log("error:", error)
    return res.status(404).send({ msg: error});
  }
})

router.delete('/removeFavorite', async (req, res) =>{
  const {idUser, idProduct} = req.body
  try {
    const user = await User.findOne({where: {id:idUser}});
    const favoriteProduct = await Product.findOne({where: {id:idProduct}});
    await user.removeProduct(favoriteProduct);
    return res.status(200).send("Favorite removed");
  } catch (error) {
    return res.status(404).send({ msg: error});
  }
})

module.exports = router;
