const { Router } = require('express');
const router = Router();
const { User } = require('../db');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../helpers/jwt');

router.post('/register', async (req, res) => {
    const { name, lastname, password, email, cart } = req.body;
    try {
        const userExist = await User.findOne({ where: { email: email } });
        if (userExist) res.status(401).send({ message: 'User already exists' });

        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);

        const createdUser = await User.create({
            email: email,
            password: [passwordHash],
            name: name,
            lastname: lastname,
            cart: cart?.length ? cart : [],
        });

        const token = await generateAccessToken(createdUser.id);

        return res.status(201).send({ message: 'User Registered', token });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExist = await User.findOne({
            where: { email: email },
        });
        if (!userExist) res.status(404).send({ message: 'User not found' });

        const validPassword = bcrypt.compareSync(
            password,
            userExist.password[0]
        );
        if (!validPassword) res.status(403).send({ message: 'Wrong Password' });

        const token = await generateAccessToken(userExist.id);

        res.status(200).send({
            message: 'Login successful',
            token,
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;
