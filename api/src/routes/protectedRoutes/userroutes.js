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
} = require('../../controllers/userController');
const { authenticateNormalUser } = require('../../middlewares/auth');
/*-------------------------------------------------------------- */
/*-------------------------UserInfo------------------------------- */

// Get User
router.get('/details/:id', authenticateNormalUser, getUser);

// Update User
router.put('/details/:id', authenticateNormalUser, updateUser);

/*-------------------------------------------------------------- */
/*-------------------------Favorites-----------------------------*/

router.post('/addFavorite', authenticateNormalUser, addFavorite);

router.delete('/removeFavorite', authenticateNormalUser, removeFavorite);

// Get User's favorites
router.get('/favorite/:id', authenticateNormalUser, findOneFavorite);

/*-------------------------------------------------------------- */
/*---------------------Purchase History--------------------------*/

// Get User's purchase history
router.get('/history/:id', authenticateNormalUser, getPurchaseHistoryById);

router.post(
    '/product/history',
    authenticateNormalUser,
    getUserPurchasingHistory
);

module.exports = router;
