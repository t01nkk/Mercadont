const { Router } = require("express");
const {
  createOrder,
  captureOrder,
  cancelOrder,
} = require("../controllers/paypalPayments.js");
const { PurchaseOrder } = require("../db");
const Stripe = require("stripe")
const {modifyStock} = require("../middlewares/middlewares");
const { purchaseOrder } = require("../controllers/purchase_order.js");
const stripe = new Stripe("sk_test_51L4snIL7xpNkb3eJIsYUyZ8SYO4cHXX3GyMVVgp1lJ56KTEq6Mc8qtENUNlam4mslm4pwNXq48uFQYLrDPldNso900jpNAxL5e")
const router = Router();

// ************************
// STRIPE METHODS
// ************************
//CART - Buy Product
router.post("/card", async (req,res)=>{
  try {
    const {id, amount, local, userId} = req.body;
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description:"Compra",
      payment_method:id,
      confirm:true
    })
    // modifyStock(local)
    // purchaseOrder(id,userId,local)
    return res.status(200).send(payment)
  } catch (error) {
    console.log(error)
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

// ************************
// PURCHASE ORDER DATABASE
// ************************

router.post("/storePurchaseOrder", async (req,res)=>{
  const {id, userId, local} = req.body
  try {
    await modifyStock(local)
    await purchaseOrder(id,userId,local)
    res.status(200).send('Payment processed')
  } catch (error) {
    res.status(404).send(error)
  }

})

module.exports = router;
