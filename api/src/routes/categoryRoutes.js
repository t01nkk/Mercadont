const { Category } = require("../db")
const { Router } = require("express")
const router = Router()

router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll()
    return res.status(200).send(categories)
  } catch (err) {
    console.log({ msg: err.message });
  }
})


router.post("/", async (req, res)=>{
  const {name, image} = req.body
  try{
    const category = await Category.create({
      name,
      image
    })
    return res.status(200).send(category)
  }
  catch (err){
    return res.status(400).send(err)
  }
})

router.put("/", async (req, res)=>{
  const {name, image} = req.body
  try{
    const category = await Category.update({
      name,
      image
    })
    return res.status(200).send(category)
  }
  catch (err){
    return res.status(400).send(err)
  }
})


module.exports = router