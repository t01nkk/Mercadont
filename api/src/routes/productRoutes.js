const { Product, User, Category, Qa, Review } = require("../db")
const { Router } = require("express")
const {validateInputProduct} = require("../middlewares/middlewares");
// const { Op } = require("sequelize/types");


const router = Router()


router.get('/', async (req, res) =>{
  try {
    const allProducts = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ['name'],
          through: { attributes: [] }
        },
        {
          model: Qa,
          attributes: ["question", "answer","resolved"],
            through:{attributes:[]},
        },
        {
          model: Review,
          attributes: ["rating","text"],
          through:{attributes:[]},
        }
      ]
    })
    res.status(200).send(allProducts);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// Working - BUT ASK FRONTS WHAT THEY PREFER/WANT - DATE: 28/05 - 23:30 - NACHO Y MATEO - NACHO_BRANCH 
// Get all products Filter By Category
router.get('/filter', async (req, res) => {

  if (req.body.categories) {
    const { categories } = req.body;
    const setCat = new Set(categories)
    const setOfCat = Array.from(setCat);

    // let filteredProducts = []
    // try {
    //   // for (var i = 0; i < setOfCat.length; i++) {
    //     filteredProducts.push(await Product.findAll({
    //       include: [
    //         {
    //           model: Category,
    //           attributes: ['name'],
    //           through: { attributes: [] },
    //           where: {
    //             name: setOfCat
    //           }
    //         },
    //         {
    //           model: Qa,
    //           attributes: ["question", "answer","resolved"],
    //             through:{attributes:[]},
    //         },
    //         {
    //           model: Review,
    //           attributes: ["rating","text"],
    //           through:{attributes:[]},
    //         }
    //       ],
    //     }))
    let products = []
    let filteredProducts = []
    try {
      products = await Product.findAll({
          include: [
            {
              model: Category,
              attributes: ['name'],
              through: { attributes: [] },
            },
            {
              model: Qa,
              attributes: ["question", "answer","resolved"],
                through:{attributes:[]},
            },
            {
              model: Review,
              attributes: ["rating","text"],
              through:{attributes:[]},
            }
          ],
        })
        // products.map(product=>{
        //   for (let category of setOfCat) {
        //     intersection = product.categories?.filter(cat => cat.name === category)
        //     if(intersection?.length > 0){
        //       filteredProducts.push(product)
        //     }
        //   }
        // })
        for (let category of setOfCat) {
          products.map(product=>{
            let intersection = product.categories?.filter(cat => cat.name === category)
            if(intersection?.length > 0){
              filteredProducts.push(product)
            }
          })
          // console.log("filteredProducts:", filteredProducts.length)
          products = Array.from(filteredProducts);
          filteredProducts = []
          // console.log("products:", products.length)
        }
        // products = new Set(filteredProducts)
        // products = Array.from(products)
      if(!products.length) return res.send({ msg: "There aren't any products that match all these categories" });
      return res.send(products);
    } catch (err) {
      return res.status(400).send({ msg: err.message });
    }
  }
})

// Working / DATE: 28/05 - 23:30 - NACHO Y MATEO - NACHO_BRANCH
//Get Product Details
router.get("/:id", async (req, res) => {
  const { id } = req.params
  const product = await Product.findOne({
          include: [
        {
          model: Category,
          attributes: ['name'],
          through: { attributes: [] }
        },
        {
          model: Qa,
          attributes: ["question", "answer","resolved"],
            through:{attributes:[]},
        },
        {
          model: Review,
          attributes: ["rating","text"],
          through:{attributes:[]},
        }
      ],
    where: {
      id: id
    }
  })
  if (!product) {
    return res.status(404).send("Product Not Found")
  }
  return res.status(200).send(product)
})

// Working / DATE: 28/05 - 21:40 - NACHO Y MATEO - NACHO_BRANCH
//Create Product
router.post("/create", async (req, res) => {

  let { name, price, description, status, image, stock, categories } = req.body
  let exists = await Product.findOne({ where: { name: name } });

  if (exists) return res.status(401).send("There is another product with the exact same name.")
  const errors = validateInputProduct(name, price, description, image, stock, categories)

  if(errors.length) return res.status(400).send(errors)
  if (stock === 0) status = "inactive";

  try {
    const newProduct = await Product.create({
      name, price, description, status, image, stock, created: true
    })
    for (var i = 0; i < categories.length; i++) {

      let category = await Category.findOne({ where: { name: categories[i] } })
      console.log(category)
      if (!category) {
        return res.status(400).send({ msg: "This isn't a valid category, you might have misspeled it or you can choose to create a new one" })

      } else await newProduct.addCategory(category)
    }
    return res.status(201).send("New Product Created")
  }
  catch (err) {
    return res.status(401).send(err)
  }
})

// Working / DATE: 28/05 - 21:00 - NACHO Y MATEO - NACHO_BRANCH
//Delete Product
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params
  try {
    await Product.destroy({ where: { id: id } })
    res.status(200).send("Product deleted")
  }
  catch (err) {
    res.status(400).send(err)
  }
})

// Working / DATE: 28/05 - 21:00 - NACHO Y MATEO - NACHO_BRANCH
//In the update form, LOAD ALL THE DATA FOR CHANGING
router.put("/update/:id", async (req, res) => {
  const { id } = req.params
  const { name, price, description, image, stock, categories } = req.body

  const errors = validateInputProduct(name, price, description, image, stock, categories)
  if(errors.length){
    return res.status(400).send(errors)
  }

  try {
    if (categories) {
      let product = await Product.findOne({ where: { id: id } })
      product.setCategories([])
  
      for (let cat of categories) {
        await Category.findOrCreate({ where: { name: cat } })
      }
      for (let cat of categories) {
        const category = await Category.findOne({ where: { name: cat } })
        product.addCategory(category)
      }
    }

    await Product.update(
      {
        name: name,
        price: price,
        description: description,
        image: image,
        stock: stock,
      },
      {
        where: { id: id }
      });
    return res.status(202).send("Product Updated")
  }
  catch (err) {
    console.log("error:", err)
    return res.status(400).send(err)
  }
})

///////////////REEEEVVVVIIIISSSSAAAAARRRRRRRR///////
//Product Bought 
//////////////  VA A LLEGAR EL CARRITO ENTERO /////////////////////
// router.put("/:id/buy", async (req, res) => {
//   const { id } = req.params
//   const { amount } = req.body

//   try {
//     const { stock } = await Product.findOne({ where: { id: id } })
//     if (stock - amount === 0) {
//       await Product.update({ stock: "0", status: "inactive" }, { where: { id: id } })
//     }
//     await Product.update({ stock: (stock - amount) }, { where: { id: id } })
//     return res.status(200).send("Product Bought")
//   }
//   catch (err) {
//     res.status(400).send(err)
//   }
// })

//Product Restock
// router.put("/:id/restock", async (req, res) => {
//   const { id } = req.params
//   const { amount } = req.body

//   try {
//     const { stock } = await Product.findOne({ where: { id: id } })
//     await Product.update({ stock: (stock + amount), status: "active" }, { where: { id: id } })
//     return res.status(200).send("Product Restocked")
//   }
//   catch (err) {
//     res.status(400).send(err)
//   }
// })

module.exports = router

