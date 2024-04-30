const { Router } = require('express');
const router = Router();
const { register, login } = require('../controllers/authController');
const { checkAuth } = require('../middlewares/auth');

router.post('/register', checkAuth, register);

router.post('/login', checkAuth, login);

module.exports = router;
