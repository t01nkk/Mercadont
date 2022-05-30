const router = require('express').Router();
const productRoutes = require("./productRoutes")
// const userRoutes = require("./userRoutes")
const userRoutes = require("./userRoutesTryal")
const categoryRoutes = require("./categoryRoutes")
const qaRoutes = require("./qARoutes")
const reviewRoutes = require("./reviewRoutes")
const adminRoutes = require("./adminRoutes")


// router.use('/', Pokelist);
// router.use('/', pokeTypes);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/product", productRoutes)
router.use("/user", userRoutes)
router.use("/categories", categoryRoutes)
// router.use("/categories", categoryRoutes)
router.use("/qa", qaRoutes)
router.use("/review", reviewRoutes)
router.use("/admin", adminRoutes)


module.exports = router;
