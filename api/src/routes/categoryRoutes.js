const {Category} = require("../db")
const {Router} = require("express")
const router = Router()

<<<<<<< Updated upstream
//Get all Categories
router.get("/", async (req, res)=>{
  const categories = await Category.findAll()
  res.status(200).send(categories)
=======
async function populate() {
  const catArr = cat.categories;
  console.log(catArr);
  try {

    await Category.bulkCreate(catArr)
    console.log("created!")
  } catch (err) {
    console.log(err.message);
  }

}

router.get("/", async (req, res) => {
  populate()
  try {
    const categories = await Category.findAll({ attributes: ["name", "img"] })
    return res.status(200).send(categories)
  } catch (err) {
    console.log({ msg: err.message });
  }
>>>>>>> Stashed changes
})

module.exports = router