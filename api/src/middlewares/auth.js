const jwt = require('jsonwebtoken');
const { User } = require('../db');

const authenticateAdmin = async (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) return res.status(404).send({ message: 'Wrong credentials' });
    try {
        token = token.split(' ')[1];
        const { id, role } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (role === '1')
            return res.status(403).send({ message: 'Banned user' });

        if (role !== '2')
            return res.status(403).send({ message: 'Admin only' });

        const findUser = User.findByPk(id, {
            attributes: {
                exclude: ['password', 'deletedAt', 'createdAt', 'updatedAt'],
            },
        });
        if (!findUser)
            return res.status(404).send({ message: 'User not found' });
        next();
    } catch (error) {}
};

const authenticateNormalUser = async (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) throw new Error('Invalid Token');
    try {
        token = token.split(' ')[1];
        const { id, role } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (role === '1')
            return res.status(403).send({ message: 'Banned user' });

        const findUser = User.findByPk(id, {
            attributes: {
                exclude: ['password', 'deletedAt', 'createdAt', 'updatedAt'],
            },
        });
        if (!findUser)
            return res.status(404).send({ message: 'User not found' });
        next();
    } catch (error) {}
};

const checkAuth = async (req, res, next) => {
    try {
        if (!req.header('Authorization')) {
            next();
            return;
        }
        res.status(403).send({ message: 'User already authenticated' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    authenticateNormalUser,
    authenticateAdmin,
    checkAuth,
};
