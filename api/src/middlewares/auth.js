const jwt = require('jsonwebtoken');
const { User } = require('../db');

const authenticateUser = async (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) res.status(403).send({ message: 'Token not found' });
    try {
        token = token.split(' ')[1];
        const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const findUser = User.findUserByPk(id, {
            attributes: {
                exclude: ['password', 'deletedAt', 'createdAt', 'updatedAt'],
            },
        });
        if (!findUser) res.status(404).send({ message: 'User not found' });
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = {
    authenticateUser,
};
