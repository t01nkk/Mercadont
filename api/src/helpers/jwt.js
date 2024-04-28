const jwt = require('jsonwebtoken');
const generateAccessToken = (id = '') => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '60s',
            },
            (err, token) => {
                if (err) {
                    reject({ message: err.message });
                } else resolve(token);
            }
        );
    });
};

module.exports = { generateAccessToken };
