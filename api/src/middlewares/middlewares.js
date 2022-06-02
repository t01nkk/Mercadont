const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const productos = require("../../productsCats.json");
const users = require("../../users.json")
const { Product, User, Category } = require("../db")
const { Op } = require("sequelize");
const { genPassword } = require('./password_utils');

const modifyStock = async (local) => {
    let updateProduct;
    try {
        for (let i = 0; i < local.length; i++) {
            const findProduct = await Product.findByPk(local[i].id);
            if (findProduct.stock - local[i].amount > 0) {
                updateProduct = await Product.update({ stock: findProduct.stock - local[i].amount }, { where: { id: local[i].id } })
            } else if (findProduct.stock - local[i].amount === 0) {
                updateProduct = await Product.update({ stock: findProduct.stock - local[i].amount, status: "inactive" }, { where: { id: local[i].id } })
            } else {
                throw new Error({ msg: "There's not enough products to fulfill this purchase" });
            }
        }
        console.log(updateProduct)
        return { msg: "compra realizada" };
    } catch (error) {
        return error
    }
}

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/user/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/user')
    }
    next()
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
    if (!image) errors.push("Please, add at least one image of the product");
    if (!description) errors.push("Description is not valid");
    if (typeof stock !== "number" || stock < 0) errors.push("Stock is not valid");
    if (typeof price !== "number" || price <= 0) errors.push("Price is not valid");
    if (!categories?.length) errors.push("Please, add at least one category that the product belongs to");
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

    } else return { msg: "Failed" };

    return { msg: "Product Database loaded succesfully!" };
}

async function getUsers() {
    const findCreated = await User.findAll({ where: { userCreated: true } })
    const count = await User.count();
    if (findCreated?.length === count) {
        for (let i = 0; i < users.length; i++) {
            let password = genPassword(users[i].password)
            await User.create({
                email: users[i].email,
                password: password,
                name: users[i].name,
                lastname: users[i].lastname,
                address: users[i].address,
                image: users[i].image,
                banned: users[i].banned,
                isAdmin: users[i].isAdmin
            })
        }
    }
}

module.exports = {
    getUsers,
    getProducts,
    validateInputUser,
    validateInputProduct,
    modifyStock,
    checkAuthenticated,
    checkNotAuthenticated
}