const { Product, Category, Qa, Review, PurchaseOrder } = require("../db");
const { Router } = require("express");
const { validateInputProduct } = require("../middlewares/middlewares");
const { Op } = require("sequelize");

const router = Router();
//----------------------PRODUCT FILTER---------------------------------- //
//Get All Products, Filter By Category, Name, Price
router.get("/", async (req, res) => {
  try {
    const allProducts = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Qa,
          attributes: ["question", "answer", "resolved"],
          through: { attributes: [] },
        },
        {
          model: Review,
          attributes: ["rating", "text"],
          through: { attributes: [] },
        },
      ],
    });
    res.status(200).send(allProducts);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

//----------------------PRODUCT SEARCH---------------------------------- //
// Get all products
router.get("/search", async (req, res) => {
  const { name } = req.query;
  try {
    const allProducts = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Qa,
          attributes: ["question", "answer", "resolved"],
          through: { attributes: [] },
        },
        {
          model: Review,
          attributes: ["rating", "text"],
          through: { attributes: [] },
        },
      ],
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    res.status(200).send(allProducts);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

//----------------------PRODUCT FILTER BY CATEGORY---------------------------------- //
// Get all products Filter By Category
router.post("/filter", async (req, res) => {
  if (req.body.categories) {
    const { categories } = req.body;
    const setCat = new Set(categories);
    const setOfCat = Array.from(setCat);
    let products = [];
    let filteredProducts = [];
    try {
      products = await Product.findAll({
        include: [
          {
            model: Category,
            attributes: ["name"],
            through: { attributes: [] },
          },
          {
            model: Qa,
            attributes: ["question", "answer", "resolved"],
            through: { attributes: [] },
          },
          {
            model: Review,
            attributes: ["rating", "text"],
            through: { attributes: [] },
          },
        ],
      });

      for (let category of setOfCat) {
        products.map((product) => {
          let intersection = product.categories?.filter(
            (cat) => cat.name === category
          );
          if (intersection?.length > 0) {
            filteredProducts.push(product);
          }
        });
        // products = Array.from(filteredProducts);
        products = [...filteredProducts];
        filteredProducts = [];
      }
      if (!products.length)
        return res.send({
          msg: "There aren't any products that match all these categories",
        });
      return res.send(products);
    } catch (err) {
      return res.status(400).send(err);
    }
  }
});

//----------------------ONE PRODUCT DETAILS---------------------------------- //
//Get Product Details
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Qa,
          attributes: ["question", "answer", "resolved"],
          through: { attributes: [] },
        },
        {
          model: Review,
          attributes: ["rating", "text"],
          through: { attributes: [] },
        },
      ],
      where: {
        id: id,
      },
    });
    if (!product) {
      return res.status(404).send("Product Not Found");
    }
    return res.status(200).send(product);
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
});

//----------------------MANY PRODUCTS DETAILS---------------------------------- //
//Get MANY Product Details
router.get("/manyProducts", async (req, res) => {
  const { arrayProducts } = req.body;
  let array = [];
  try {
    for (let item of arrayProducts) {
      const product = await Product.findOne({
        include: [
          {
            model: Category,
            attributes: ["name"],
            through: { attributes: [] },
          },
          {
            model: Qa,
            attributes: ["question", "answer", "resolved"],
            through: { attributes: [] },
          },
          {
            model: Review,
            attributes: ["rating", "text"],
            through: { attributes: [] },
          },
        ],
        where: {
          id: item,
        },
      });
      array.push(product);
    }
    return res.status(200).send(array);
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
});

//----------------------CREATE PRODUCT---------------------------------- //
//Create Product
router.post("/create", async (req, res) => {
  let { name, price, description, status, image, stock, categories, sizes } =
    req.body;
  let exists = await Product.findOne({ where: { name: name } });

  if (exists)
    return res
      .status(401)
      .send("There is another product with the exact same name.");
  const errors = validateInputProduct(
    name,
    price,
    description,
    image,
    stock,
    categories
  );

  if (errors.length) return res.status(400).send(errors);
  if (stock === 0) status = "inactive";

  try {
    const newProduct = await Product.create({
      name: name.toUpperCase(),
      price,
      description,
      status,
      image,
      stock,
      created: true,
      sizes,
    });
    for (var i = 0; i < categories.length; i++) {
      let category = await Category.findOne({ where: { name: categories[i] } });
      if (!category) {
        return res.status(401).send({
          msg: "This isn't a valid category, you might have misspeled it or you can choose to create a new one",
        });
      } else await newProduct.addCategory(category);
    }
    return res.status(201).send("New Product Created");
  } catch (err) {
    return res.status(401).send(err);
  }
});

//----------------------DELETE PRODUCT---------------------------------- //
//Delete Product
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.destroy({ where: { id: id } });
    res.status(200).send("Product deleted");
  } catch (err) {
    res.status(400).send(err);
  }
});

//---------------------UPDATE PRODUCT---------------------------------- //
//In the update form, LOAD ALL THE DATA FOR CHANGING
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image, stock, categories, sizes, status } =
    req.body;

  const errors = validateInputProduct(
    name,
    parseInt(price),
    description,
    image,
    parseInt(stock),
    categories,
    status
  );
  if (errors.length) {
    return res.status(400).send(errors);
  }

  try {
    if (categories) {
      let product = await Product.findOne({ where: { id: id } });
      product.setCategories([]);
      for (let cat of categories) {
        await Category.findOrCreate({ where: { name: cat } });
      }
      for (let cat of categories) {
        const category = await Category.findOne({ where: { name: cat } });
        product.addCategory(category);
      }
    }

    await Product.update(
      {
        name: name.toUpperCase(),
        price,
        description,
        image,
        stock,
        sizes,
        status,
      },
      {
        where: { id: id },
      }
    );
    return res.status(202).send("Product Updated");
  } catch (err) {
    return res.status(400).send(err);
  }
});

//-------------------RECOMMENDATION - MOST SOLD PRODUCTS------------------------------ //
router.get("/recommendation/mostSold", async (req, res) => {
  let productSet = {};
  try {
    const orders = await PurchaseOrder.findAll();
    const products = await Product.findAll({ where: { status: "active" } });

    if (!orders?.length) {
      products.splice(12);
      return res.status(200).send(products);
    }

    for(let order of orders){
      if(productSet[order.productId]){
        productSet[order.productId] += order.productQuantity
      }
      else{
        productSet[order.productId] = order.productQuantity
      }
    }
    //{ id:value, id:value}
    //console.log("Products Set",productSet)
    const keys = Object.keys(productSet)
    const values = Object.values(productSet)
    let productsSold = []
    for(let i = 0; i<keys.length; i++){
        productsSold.push({
          id: keys[i],
          quantity: values[i]
        })
   }

    productsSold.sort((a, b) => {
      return b.quantity - a.quantity
    })

    productsSold.splice(12)
    //console.log("Products Sold:", productsSold)

    let arrayProducts = []
    for( let element of productsSold){
      let product = await Product.findOne({
        where:{
          id:element.id
       }
      })
      arrayProducts.push(product)
    }

    for( let i = 0; arrayProducts.length < 12; i++){
      if( arrayProducts.includes(products[i])) continue
      arrayProducts.push(products[i])
    }
    // Devuelve un array de productos mas comprados ordenados de manera DESCENDENTE
    res.status(200).send(arrayProducts);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//-------------------RECOMMENDATION - PRODUCTS BY RATING ------------------------------ //
router.get("/recommendation/byRating", async (req, res) => {
  try {
    const products = await Product.findAll();
    products.sort((a, b) => {
      return b.rating - a.rating
    })
    products.splice(12)
    // Devuelve los 12 productos con mas rating de manera DESCENDENTE
    res.status(200).send(products)

  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
//-------------------RECOMMENDATION - PRODUCTS BY HISTORY ------------------------------ //

router.get("/recommendation/byHistory/:userId", async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(200).send([]);
  let product = {
    id: "",
  };
  let products = [];
  let categories = [];
  try {

    const userProducts = await PurchaseOrder.findAll({
      where: {
        userId: userId,
      },
    });

    if (!userProducts.length) {
      return res.status(200).send([]);
    }

    product.id = userProducts[0]?.productId;
    for (let i = 1; i < userProducts.length; i++) {
      if (product.id !== userProducts[i].productId) {
        products.push(product);
        product = {
          id: "",
        };
        product.id = userProducts[i].productId;
      }
    }

    products.push(product);

    for (let pro of products) {
      const item = await Product.findAll({
        include: [
          {
            model: Category,
            through: { attributes: [] },
          },
        ],
        where: { id: pro?.id },
      });
      for (let category of item[0]?.categories) {
        if (!categories.includes(category.name)) categories.push(category.name);
      }
    }

    let recommended = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: { attributes: [] },
          where: {
            name: categories,
          },
        },
      ],
    });


    // Por ahora solo devuelve un array con todas las categorias relacionadas a los productos comprados por el user
    res.status(200).send(recommended);

  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});


module.exports = router;
