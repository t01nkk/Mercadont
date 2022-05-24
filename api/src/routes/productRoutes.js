const {Product, User} = require("../db")
const {Router} = require("express")
const {where} = require("sequelize/types");


const router = Router()

//Get All Products
router.get("/", async (req, res)=>{
  const products = await Product.findAll()
  return res.status(200).send(products)
})

//Get Products by Name
router.get("/", async (req, res)=>{
  const {name} = req.query
  const products = await Product.findAll()
  const matchingProduct = products.filter(product => product.includes(name))
  if (matchingProduct.length === 0){
    return res.status(404).send("Matching Product Not Found")
  }
  return res.status(200).send(matchingProduct)
})

//Get Productss by Category (Esperar a que se cree el Objeto)
/*router.get("/", async (req, res)=>{

})*/

router.get("/:id", async (req, res)=>{
  const {id} = req.params
  const product = await Product.findOne({
    where: {
    id: id
    }})
  if(!product){
    return res.status(404).send("Product Not Found")
  }
  return res.status(200).send(product)
})

router.get("/", async (req, res)=>{
  const  {price} = req.query
  const products = await Product.findAll()
  const matchingProducts = products.filter(product => product.includes(name))
  if (matchingProducts.length === 0){
    return res.status(404).send("Matching Product Not Found")
  }
  const orderedByRelevance = matchingProducts.sort((a, b)=>a.rating - b.rating)
  return res.status(200).send(orderedByRelevance)
})

router.post("/", async (req, res)=>{
  const {name, price, description, rating, images, stock, categories} = req.body
  try{
    const newProduct = await Product.create({name, price, description, rating, images, stock, categories})
    for (let i = 0; i<categories.length; i++) {
      let category = await Category.findOne({where: {name: categories[i]}})
      newProduct.addCategory(category)
    }
    res.status(201).send("New Product Created")
  }
  catch (err){
    res.status(401).send(err)
  }
})

router.delete("/:id", async (req, res)=>{
  const {id} = req.params
  try{
    const destroyedProduct = await Product.destroy({where:{id: id}})
    res.status(200).send(destroyedProduct)
  }
  catch (err){
    res.status(400).send(err)
  }
})

router.put("/:id", async (req, res)=>{
  const {id} = req.params
  const {name, price, description, rating, images, stock, categories} = req.body
  try {
    const updatedProduct = await Product.findOne({where:{id:id}})
    await updatedProduct.put({name, price, description, rating, images, stock, categories})
    res.status(202).send(updatedProduct)
  }
  catch (err){
    res.status(400).send(err)
  }
})




module.exports = router

