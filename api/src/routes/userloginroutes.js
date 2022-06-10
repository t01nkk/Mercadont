const { Router } = require("express");
const router = Router();
const { User, Product, PurchaseOrder } = require("../db");


router.post("/register", async (req, res, next) => {
  const { name, lastname, email, address, image, payment, id } = req.body;
  try {
    const userExist = await User.findOne({ where: { email: email } });
    if (!userExist) {
      await User.create({
        email: email,
        name: name,
        lastname: lastname,
        address: JSON.stringify(address),
        image: image,
        payment: payment,
        id: id,
      });

      return res.send({ msg: "User Registered" });
    } else {
      await User.update(
        {
          name: name,
          lastname: lastname,
          email: email,
          address: address,
          image: image,
          id: id
        },
        { where: { email: email } }
      );

      return res.status(200).send("Existing user updated");
    }
  } catch (err) {
    next(err);
  }
});

//CURRENT LOGIN 

router.post("/login", async (req, res, next) => {
  // const { email, password } = req.body;
  const { name, email, image, id } = req.body;
  try {
    const userExist = await User.findOrCreate({
      where: { id: id }, defaults: {
        email: email,
        name: name,
        image: image,
        id: id,
      }
    }
    )

    res.send({ msg: "User Logged In" });
  }
  catch (err) {
    console.log(err)
  }
});



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
  const { name, email,lastname,image,country,province, city, street, postalCode } = req.body;
console.log(req.body.address)
 // let errors = validateInputUser(name,email);
 // if (errors.length) return res.status(400).send({ msg: errors });

  try {
    const updatedUser = await User.update(
      {
        name: name,
        lastname: lastname,
        email: email,
        address:JSON.stringify({country,province, city, street, postalCode}),
        image:image
     
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
        status: "completed" 
      },
    });
    if (!userHistory.length) {
      return res.status(200).send([]);
    }
    let order = {
      orderNumber: "",
      date: "",
      products:[],
      amount: 0,
    }
    order.orderNumber === userHistory[0].orderId
    order.date === userHistory[0].date
    order.amount === userHistory[0].totalAmount

    for(let item of userHistory){
      if(order.orderNumber === item.orderId) {
        order.products.push(
          {
            product: item.productId,
            productQuantity: item.productQuantity
          }
        )
      }else{
        if(order.orderNumber !== "") orders.push(order)
        order = {
          orderNumber: "",
          date: "",
          products:[],
          amount: 0,
        }
        order.orderNumber = item.orderId
        order.date = item.date
        order.amount = item.totalAmount
        order.products.push(
          {
            product: item.productId, 
            productQuantity: item.productQuantity
          }
        )
      }
    }
    orders.push(order)
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(404).send(error);
  }
});

module.exports = router;
