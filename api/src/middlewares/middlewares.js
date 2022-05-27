const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const productos = require("../../productsCats.json");
const { Product, User, Category } = require("../db")
const { Op } = require("sequelize");



function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email)
        if (user === null) {
            return done(null, false, { msg: 'No user with that email' });
        }
        try {
            // console.log(user.dataValues.password);
            if (await bcrypt.compare(password, user.dataValues.password)) {
                return done(null, user);
            }
        } catch (err) {
            return done(err)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.dataValues.id))
    passport.deserializeUser((id, done) => done(null, getUserById(id)))
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

    // const allProd = await Product.findAll({
    //     include: {
    //         model: Category,
    //         attributes: ["name"],
    //         through: { attributes: [] },
    //     }
    // })
    // return allProd;
    return { msg: "Data base loaded succesfully!" };
}
module.exports = {
    initialize,
    getProducts
}