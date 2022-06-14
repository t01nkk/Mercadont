const { User, PurchaseOrder, Qa, Product } = require("../db");
const { Router } = require("express");
const { Sequelize, Op } = require("sequelize");
const router = Router();
const createdOrders = require("../../purchaseOrders.json");
const { groupPurchaseOrders, mailQuestion, mailOrderRejected, mailOrderAccepted } = require("../middlewares/middlewares");

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
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus
      });
    }
    res.status(200).send("Orders created");
  } catch (error) {
    res.status(400).send(error);
  }
});

//Filter PURCHASE ORDERS by STATUS
router.get("/filterOrders/:status", async (req, res) => {
  const { status } = req.params;

  try {
    const orders = await PurchaseOrder.findAll({
      where: {
        orderStatus: status
      }
    })
    if (!orders.length) {
      return res.status(200).send([]);
    }
    let purchaseOrders = groupPurchaseOrders(orders)
    return res.status(200).send(purchaseOrders)
  } catch (error) {
    return res.status(404).send(error);
  }
})

// Set PURCHARSE ORDER STATUS
router.put("/setOrderStatus", async (req, res) => {
  const { orderStatus, orderId } = req.body;

  try {
    const orders = await PurchaseOrder.update(
      {
        orderStatus: orderStatus,
      },
      {
        where: { orderId: orderId }
      }
    )

    const userOrder = await PurchaseOrder.findOne({
      where: { orderId: orderId }
    })

    const user = await User.findOne({
      where: { id: userOrder.userId }
    })
    if (orderStatus === "accepted") {
      // DESCOMENTAR PARA ENVIAR MAIL
      mailOrderAccepted(user.email, orderId)
      // 
      return res.status(200).send(`Order updated to ${orderStatus}, and mail sent to the buyer (${user.email})`)
    }

    if (orderStatus === "rejected") {
      // DESCOMENTAR PARA ENVIAR MAIL
      mailOrderRejected(user.email, orderId)
      // 
      return res.status(200).send(`Order updated to ${orderStatus}, and mail sent to the buyer (${user.email})`)
    }

  } catch (error) {
    return res.status(404).send(error);
  }
})

// Get PURCHASE ORDERS by DATE
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
    if (!userHistory.length) {
      return res.status(200).send([]);
    }
    let historyPurchaseOrders = groupPurchaseOrders(userHistory)
    return res.status(200).send(historyPurchaseOrders)
  } catch (error) {
    return res.status(404).send(error);
  }
});

//Answer Question / Add Answer
router.put("/:questionId/answer", async (req, res) => {
  const { questionId } = req.params
  const { answer, idProduct } = req.body
  if (!answer || answer.length < 1) {
    return res.status(404).send("Answer must not be empty")
  }

  try {
    await Qa.update({
      answer,
      resolved: true,
    }, { where: { id: questionId } })

    const userMail = await Qa.findOne({
      include: { all: true },
      where: {
        id: questionId
      }
    })
    const { email } = userMail.dataValues.users[0].dataValues;
    const { id, name } = userMail.dataValues.products[0].dataValues
    // DESCOMENTAR PARA ENVIAR MAIL AL USER CUANDO ADMIN RESPONDE PREGUNTA.

    // mailQuestion(email, name, id)

    // 
    return res.status(200).send("Question answered")
  }
  catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

//////////QUESTIONS N' ANSWERS ////////////////

router.get("/all/:resolved", async (req, res) => {
  const { resolved } = req.params;
  try {
    if (resolved == "true") {
      const allQuestions = await Qa.findAll({
        include: [
          {
            model: Product,
            attributes: ["id", "name", "image"],
            through: { attributes: [] },
          },
          {
            model: User,
            attributes: ["id"],
            through: { attributes: [] },
          },
        ],
        where: { resolved: true }
      });
      return res.send(allQuestions);
    } else if (resolved == "false") {
      const unresolvedOnly = await Qa.findAll({
        where: { resolved: false },
        include: [
          {
            model: Product,
            attributes: ["id", "name", "image"],
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
          attributes: ["id", "name", "image"],
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
