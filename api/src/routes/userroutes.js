const { Router } = require('express');
const router = Router();
const {
    getUser,
    updateUser,
    addFavorite,
    removeFavorite,
    findOneFavorite,
    getPurchaseHistoryById,
    getUserPurchasingHistory,
} = require('../controllers/userController');

/*-------------------------------------------------------------- */
/*-------------------------UserInfo------------------------------- */

// Get User
router.get('/details/:id', getUser);

// Update User
router.put('/details/:id', updateUser);

/*-------------------------------------------------------------- */
/*-------------------------Favorites-----------------------------*/

router.post('/addFavorite', addFavorite);

router.delete('/removeFavorite', removeFavorite);

// Get User's favorites
router.get('/favorite/:id', findOneFavorite);

/*-------------------------------------------------------------- */
/*---------------------Purchase History--------------------------*/

// Get User's purchase history
router.get('/history/:id', getPurchaseHistoryById);

router.post('/product/history', getUserPurchasingHistory);

module.exports = router;
