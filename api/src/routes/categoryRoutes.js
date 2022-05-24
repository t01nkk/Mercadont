const { Category } = require("../db")
const { Router } = require("express")
const router = Router()
const cat = require("../../../categories.json")

async function populate() {
  const catArr = cat.categories;
  try {

    await Category.bulkCreate(catArr)
    console.log("created!")
  } catch (err) {
    console.log(err.message);
  }

}

router.get("/", async (req, res) => {
  const cont = await Category.count()
  if (cont > 0) {
    populate()
  }
  try {
    const categories = await Category.findAll({ attributes: ["name", "img"] })
    console.log("categories populated!");
    return res.status(200).send(categories)
  } catch (err) {
    console.log({ msg: err.message });
  }
})

module.exports = router