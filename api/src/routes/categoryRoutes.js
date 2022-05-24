const {Category} = require("../db")
const {Router} = require("express")
const router = Router()

//Get all Categories
router.get("/", async (req, res)=>{
  const categories = await Category.findAll()
  res.status(200).send(categories)
})

module.exports = router