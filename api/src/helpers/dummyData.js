const productos = require('../../productscats.json');
const users = require('../../users.json');
const { Product, User, Category, PurchaseOrder, Review } = require('../db');
const { Op } = require('sequelize');

async function getProducts() {
    const findUserCreated = await User.findAll({
        where: { userCreated: true },
    });
    const countUser = await User.count();
    if (findUserCreated?.length === countUser) {
        for (let i = 0; i < users.length; i++) {
            await User.create({
                id: 'G6kwSxpc9LgFQ76jJE1SPIiZGfI2',
                email: users[i].email,
                name: users[i].name,
                role: users[i].role,
                password: users[i].password,
            });
        }
    }
    const admin = await User.findOne({ where: { email: users[0].email } });

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
                userId: admin.id,
            });
            newProduct.addReview(fullReview);
            admin.addReview(fullReview);

            for (let j = 0; j < productos[i].categories.length; j++) {
                let cat = await Category.findOne({
                    where: {
                        name: { [Op.iLike]: `%${productos[i].categories[j]}%` },
                    },
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
    } else return { msg: 'Failed' };

    return { msg: 'Product Database loaded succesfully!' };
}

module.exports = {
    getProducts,
};
