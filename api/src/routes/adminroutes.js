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
} = require('../controllers/adminController');
// Working
//Get all Users
router.get('/users', getAllUsers);

// Working
//Get User details
router.get('/users/:id', findUserDetails);

//Get Banned Users
router.get('/bannedUsers', getAllBannedUsers);

//Get Admin Users
router.get('/adminUsers', getAllAdminUsers);

//Give user Admin credencials
router.put('/setAdmin', setAdminUser);

//Ban user
router.put('/ban/:id', banUser);

//ADMIN
router.post('/getAdmin:id', getOneAdmin);
// Creates many orders to test ORDER PURCHASE ORDERS BY DATE
router.get('/loadOrders', loadOrders);

//Filter PURCHASE ORDERS by STATUS
router.get('/filterOrders/:status', filterOrdersByStatus);

// Set PURCHARSE ORDER STATUS
router.put('/setOrderStatus', setPurchaseOrderStatus);

// Get PURCHASE ORDERS by DATE
router.get('/history', getAllPurchaseOrdersByDate);

//Answer Question / Add Answer
router.put('/:questionId/answer', answerQuestion);

//////////QUESTIONS N' ANSWERS ////////////////

router.get('/all/:resolved', getAllQuestionsResolved);

module.exports = router;
