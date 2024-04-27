const { Router } = require("express");
const router = Router();
const { User, Product, PurchaseOrder } = require("../db");
const { groupPurchaseOrders } = require("../middlewares/middlewares");

/*-------------------------------------------------------------- */
/*-------------------------UserInfo------------------------------- */

// Get User
router.get("/details/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: { id: id },
      include: { all: true },
    });

    if (!user) {
      return res.status(404).send("User Not Found");
    }

    return res.status(200).send(user);

  } catch (error) {
    console.log("error:", error);
    res.status(404).send(error);
  }
});

// Update User
router.put("/details/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, lastname, image, country, province, city, street, postalCode } = req.body;
  // let errors = validateInputUser(name,email);
  // if (errors.length) return res.status(400).send({ msg: errors });

  try {
    const updatedUser = await User.update(
      {
        name: name,
        lastname: lastname,
        email: email,
        country: country,
        province: province,
        city: city,
        street: street,
        postalCode: postalCode,
        image: image

      },
      { where: { id: id } }
    );
    return res.status(202).send(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

/*-------------------------------------------------------------- */
/*-------------------------Favorites-----------------------------*/

router.post("/addFavorite", async (req, res) => {
  const { idUser, idProduct } = req.body;
  try {
    const user = await User.findOne({ where: { id: idUser } });
    const favoriteProduct = await Product.findOne({ where: { id: idProduct } });
    const favorite = await user.addProduct(favoriteProduct);
    return res.status(200).send(favorite);
  } catch (error) {
    console.log("error:", error);
    return res.status(404).send({ msg: error });
  }
});

router.delete("/removeFavorite", async (req, res) => {
  const { idUser, idProduct } = req.body;
  try {
    const user = await User.findOne({ where: { id: idUser } });
    const favoriteProduct = await Product.findOne({ where: { id: idProduct } });
    await user.removeProduct(favoriteProduct);
    return res.status(200).send("Favorite removed");
  } catch (error) {
    return res.status(404).send({ msg: error });
  }
});

// Get User's favorites
router.get("/favorite/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const userFavorites = await User.findOne({
      include: {
        model: Product,
        through: {
          attributes: [],
        },
      },
      where: { id: id },
    });
    if (!userFavorites) {
      return res.status(404).send("User Not Found");
    }
    return res.status(200).send(userFavorites.products);
  } catch (error) {
    return res.status(404).send(error);
  }
});

/*-------------------------------------------------------------- */
/*---------------------Purchase History--------------------------*/

// Get User's purchase history
router.get("/history/:id", async (req, res) => {
  const { id } = req.params;
  let orders = [];

  try {
    const userHistory = await PurchaseOrder.findAll({
      where: {
        userId: id,
        paymentStatus: "completed"
      },
    });
    if (!userHistory.length) {
      return res.status(200).send([]);
    }

    let userPurchaseOrders = groupPurchaseOrders(userHistory)
    return res.status(200).send(userPurchaseOrders)
  } catch (error) {
    return res.status(404).send(error);
  }
});

router.post('/product/history', async (req, res) => {
  const { order } = req.body;
  var foundProducts = [];
  try {
    for (var i = 0; i < order.length; i++) {
      let found = await Product.findOne({ where: { id: order[i] } });
      if (!found) {
        console.log({ msg: `The product id:  ${order[i]}  doesn't exist` })
        return res.status(404).send({ msg: `The product id:  ${order[i]}  doesn't exist` })
      }
      foundProducts.push(found);
    }
    res.send(foundProducts);
  } catch (err) {
    console.log("This be err.message:  ", err.message);
    res.status(404).send({ msg: err.message })
  }
})


module.exports = router;
