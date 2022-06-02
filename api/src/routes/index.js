const router = require("express").Router();

const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const categoryRoutes = require("./categoryRoutes");
const payRoutes = require("./payRoutes");

router.use("/product", productRoutes);
router.use("/user", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/buying", payRoutes);
// router.use("/categories", categoryRoutes)

module.exports = router;
