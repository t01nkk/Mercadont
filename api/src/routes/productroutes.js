const { Product, Category, Qa, Review, PurchaseOrder } = require('../db');
const { Router } = require('express');
const { validateInputProduct } = require('../middlewares/middlewares');
const { Op } = require('sequelize');

const {
    getAllProductsFiltersCatNamePrice,
    getAllProducts,
    filterProductCategory,
    findProductDetail,
    getManyProductDetail,
    createProduct,
    deleteProduct,
    updateProduct,
    recomendationMostSold,
    recomendationByRating,
    recomendationByUserHistory,
} = require('../controllers/productController');

const router = Router();
//----------------------PRODUCT FILTER---------------------------------- //
//Get All Products, Filter By Category, Name, Price
router.get('/', getAllProductsFiltersCatNamePrice);

//----------------------PRODUCT SEARCH---------------------------------- //
// Get all products
router.get('/search', getAllProducts);

//----------------------PRODUCT FILTER BY CATEGORY---------------------------------- //
// Get all products Filter By Category
router.post('/filter', filterProductCategory);

//----------------------ONE PRODUCT DETAILS---------------------------------- //
//Get Product Details
router.get('/:id', findProductDetail);

//----------------------MANY PRODUCTS DETAILS---------------------------------- //
//Get MANY Product Details
router.get('/manyProducts', getManyProductDetail);

//----------------------CREATE PRODUCT---------------------------------- //
//Create Product
router.post('/create', createProduct);

//----------------------DELETE PRODUCT---------------------------------- //
//Delete Product
router.delete('/delete/:id', deleteProduct);

//---------------------UPDATE PRODUCT---------------------------------- //
//In the update form, LOAD ALL THE DATA FOR CHANGING
router.put('/update/:id', updateProduct);

//-------------------RECOMMENDATION - MOST SOLD PRODUCTS------------------------------ //
router.get('/recommendation/mostSold', recomendationMostSold);

//-------------------RECOMMENDATION - PRODUCTS BY RATING ------------------------------ //
router.get('/recommendation/byRating', recomendationByRating);
//-------------------RECOMMENDATION - PRODUCTS BY HISTORY ------------------------------ //

router.get('/recommendation/byHistory/:userId', recomendationByUserHistory);

module.exports = router;
