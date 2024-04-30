const { Router } = require('express');
const router = Router();
const {
    getAllUsers,
    findUserDetails,
    getAllBannedUsers,
    getAllAdminUsers,
    setAdminUser,
    banUser,
    getOneAdmin,
    loadOrders,
    filterOrdersByStatus,
    setPurchaseOrderStatus,
    getAllPurchaseOrdersByDate,
    answerQuestion,
    getAllQuestionsResolved,
} = require('../../controllers/adminController');
const { authenticateAdmin } = require('../../middlewares/auth');
// Working
//Get all Users
router.get('/users', authenticateAdmin, getAllUsers);

// Working
//Get User details
router.get('/users/:id', authenticateAdmin, findUserDetails);

//Get Banned Users
router.get('/bannedUsers', authenticateAdmin, getAllBannedUsers);

//Get Admin Users
router.get('/adminUsers', authenticateAdmin, getAllAdminUsers);

//Give user Admin credencials
router.put('/setAdmin', authenticateAdmin, setAdminUser);

//Ban user
router.put('/ban/:id', authenticateAdmin, banUser);

//ADMIN
router.post('/getAdmin:id', authenticateAdmin, getOneAdmin);
// Creates many orders to test ORDER PURCHASE ORDERS BY DATE
router.get('/loadOrders', authenticateAdmin, loadOrders);

//Filter PURCHASE ORDERS by STATUS
router.get('/filterOrders/:status', authenticateAdmin, filterOrdersByStatus);

// Set PURCHARSE ORDER STATUS
router.put('/setOrderStatus', authenticateAdmin, setPurchaseOrderStatus);

// Get PURCHASE ORDERS by DATE
router.get('/history', authenticateAdmin, getAllPurchaseOrdersByDate);

//Answer Question / Add Answer
router.put('/:questionId/answer', authenticateAdmin, answerQuestion);

//////////QUESTIONS N' ANSWERS ////////////////

router.get('/all/:resolved', authenticateAdmin, getAllQuestionsResolved);

module.exports = router;
