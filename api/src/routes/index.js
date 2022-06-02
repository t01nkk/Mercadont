const router = require('express').Router();
const productRoutes = require("./product_routes")
// const userRoutes = require("./userRoutes")
const userRoutes = require("./user_login_routes")
const categoryRoutes = require("./category_routes")
const qaRoutes = require("./question_answer_routes")
const reviewRoutes = require("./review_routes")
const adminRoutes = require("./admin_routes")

router.use("/product", productRoutes)
router.use("/user", userRoutes)
router.use("/categories", categoryRoutes)
router.use("/qa", qaRoutes)
router.use("/review", reviewRoutes)
router.use("/admin", adminRoutes)


module.exports = router;
