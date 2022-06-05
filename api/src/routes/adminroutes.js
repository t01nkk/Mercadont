const { SESSION_SECRET } = process.env;
const { User } = require("../db");
const { Router } = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const {
  validateInputUser,
  checkAuthenticated,
} = require("../middlewares/middlewares");
const router = Router();

//Working - Users needs to be logged-in to create. Credencials only check is user is logged-in, not if the user has admin credencials.
//Register a new Admin user
// router.post("/register", async (req, res) => {
//   const { name, lastname, email, password } = req.body;
//   // let errors = validateInputUser(name,lastname,email,password)
//   // if(errors.length) return res.status(400).send({ msg: errors});
//   const exists = await User.findOne({ where: { email: email } });

//   try {
//     if (!exists) {
//       const hashPass = await bcrypt.hash(password, 10);
//       await User.create({
//         name,
//         lastname,
//         email,
//         password: hashPass,
//         isAdmin: true,
//       });
//       res.status(201).send("New Admin User Created");
//     } else {
//       res.status(400).send({ msg: "This user already exists" });
//     }
//   } catch (error) {
//     res.status(401).send(error);
//   }
// });
// Working
//Get all Users
router.get("/users", checkAuthenticated, async (req, res) => {
  try {
    const user = await User.findAll();
    if (!user) {
      return res.status(404).send("Users Not Found");
    }
    return res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});
// Working
//Get User details
router.get("/users/:id", checkAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: { id: id },
    });
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    return res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

//Get Banned Users
router.get("/bannedUsers", checkAuthenticated, async (req, res) => {
  try {
    const user = await User.findAll({
      where: { banned: true },
    });
    if (!user) {
      return res.status(404).send("There aren't any banned users yet");
    }
    return res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

//Get Admin Users
router.get("/adminUsers", checkAuthenticated, async (req, res) => {
  try {
    const user = await User.findAll({
      where: { isAdmin: true },
    });
    if (!user) {
      return res.status(404).send("There aren't any Admin users yet");
    }
    return res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

//Give user Admin credencials
router.put("/setAdmin", checkAuthenticated, async (req, res) => {
  const { email } = req.body;
  // const setAdmin = true;
  // const { setAdmin } = req.body;
  if (setAdmin !== undefined || setAdmin !== null) {
    try {
      const isAdmin = await User.update(
        {
          isAdmin: true,
        },
        { where: { email: email } }
      );
      return res.status(200).send(isAdmin);
    } catch (error) {
      console.log("error:", error);
      return res.status(400).send(error);
    }
  }
});

//Ban user
router.put("/ban/:id", checkAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { setBan } = req.body;

  if (setBan !== undefined || setBan !== null) {
    try {
      const bannedUser = await User.update(
        {
          banned: setBan,
        },
        { where: { id: id } }
      );
      return res.status(200).send(bannedUser);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
});

//ADMIN
router.post("/getAdmin", async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findOne({
      where: { id: id },
    });
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    return res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
