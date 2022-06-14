const { Router } = require("express");
const {
  createOrder,
  captureOrder,
  cancelOrder,
} = require("../controllers/paypalPayments.js");
const Stripe = require("stripe")
const { modifyStockStripe } = require("../middlewares/middlewares");
const { createPurchaseOrder } = require("../controllers/purchase_order.js");
const stripe = new Stripe("sk_test_51L4snIL7xpNkb3eJIsYUyZ8SYO4cHXX3GyMVVgp1lJ56KTEq6Mc8qtENUNlam4mslm4pwNXq48uFQYLrDPldNso900jpNAxL5e")
const router = Router();

// ************************
// STRIPE METHODS
// ************************
//CART - Buy Product
router.post("/card", async (req, res) => {
  try {
    const { id, amount, local, userId } = req.body;
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Compra",
      payment_method: id,
      confirm: true
    })
    let updatedStock = await modifyStockStripe(local)
    if (!updatedStock) {
      let created = await createPurchaseOrder(id, userId, local, (amount / 100), "completed")
      return res.status(400).send({ msg: "WHY U NO CUM?" })
    }
    return res.status(200).send(payment);

  } catch (error) {
    return res.status(400).send(error)
  }
})

// ************************
// PAYPAL METHODS
// ************************
//We create the purchase order
router.post("/payPal/create-order", createOrder);

//When the user accepts we capture that
router.get("/payPal/capture-order", captureOrder);

//When the user is a poor ass cheapskate.
router.get("/payPal/cancel-order", cancelOrder);

module.exports = router;
