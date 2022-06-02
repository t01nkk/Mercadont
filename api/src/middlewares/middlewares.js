const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const productos = require("../../productsCats.json");
const users = require("../../users.json");
const { Product, User, Category } = require("../db");
const { Op } = require("sequelize");
<<<<<<< HEAD
const { genPassword } = require('./PasswordUtils');
const nodemailer = require("nodemailer");
=======
const { genPassword } = require('./password_utils');
>>>>>>> 334009d1f96e33bc14fd660f56476ce149ad0bc0

const modifyStock = async (local) => {
  let updateProduct;
  try {
    for (let i = 0; i < local.length; i++) {
      const findProduct = await Product.findByPk(local[i].id);
      if (findProduct.stock - local[i].amount > 0) {
        updateProduct = await Product.update(
          { stock: findProduct.stock - local[i].amount },
          { where: { id: local[i].id } }
        );
      } else if (findProduct.stock - local[i].amount === 0) {
        updateProduct = await Product.update(
          { stock: findProduct.stock - local[i].amount, status: "inactive" },
          { where: { id: local[i].id } }
        );
      } else {
        throw new Error({
          msg: "There's not enough products to fulfill this purchase",
        });
      }
    }
<<<<<<< HEAD
}

// passport.use(new Strategy(
//     function(username, password, done) {
//       db.users.findByUsername(username)
//         .then((user) => {
//           if(!user) {
//             return done(null, false);
//           }
//           if(user.password != password) {
//             return done(null, false);
//           }
//           return done(null, user);
//         })
//       .catch(err => {
//         return done(err);
//       })
//     }));

// function initialize(passport, getUserByEmail, getUserById) {
//     console.log(passport)
//     const authenticateUser = async (email, password, done) => {
//         const user = await getUserByEmail(email)
//         // console.log(user?.dataValues, "acá está el dataValues");
//         if (user === null) {
//             // console.log("Hola no existo")
//             return done(null, false, { msg: 'No user with that email' });

//         }
//         try {
//             // console.log(user.dataValues.password);
//             if (await bcrypt.compare(password, user.dataValues.password)) {
//                 console.log(user.dataValues.password, "SOY EL PASS")
//                 return done(null, user);
//             }
//         } catch (err) {
//             return done(err)
//         }
//     }

//     passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
//     passport.serializeUser((user, done) => done(null, user.dataValues.name))
//     passport.deserializeUser((name, done) => done(null, getUserById(name)))
// }
=======
    console.log(updateProduct);
    return { msg: "compra realizada" };
  } catch (error) {
    return error;
  }
};

>>>>>>> 334009d1f96e33bc14fd660f56476ce149ad0bc0
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/user/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/user");
  }
  next();
}

function validateInputUser(name, lastname, email, password) {
  let errors = [];
  // if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) errors.push("Email address is not valid");
  // if (!name || name.length > 30) errors.push("Name is not valid");
  // if (!lastname || lastname.length > 30) errors.push("Last name is not valid");
  // if (!/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/.test(password)) errors.push("Password must have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long");
  //VALIDATE PAYMENT AND ADDRESS???????????
  return errors;
}

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
<<<<<<< HEAD
    const findCreated = await Product.findAll({ where: { created: true } })
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
                db: true
            })
            for (let j = 0; j < productos[i].categories.length; j++) {
                let cat = await Category.findOne({ where: { name: { [Op.iLike]: `%${productos[i].categories[j]}%` } } })

                if (cat) {
                    await newProduct.addCategory(cat)
                } else {
                    let created = await Category.create({ name: productos[i].categories[j] })
                    await newProduct.addCategory(created);
                }
            }
        }
    } else return { msg: "Failed" };
    return { msg: "Product Database loaded succesfully!" };
=======
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
>>>>>>> 334009d1f96e33bc14fd660f56476ce149ad0bc0
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

module.exports = {
<<<<<<< HEAD
  // initialize
=======
>>>>>>> 334009d1f96e33bc14fd660f56476ce149ad0bc0
  getUsers,
  getProducts,
  validateInputUser,
  validateInputProduct,
  modifyStock,
  checkAuthenticated,
  checkNotAuthenticated,
<<<<<<< HEAD
  mailPayPal,
}
=======
};
>>>>>>> 334009d1f96e33bc14fd660f56476ce149ad0bc0
