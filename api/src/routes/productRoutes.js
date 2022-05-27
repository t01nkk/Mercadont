const { Product, User, Category, Qa, Review } = require("../db")
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
      },
      include:{
        model: Qa,
        attributes: ["question", "answer","resolved"],
          through:{attributes:[]},
      },
      include:{
        model: Review,
        attributes: ["rating","text"],
        through:{attributes:[]},
      }
    })

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
      const {name, price, description, image, stock, categories} = product

      for(let cat of categories){
        await Category.findOrCreate({ where: { name: cat } })
      }
      // first populate category table
      const newProduct = await Product.create({name, price, description, image, stock})
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
router.post("/", async (req, res) => {
  const { name, price, description, image, stock, categories } = req.body

  // first populate category table
  for(let cat of categories){
    await Category.findOrCreate({ where: { name: cat } })
  }

  try {
    const newProduct = await Product.create({ name, price, description, image, stock })
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
router.put("/update/:id", async (req, res)=>{
  const {id} = req.params
  const {name, price, description, image, stock, categories} = req.body

  if(categories){
    let product = await Product.findOne({where:{id:id}})
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
router.put("/buy", async (req, res) => {
  const cart = req.body

  try {
    for (let product of cart) {
      const {id} = product
      const {stock} = await Product.findOne({where: {id: id}})

      if(stock - product.amount < 0) return res.status(400).send("Not enough stock for purchase")

      if (stock - product.amount === 0) {
        await Product.update({stock: "0", status: "inactive"}, {where: {id: id}})
        return res.status(200).send("Product Bought, no more stock left")
      }
      await Product.update({stock: (stock - product.amount)}, {where: {id: id}})
    }
      return res.status(200).send("Product Bought")
  }
  catch (err) {
    console.log(err)
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


//Add Review to Product
router.post("/:id/review", async (req, res)=>{
  const {id} = req.params
  const {rating, text, userId} = req.body

  try{
    const product = await Product.findOne({
      include:{
        model: Review,
        attributes: ["rating","text"],
        through: {attributes:[]}
      }
        },
        {where:{id:id}})
    const user = await User.findOne({where:{id: userId}})
    for (let review of product.reviews){
      if (user.hasReview(review)) return res.status(400).send("User Already reviewed product," +
          " please update your review if your wish to leave feedback")
    }
    const fullReview = await Review.create({
      rating,
      text
    })
    product.addReview(fullReview)
    user.addReview(fullReview)
    return res.status(200).send("Review Added")
  }
  catch (err){
    console.log(err)
    return res.status(400).send(err)
  }
})

//Update Review
router.put("/:reviewId/updateReview", async (req, res)=>{
  const {reviewId} = req.params
  const {rating, text, userId} = req.body

  try {
    const review = Review.findOne({where:{id:reviewId}})
    const user = User.findOne({where:{id:userId}})

    Review.update({
      rating,
      text
    },{where:{id:reviewId}})
    return res.status(200).send("Review Updated")
  }
  catch (err){
    console.log(err)
    return res.status(400).send(err)
  }
})

//Add Questions
router.post("/:id/question", async (req, res)=>{
  const{id} = req.params
  const {question, userId} = req.body

  if (!question || question.length<1) return res.status(400).send("Questions can't be empty")

  try{
    const product = await Product.findOne({where:{id:id}})
    const q = await Qa.create({
      question
    })
    product.addQa(q)

    const user = await User.findOne({where:{id:userId}})
    user.addQa(q)
    return res.status(200).send("Question Added")
  }
  catch (err){
    console.log(err)
    return res.status(400).send(err)
  }
})

//Answer Question / Add Answer
router.put("/:questionId/answer", async (req, res)=>{
  const {questionId} = req.params
  const {answer} = req.body

  if(!answer || answer.length<1){
    return res.status(404).send("Answer must not be empty")
  }

  try {
    await Qa.update({
        answer,
      }, {where: {id:questionId}})

    return res.status(200).send("Answer Added")
  }
  catch (err){
    console.log(err)
    res.status(400).send(err)
  }
})

router.put("/:questionId/resolved", async (req, res)=>{
  const {questionId} = req.params
  try {
    await Qa.update({
      resolved: true,
    }, {where: {id:questionId}})

    return res.status(200).send("Answer Resolved")
  }
  catch (err){
    console.log(err)
    res.status(400).send(err)
  }
})



module.exports = router

