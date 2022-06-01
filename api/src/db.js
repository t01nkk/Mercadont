require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
    DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`, {
    logging: false,
    native: false,
    timestamps: false
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


const { User, Product, Category, Review, Qa, PurchaseOrder} = sequelize.models;

// Product.belongsToMany(User, { through: 'bought' }); //RELACION PARA 
// User.belongsToMany(Product, { through: 'bought' });// COMPRADOR 

// Product.belongsToMany(PurchaseOrder, { through: 'purchases' })
// PurchaseOrder.belongsToMany(Product, { through: 'purchases' })

// User.belongsToMany(PurchaseOrder, { through: 'purchases' })
// PurchaseOrder.belongsToMany(User, { through: 'purchases' })

Category.belongsToMany(Product, { through: 'productCategories' }); //Relation for
Product.belongsToMany(Category, { through: 'productCategories' }); //categories

Product.belongsToMany(Qa, { through: 'productQAs' }); //Relation for questions and answers
Qa.belongsTo(Product);  

Product.belongsToMany(Review, { through: 'productReviews' }); //Relation for reviews
Review.belongsTo(Product);  

User.belongsToMany(Qa, {through: 'userQAs'});
Qa.belongsTo(User);

User.belongsToMany(Review, {through: 'userReviews'});
Review.belongsTo(User);



module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};