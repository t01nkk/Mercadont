const jwt = require('jsonwebtoken');
const { User } = require('../db');

const authenticateUser = async (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) throw new Error('Invalid Token');
    let { admin } = req.body;
    try {
        token = token.split(' ')[1];
        const { id, role } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (role === '1') res.status(403).send({ message: 'Banned user' });

        if (admin && role !== '2')
            res.status(403).send({ message: 'Admin only' });

        const findUser = User.findByPk(id, {
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
