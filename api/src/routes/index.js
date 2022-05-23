const router = require('express').Router();
const productRoutes = require("./productRoutes")
const userRoutes = require("./userRoutes")


// router.use('/', Pokelist);
// router.use('/', pokeTypes);


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", productRoutes)
router.use("/", userRoutes)


module.exports = router;
