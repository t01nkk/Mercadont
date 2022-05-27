const { Product, User, Category } = require("../db")
const { Router } = require("express")


const router = Router()


//WORKING
//Get All Products, Filter By Category, Name, Price
router.get("/", async (req, res) => {
  try {
    const {name, price, categories,} = req.query

    let products;
    products= await Product.findAll({
      include: {
        model: Category,
        attributes: ["name"],
        through: {attributes: []},
      }})

    if(categories) {
      const matchingCategories = []
      products.map(product=>{
        let intersection = product.categories.filter(cat => categories.includes(cat.name))
        if(intersection.length > 0){
          matchingCategories.push(product)
        }
      })
      products = matchingCategories
    }
    if(name){
      const matchingName = products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()))
      if (matchingName.length === 0) {
        return res.status(404).send("Matching Product Not Found")
      }
      products = matchingName
    }
    if(price) {
      const matchingPrice = products.filter(product => product.price <= price)
      if (matchingPrice.length === 0) {
        return res.status(404).send("Matching Product Not Found")
      }
      const orderedByRelevance = matchingPrice.sort((a, b) => b.rating - a.rating)
      products = orderedByRelevance
    }
    return res.status(200).send(products)}
    catch (err){
      console.log(err)
      res.status(404).send(err)
  }
})


//WORKING
//Get Product Details
router.get("/:id", async (req, res) => {
  const { id } = req.params
  const product = await Product.findOne({include: {
      model: Category,
      attributes: ["name"],
      through: {attributes: []},
    },
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
router.post("/many", async (req, res) => {
  const products =  req.body
  try {
    for (let product of products) {
      const {name, price, description, rating, image, stock, categories,status} = product

      for(let cat of categories){
        await Category.findOrCreate({ where: { name: cat } })
      }
      // first populate category table
      //AGREGUE STATUS PARA QUE EN EL BULK ME TOME LOS STATUS
      const newProduct = await Product.create({name, price, description, rating, image, stock,status})
      for (let cat of categories) {
        let category = await Category.findOne({ where: { name: cat } })
        await newProduct.addCategory(category)
      }
    }
    return res.status(200).send("All Products Added")
  }
  catch (err){
    return res.status(400).send(err)
  }
})

//Create Product
//CAMBIE RATING POR STATUS PARA QUE FUNCIONE ATR Y ME CAMBIE EL STATUS
router.post("/", async (req, res) => {
  const { name, price, description, status, image, stock, categories } = req.body

  // first populate category table
  for(let cat of categories){
    await Category.findOrCreate({ where: { name: cat } })
  }

  try {
    const newProduct = await Product.create({ name, price, description, status, image, stock })
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
//In the update form, LOAD ALL THE DATA FOR CHANGING
router.put("/:id", async (req, res)=>{
  const {id} = req.params
  const {name, price, description, rating, image, stock, categories} = req.body

  if(categories){
    let product = await Product.findOne({where:{id:id}})
    console.log(await product.countCategories())
    product.setCategories([])

    for(let cat of categories) {
      await Category.findOrCreate({where: {name: cat}})
    }
    for(let cat of categories){
      const category= await Category.findOne({ where: { name: cat } })
      product.addCategory(category)

      }
    }

  try {
    await Product.update(
      {
        name: name,  
        price: price, 
        description: description, 
        rating: rating, 
        image: image, 
        stock: stock,
      },
      {
        where: {id:id}
      });
    res.status(202).send("Product Updated")
  }
  catch (err) {
    res.status(400).send(err)
  }
})

//Product Bought
router.put("/:id/buy", async (req, res)=>{
  const {id} = req.params
  const {amount} = req.body

  try {
    const {stock} = await Product.findOne({where: {id: id}})
    if (stock - amount === 0) {
      await Product.update({stock: "0", status: "inactive"}, {where: {id: id}})
    }
    await Product.update({stock: (stock - amount)}, {where: {id: id}})
    return res.status(200).send("Product Bought")
  }
  catch (err){
    res.status(400).send(err)
  }
})

//Product Restock
router.put("/:id/restock", async (req, res)=>{
  const {id} = req.params
  const {amount} = req.body

  try {
    const {stock} = await Product.findOne({where: {id: id}})
    await Product.update({stock: (stock + amount), status:"active"}, {where: {id: id}})
    return res.status(200).send("Product Restocked")
  }
  catch (err){
    res.status(400).send(err)
  }
})

module.exports = router

