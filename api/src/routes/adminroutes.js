const { User, PurchaseOrder, Qa, Product } = require("../db");
const { Router } = require("express");
const { Sequelize, Op } = require("sequelize");
const router = Router();
const createdOrders = require("../../purchaseOrders.json");

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
  let setAdmin = true;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (user.isAdmin) {
      setAdmin = false;
    }
    const isAdmin = await User.update(
      {
        isAdmin: setAdmin,
      },
      { where: { email: email } }
    );
    return res.status(200).send(isAdmin);
  } catch (error) {
    console.log("error:", error);
    return res.status(400).send(error);
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

// Creates many orders to test ORDER PURCHASE ORDERS BY DATE
router.get("/loadOrders", async (req, res) => {
  try {
    for (order of createdOrders) {
      const newOrder = await PurchaseOrder.create({
        orderId: order.orderId,
        userId: order.userId,
        productId: order.productId,
        productQuantity: order.productQuantity,
        totalAmount: order.totalAmount,
        date: order.date,
        status: order.status,
      });
      // console.log("newOrder:",newOrder)
    }
    res.status(200).send("Orders created");
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get PURCHASE ORDERS by date
router.get("/history", async (req, res) => {
  const { startDate, endDate } = req.body;
  let orders = [];

  try {
    const userHistory = await PurchaseOrder.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      group: PurchaseOrder.date,
    });
    // console.log("userHistory:", userHistory)
    if (!userHistory.length) {
      return res.status(200).send([]);
    }
    let order = {
      orderNumber: "",
      date: "",
      products: [],
      amount: 0,
    };
    order.orderNumber === userHistory[0].orderId;
    order.date === userHistory[0].date;
    order.amount === userHistory[0].totalAmount;

    for (let item of userHistory) {
      if (order.orderNumber === item.orderId) {
        order.products.push({
          product: item.productId,
          productQuantity: item.productQuantity,
        });
      } else {
        if (order.orderNumber !== "") orders.push(order);
        order = {
          orderNumber: "",
          date: "",
          products: [],
          amount: 0,
        };
        order.orderNumber = item.orderId;
        order.date = item.date;
        order.amount = item.totalAmount;
        order.products.push({
          product: item.productId,
          productQuantity: item.productQuantity,
        });
      }
    }
    orders.push(order);
    return res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    return res.status(404).send(error);
  }
});

//Answer Question / Add Answer
router.put("/:questionId/answer", async (req, res) => {
  const { questionId } = req.params
  const { answer } = req.body

  if (!answer || answer.length < 1) {
      return res.status(404).send("Answer must not be empty")
  }

  try {
      await Qa.update({
          answer,
          resolved: true,
      }, { where: { id: questionId } })

      const userMail = await Qa.findOne({
        // include: { all: true }
        include:{
          model: User,
          through: { attributes: [] }
        },
        where:{
          id: questionId
        }
      })
      console.log("userMail:", userMail.dataValues)
      console.log("userMail.qa.dataValues.users:", userMail.dataValues.users[0].dataValues.email)

      return res.status(200).send("Answer Added")
  }
  catch (err) {
      console.log(err)
      res.status(400).send(err)
  }
})

router.get("/all/:resolved", async (req, res) => {
  const { resolved } = req.params;
  try {
    if (resolved == "true") {
      const allQuestions = await Qa.findAll({
          include: [
              {
                  model: Product,
                  attributes: ["id", "name"],
                  through: { attributes: [] },
              },
              {
                  model: User,
                  attributes: ["id"],
                  through: { attributes: [] },
              },
          ],
          where:{resolved: true}
      });
      return res.send(allQuestions);
  } else if(resolved == "false") {    
      const unresolvedOnly = await Qa.findAll({
          where: { resolved: false },
          include: [
              {
                  model: Product,
                  attributes: ["id", "name"],
                  through: { attributes: [] },
              },
              {
                  model: User,
                  attributes: ["id"],
                  through: { attributes: [] },
              },
          ]
      });
      if (unresolvedOnly) return res.send(unresolvedOnly);
    }
    const all = await Qa.findAll({
      include: [
          {
              model: Product,
              attributes: ["id", "name"],
              through: { attributes: [] },
          },
          {
              model: User,
              attributes: ["id"],
              through: { attributes: [] },
          },
      ]
  });
    return res.send(all)
  } catch (error) {
    console.log(error.message)
    res.status(404).send({ message: error.message });
  }
  
});

module.exports = router;
