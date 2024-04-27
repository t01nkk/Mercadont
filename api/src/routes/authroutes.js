const { Router } = require("express");
const router = Router();
const { User, Product, PurchaseOrder } = require("../db");
// const { groupPurchaseOrders } = require("../middlewares/middlewares");


router.post("/register", async (req, res) => {
    const { name, lastname, email, address, image, payment, id } = req.body;
    try {
        const userExist = await User.findOne({ where: { email: email } });
        if (userExist) res.status(304).send({ message: "User exists" });
        await User.create({
            email: email,
            name: name,
            lastname: lastname,
            address: JSON.stringify(address),
            image: image,
            payment: payment,
            id: id,
        });
        return res.send({ msg: "User Registered" });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

router.post("/login", async (req, res, next) => {
    // const { email, password } = req.body;
    const { name, email, image, id } = req.body;
    try {
        const userExist = await User.findOrCreate({
            where: { id: id }, defaults: {
                email: email,
                name: name,
                image: image,
                id: id,
            }
        }
        )
        res.status(200).send(userExist);
    }
    catch (err) {
        console.log(err)
    }
});

module.exports = router;