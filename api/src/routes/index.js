const router = require('express').Router();
const productRoutes = require('./productroutes');
const userRoutes = require('./protectedRoutes/userroutes');
const categoryRoutes = require('./categoryroutes');
const qaRoutes = require('./questionanswerroutes');
const reviewRoutes = require('./reviewroutes');
const adminRoutes = require('./protectedRoutes/adminroutes');
const payRoutes = require('./protectedRoutes/payroutes');
const authRoutes = require('./authroutes');

router.use('/auth', authRoutes);
router.use('/product', productRoutes);
router.use('/user', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/qa', qaRoutes);
router.use('/review', reviewRoutes);
router.use('/admin', adminRoutes);
router.use('/buying', payRoutes);

module.exports = router;
