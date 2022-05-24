const { Product, User, Category } = require("../db")
const { Router } = require("express")


const router = Router()

//WORKING
//Get All Productss
router.get("/", async (req, res) => {
  const products = await Product.findAll()
  return res.status(200).send(products)
})

//Get Products by Name
router.get("/", async (req, res) => {
  const { name } = req.query
  const products = await Product.findAll()
  const matchingProduct = products.filter(product => product.includes(name))
  if (matchingProduct.length === 0) {
    return res.status(404).send("Matching Product Not Found")
  }
  return res.status(200).send(matchingProduct)
})

//Get Products by Category
router.get("/", async (req, res) => {
  const { categories } = req.query
  try {
    const products = await Product.findByPk(categories, {
      include: {
        model: Category,
        attributes: ["name"],
        through: { attributes: [] }
      }
    })
    res.status(200).send(products)
  }
  catch (err) {
    res.status(404).send(err)
  }
})

//Get Products By Price
router.get("/", async (req, res) => {
  const { price } = req.query
  const products = await Product.findAll()
  const matchingProducts = products.filter(product => product.includes(price))
  if (matchingProducts.length === 0) {
    return res.status(404).send("Matching Product Not Found")
  }
  const orderedByRelevance = matchingProducts.sort((a, b) => a.rating - b.rating)
  return res.status(200).send(orderedByRelevance)
})

//WORKING
//Get Product Details
router.get("/:id", async (req, res) => {
  const { id } = req.params
  const product = await Product.findOne({
    where: {
      id: id
    }
  })
  if (!product) {
    return res.status(404).send("Product Not Found")
  }
  return res.status(200).send(product)
})

//WORKING
//Create Product
router.post("/", async (req, res) => {
  const { name, price, description, rating, images, stock, categories } = req.body

  // first populate category table
  for(let cat of categories){
    await Category.findOrCreate({ where: { name: cat } })
  }

  try {
    const newProduct = await Product.create({ name, price, description, rating, images, stock })
    for (let cat of categories) {
      let category = await Category.findOne({ where: { name: cat } })
      await newProduct.addCategory(category)
    }
    res.status(201).send("New Product Created")
  }
  catch (err) {
    res.status(401).send(err)
  }
})

//WORKING
//Delete Product
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    await Product.destroy({ where: { id: id } })
    res.status(200).send("Product deleted")
  }
  catch (err) {
    res.status(400).send(err)
  }
})

//Update Product
//In the update form, LOAD ALL THE DATA FOR CHAGING
router.put("/:id", async (req, res)=>{
  const {id} = req.params
  const {name, price, description, rating, images, stock, categories} = req.body
  try {
    await Product.update(
      {
        name: name,  
        price: price, 
        description: description, 
        rating: rating, 
        images: images, 
        stock: stock, 
        categories: categories
      },
      {
        where: {id:id}
      }
    );

    res.status(202).send(updatedProduct)
  }
  catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router

