const { User } = require("../db");
const { Router } = require("express");
const router = Router();

// Working
//Get all Users
router.get("/users", async (req, res) => {
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
router.get("/users/:id", async (req, res) => {
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
router.get("/bannedUsers", async (req, res) => {
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
router.get("/adminUsers", async (req, res) => {
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
router.put("/setAdmin", async (req, res) => {
  const { email } = req.body;
  const setAdmin = true;
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
      
      return res.status(400).send(error);
    }
  }
});

//Ban user
router.put("/ban/:id", async (req, res) => {
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
