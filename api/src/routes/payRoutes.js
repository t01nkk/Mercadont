const { Router } = require("express");
const {
  createOrder,
  captureOrder,
  cancelOrder,
} = require("../controllers/paypalPayments.js");

const router = Router();

// ************************
// PAYPAL METHODS
// ************************
//We create the purchase order
router.post("/create-order", createOrder);

//When the user accepts we capture that
router.get("/capture-order", captureOrder);

//When the user is a poor ass cheapskate.
router.get("/cancel-order", cancelOrder);

module.exports = router;
