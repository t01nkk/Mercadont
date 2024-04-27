const { Router } = require("express");
const router = Router();
const { User } = require("../db");
const bcrypt = require("bcrypt");
const sequelize = require('sequelize')
const { generateAccessToken } = require("../helpers/jwt");
// const { groupPurchaseOrders } = require("../middlewares/middlewares");


router.post("/register", async (req, res) => {
    const { name, lastname, password, email, cart } = req.body;
    try {
        const userExist = await User.findOne({ where: { email: email } });
        if (userExist) throw new Error("Email in use")
        const salt = 10;
        const passwordHash = bcrypt.hashSync(password[0], salt);

        const createdUser = await User.create({
            email: email,
            password: [passwordHash],
            name: name,
            lastname: lastname,
            cart: cart?.length ? cart : []
        });

        const token = await generateAccessToken(createdUser.id);

        return res.send({ message: "User Registered", token, createdUser });

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