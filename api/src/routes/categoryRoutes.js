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


router.post("/", async (req, res) => {
    const { name} = req.body
    let exists = await Category.findOne({ where: { name: name } });
    if (!exists) {
      if (!name) return res.status(400).send({ msg: "Please pick a name for you category" });    
      try {
        const newProduct = await Category.create({
          name:name,
        })  
        res.status(201).send("New Category Created")
      }
      catch (err) {
        res.status(401).send(err)
      }

    }
 
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { name } = req.body; 
   try {
    await Category.update(
      {
        name: name,        
      },
      {
        where: { id: id }
      });
    res.status(202).send("Category Updated")
  }
  catch (err) {
    res.status(400).send(err)
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    await Category.destroy({ where: { id: id } })
    res.status(200).send("Category deleted")
  }
  catch (err) {
    res.status(400).send(err)
  }
})


module.exports = router