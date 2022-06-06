const { Product, User, Category, Qa, Review, PurchaseOrder } = require("../db");
const { Router } = require("express");
const Stripe = require("stripe");
const cors = require("cors");
const { modifyStock } = require("../middlewares/middlewares");
const { validateInputProduct } = require("../middlewares/middlewares");
const { Op, where, Sequelize } = require("sequelize");

const router = Router();

const stripe = new Stripe(
  "sk_test_51L4snIL7xpNkb3eJIsYUyZ8SYO4cHXX3GyMVVgp1lJ56KTEq6Mc8qtENUNlam4mslm4pwNXq48uFQYLrDPldNso900jpNAxL5e"
);
//WORKING
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

// Get all products
router.get("/search", async (req, res) => {
  const { name } = req.query;
  console.log("name:", name);
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

// Working
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
      console.log(err);
      return res.status(400).send(err);
    }
  }
});

// Working
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
    console.log("product:", product);
    if (!product) {
      return res.status(404).send("Product Not Found");
    }
    return res.status(200).send(product);
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
});

// Working
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
      name,
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
      console.log(category);
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

// Working
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

// Working
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
        name,
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
    console.log("error:", err);
    return res.status(400).send(err);
  }
});
//CART - Buy Product
router.post("/buys", async (req, res) => {
  try {
    const { id, amount, local, userId } = req.body;

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Compra",
      payment_method: id,
      confirm: true,
    });
    modifyStock(local);

    // console.log("local:", local)
    for (let product of local) {
      const db = await PurchaseOrder.create({
        orderId: id,
        userId: userId,
        productId: product.id,
        productQuantity: product.quantity,
      });
      // console.log("db:", db)
    }
    return res.status(200).send(payment);
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
