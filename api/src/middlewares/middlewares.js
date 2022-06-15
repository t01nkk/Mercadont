const nodemailer = require("nodemailer");
const productos = require("../../productscats.json");
const users = require("../../users.json");
const { Product, User, Category, PurchaseOrder, Review } = require("../db");
const { Op } = require("sequelize");
// const { genPassword } = require('./password_utils');

const modifyStockStripe = async (local) => {

  let updateProduct;
  try {
    for (let i = 0; i < local.length; i++) {

      const findProduct = await Product.findByPk(local[i].id);

      if (findProduct.stock <= 0 && findProduct.stock - local[i].quantity < 0) {
        return false;
      }

      if (findProduct.stock - local[i].quantity > 0) {
        updateProduct = await Product.update(
          { stock: findProduct.stock - local[i].quantity },
          { where: { id: local[i].id } }
        );
      }

      if (findProduct.stock - local[i].quantity === 0) {
        updateProduct = await Product.update(
          { stock: findProduct.stock - local[i].quantity, status: "inactive" },
          { where: { id: local[i].id } }
        );
      }
    }
    return updateProduct;
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
      } else if (findProduct.stock - product.dataValues.productQuantity < 0) {
        updateProduct = await Product.update(
          { stock: 666 } , {where: {id: product.dataValues.productId}}
        )
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
  const findUserCreated = await User.findAll({ where: { userCreated: true } });
  const countUser = await User.count();
  if (findUserCreated?.length === countUser) {
    for (let i = 0; i < users.length; i++) {
      await User.create({
        id: "G6kwSxpc9LgFQ76jJE1SPIiZGfI2",
        email: users[i].email,
        name: users[i].name,
        banned: users[i].banned,
        isAdmin: users[i].isAdmin,
      });
    }
  }
  const admin = await User.findOne({ where: { email: users[0].email } })

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

      const fullReview = await Review.create({
        rating: productos[i].rating,
        text: '',
        productId: newProduct.id,
        userId: admin.id
      })
      newProduct.addReview(fullReview)
      admin.addReview(fullReview)

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

const calcProdRating = async (rating, prod) => {
  let sum = parseInt(rating);
  let count = 1;
  prod.reviews.map(review => { sum += review.rating; ++count })
  await Product.update({
    rating: Number(sum / count).toFixed(2)
  },
    {
      where: {
        id: prod.id
      }
    }
  )
}

// async function getUsers() {
//   const findCreated = await User.findAll({ where: { userCreated: true } });
//   const count = await User.count();
//   if (findCreated?.length === count) {
//     for (let i = 0; i < users.length; i++) {
//       await User.create({
//         email: users[i].email,
//         name: users[i].name,
//         image: users[i].image,
//         banned: users[i].banned,
//         isAdmin: users[i].isAdmin,
//       });
//     }
//   }
// }

// async..await is not allowed in global scope, must use a wrapper
async function mailPayment(recipient, orderId) {
  // Tendría que entrarle como parámetro, entre otras cosas, el email.
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GOOGLE_MAIL_APP,
      pass: process.env.GOOGLE_MAIL_APP_PASS,
    },
  });
  // send mail with defined transport object
  await transporter.sendMail({
    from: "Mercadon't Libre no-reply@mercadontlibre.com",
    to: recipient, // list of receivers
    subject: `Purchase Order N°: -${orderId}- ✔`, // Subject line
    text: "We have successfully received the payment for your purchase. We will contact you again when the order is processed and ready to be delivered.", // plain text body
    html: "<b>We have successfully received the payment for your purchase. We will contact you again when the order is processed and ready to be delivered.</b>", // html body
  });
  // console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

async function mailQuestion(recipient, productName, productId) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GOOGLE_MAIL_APP,
      pass: process.env.GOOGLE_MAIL_APP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: "Mercadon't Libre no-reply@mercadontlibre.com",
      to: recipient,
      subject: `Your question on ${productName} has been answered ✔`,
      text: `Your question on the product ${productName} has been answered. Check your your email.`, // plain text body
      html: `<b>You question on the product has been answered. You can click on this <a href=${process.env.HOST_PORT_FRONT}/home/${productId}>link</a> to see the answer.</b>`, // html body
    });
  } catch (error) {
    console.log(error)
  }
}

async function mailOrderAccepted(recipient, orderId) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GOOGLE_MAIL_APP,
      pass: process.env.GOOGLE_MAIL_APP_PASS,
    },
  });

  await transporter.sendMail({
    from: "Mercadon't Libre no-reply@mercadontlibre.com",
    to: recipient, // list of receivers
    subject: `Your order N° ${orderId} has been accepted`, // Subject line
    text: `Your order N° ${orderId} has been accepted. You will be receving your order in around 2 weeks.`, // plain text body
    html: `<b>Your order N° ${orderId} has been accepted. You will be receving your order in around 2 weeks.</b>`, // html body
  });
}

async function mailOrderRejected(recipient, orderId) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GOOGLE_MAIL_APP,
      pass: process.env.GOOGLE_MAIL_APP_PASS,
    },
  });

  await transporter.sendMail({
    from: "Mercadon't Libre no-reply@mercadontlibre.com",
    to: recipient, // list of receivers
    subject: `Your order N° ${orderId} has been rejected`, // Subject line
    text: `Your order N° ${orderId} has been rejected. Please send an email to mercadont.libre@gmail.com to get more information.`, // plain text body
    html: `<b>Your order N° ${orderId} has been rejected. Please send an email to mercadont.libre@gmail.com to get more information.</b>`, // html body
  });
}

function groupPurchaseOrders(purchaseOrders) {
  let orders = [];
  let order = {
    orderNumber: "",
    date: "",
    products: [],
    amount: 0,
    orderStatus: "",
    review: false,
    user: "",
  };
  // order.orderNumber = purchaseOrders[0].orderId;
  // order.date = purchaseOrders[0].date;
  // order.amount = purchaseOrders[0].totalAmount;
  // order.orderStatus = purchaseOrders[0].orderStatus;
  // order.review = purchaseOrders[0].review;
  // order.user = purchaseOrders[0].userId;

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
        orderStatus: "",
        review: false,
      };
      order.user = item.userId;
      order.orderNumber = item.orderId;
      order.date = item.date;
      order.amount = item.totalAmount;
      order.orderStatus = item.orderStatus;
      order.review = item.review;
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
  // getUsers,
  calcProdRating,
  getProducts,
  // validateInputUser,
  validateInputProduct,
  modifyStockStripe,
  modifyStockPaypal,
  // checkAuthenticated,
  // checkNotAuthenticated,
  mailPayment,
  mailQuestion,
  mailOrderAccepted,
  mailOrderRejected,
  groupPurchaseOrders
}
