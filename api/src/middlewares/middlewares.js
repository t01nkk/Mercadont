const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const productos = require("../../productsCats.json");
const { Product, User, Category } = require("../db")
const { Op } = require("sequelize");

const modifyStock =  async (local) =>{
    let updateProduct;
    try{
        for (let i = 0; i < local.length; i++) {
            const findProduct = await Product.findByPk(local[i].id);
            if (findProduct.stock - local[i].amount > 0) {
                updateProduct = await Product.update({ stock: findProduct.stock - local[i].amount },{where:{id:local[i].id}})
            } else if (findProduct.stock - local[i].amount === 0) {
                updateProduct = await Product.update({ stock: findProduct.stock - local[i].amount, status: "inactive" },{where:{id:local[i].id}})
            } else {
                throw new Error({ msg: "There's not enough products to fulfill this purchase" });
            }
        }
        console.log(updateProduct)
        return { msg: "compra realizada" };
    }catch(error){
        return error
    }
}

function initialize(passport, getUserByEmail, getUserById) {//
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email)
        if (user === null) {
            // console.log("Hola no existo")
            return done(null, false, { msg: 'No user with that email' });
            
        }
        if(user?.dataValues.banned){
            return done(null, false, { msg: 'Your account has been banned. Please, get in contact with the Admin.'});
        }
    
        try {
            // console.log(user.dataValues.password);
            if (await bcrypt.compare(password, user.dataValues.password)) {
                console.log(user.dataValues.password, "SOY EL PASS")
                return done(null, user);
            }
        } catch (err) {
            return done(err)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.dataValues.name))
    passport.deserializeUser((name, done) => done(null, getUserById(name)))
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

function validateInputProduct(name, price, description, image, stock, categories) {
    let errors = [];
    if (!name || name.length > 60) errors.push("Name is not valid");
    if (!price || price < 1) errors.push("Price is not valid");
    if (!description) errors.push("Description is not valid");
    if (!image) errors.push("Please, add at least one image of the product");
    if (!stock || stock < 1) errors.push("Stock is not valid");
    if (!categories.length) errors.push("Please, add at least one category that the product belongs to");
    return errors;
}

async function getProducts() {
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
        // console.log("productos[i].name")

    } else return { msg: "Failed" };

    return { msg: "Data base loaded succesfully!" };
}
module.exports = {
    initialize,
    getProducts,
    validateInputUser,
    validateInputProduct,
    modifyStock
}