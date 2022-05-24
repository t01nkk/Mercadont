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


const { User, Product, Category } = sequelize.models;

// User.hasMany(Product); //RELACION PARA 
// Product.belongsTo(User);// VENDEDOR

Product.belongsToMany(User, { through: 'bought' }); //RELACION PARA 
User.belongsToMany(Product, { through: 'bought' });// COMPRADOR 

Category.belongsToMany(Product, { through: 'productCategories' })
Product.belongsToMany(Category, { through: 'productCategories' })

// Product.belongsToMany(User, { through: 'Bought' }); 
// User.belongsToMany(Product, { through: 'Bought' });


module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};