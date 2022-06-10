const productos = require("../../productscats.json");
const users = require("../../users.json");
const { Product, User, Category, PurchaseOrder } = require("../db");
const { Op } = require("sequelize");
// const { genPassword } = require('./password_utils');
const nodemailer = require("nodemailer");

const modifyStockStripe = async (local) => {
  let updateProduct;
  try {
    for (let i = 0; i < local.length; i++) {
      const findProduct = await Product.findByPk(local[i].id);
      if (findProduct.stock - local[i].quantity > 0) {
        updateProduct = await Product.update(
          { stock: findProduct.stock - local[i].quantity },
          { where: { id: local[i].id } }
        );
      } else if (findProduct.stock - local[i].quantity === 0) {
        updateProduct = await Product.update(
          { stock: findProduct.stock - local[i].quantity, status: "inactive" },
          { where: { id: local[i].id } }
        );
      } else {
        throw new Error({
          msg: "There's not enough products to fulfill this purchase",
        });
      }

    }
    return updateProduct
  } catch (error) {
    return error.message;
  }
};

const modifyStockPaypal = async (orderId) => {
  let updateProduct;
  try {
    const findProducts = await PurchaseOrder.findAll({
      where:
      {
        orderId,
      }
    });
    for (let product of findProducts) {
      const findProduct = await Product.findByPk(product.dataValues.productId);
      if (findProduct.stock - product.dataValues.productQuantity > 0) {
        updateProduct = await Product.update(
          { stock: findProduct.stock - product.dataValues.productQuantity },
          { where: { id: product.dataValues.productId } }
        );
      } else if (findProduct.stock - product.dataValues.productQuantity === 0) {
        updateProduct = await Product.update(
          { stock: findProduct.stock - product.dataValues.productQuantity, status: "inactive" },
          { where: { id: product.dataValues.productId } }
        );
      } else {
        throw new Error({
          msg: "There's not enough products to fulfill this purchase",
        });
      }
    }
    return { msg: "stock updated" };
  } catch (error) {
    return error;
  }
};

function validateInputProduct(
  name,
  price,
  description,
  image,
  stock,
  categories
) {
  let errors = [];
  if (!name || name.length > 60) errors.push("Name is not valid");
  if (!image) errors.push("Please, add at least one image of the product");
  if (!description) errors.push("Description is not valid");
  if (typeof stock !== "number" || stock < 0) errors.push("Stock is not valid");
  if (typeof price !== "number" || price <= 0)
    errors.push("Price is not valid");
  if (!categories?.length)
    errors.push(
      "Please, add at least one category that the product belongs to"
    );
  return errors;
}

async function getProducts() {
  const findCreated = await Product.findAll({ where: { created: true } });
  let count = await Product.count();
  if (findCreated.length === count) {
    for (let i = 0; i < productos.length; i++) {
      const newProduct = await Product.create({
        name: productos[i].name,
        price: productos[i].price,
        description: productos[i].description,
        rating: productos[i].rating,
        image: productos[i].image,
        stock: productos[i].stock,
        status: productos[i].status,
        db: true,
      });

      for (let j = 0; j < productos[i].categories.length; j++) {
        let cat = await Category.findOne({
          where: { name: { [Op.iLike]: `%${productos[i].categories[j]}%` } },
        });

        if (cat) {
          await newProduct.addCategory(cat);
        } else {
          let created = await Category.create({
            name: productos[i].categories[j],
          });
          await newProduct.addCategory(created);
        }
      }
    }
  } else return { msg: "Failed" };

  return { msg: "Product Database loaded succesfully!" };
}

async function getUsers() {
  const findCreated = await User.findAll({ where: { userCreated: true } });
  const count = await User.count();
  if (findCreated?.length === count) {
    for (let i = 0; i < users.length; i++) {
      let password = genPassword(users[i].password);
      await User.create({
        email: users[i].email,
        password: password,
        name: users[i].name,
        lastname: users[i].lastname,
        address: users[i].address,
        image: users[i].image,
        banned: users[i].banned,
        isAdmin: users[i].isAdmin,
      });
    }
  }
}

// async..await is not allowed in global scope, must use a wrapper
async function mailPayPal() {
  // Tendría que entrarle como parámetro, entre otras cosas, el email.
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAILGUN_USER, // generated ethereal user
      pass: process.env.MAILGUN_PASSWORD, // generated ethereal password
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Mercadon\'t libre" <no-reply@${process.env.USER_MAIL_DOMAIN}>`, // sender address
    to: "genoamano@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Aguante el paco, vieja. No me importa nada.", // plain text body
    html: "<b>Aguante el paco, vieja. No me importa nada.</b>", // html body
  });
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

function groupPurchaseOrders (purchaseOrders){
  let orders = [];
  let order = {
    orderNumber: "",
    date: "",
    products: [],
    amount: 0,
  };
    order.orderNumber === purchaseOrders[0].orderId;
    order.date === purchaseOrders[0].date;
    order.amount === purchaseOrders[0].totalAmount;

    for (let item of purchaseOrders) {
      if (order.orderNumber === item.orderId) {
        order.products.push({
          product: item.productId,
          productQuantity: item.productQuantity,
        });
      } else {
        if (order.orderNumber !== "") orders.push(order);
        order = {
          orderNumber: "",
          date: "",
          products: [],
          amount: 0,
        };
        order.orderNumber = item.orderId;
        order.date = item.date;
        order.amount = item.totalAmount;
        order.products.push({
          product: item.productId,
          productQuantity: item.productQuantity,
        });
      }
    }
    orders.push(order);
    return orders;
}

module.exports = {
  // initialize
  getUsers,
  getProducts,
  // validateInputUser,
  validateInputProduct,
  modifyStockStripe,
  modifyStockPaypal,
  // checkAuthenticated,
  // checkNotAuthenticated,
  mailPayPal,
  groupPurchaseOrders
}
