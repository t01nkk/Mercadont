const { Router } = require("express");
const router = Router();

//CART - Buy Product
router.post("/card", async (req, res) => {
  try {
    res.status(200).send('Y u here?')
  } catch (error) {
    res.status(400).send(error.message)
  }
})


module.exports = router;
