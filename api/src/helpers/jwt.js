const jwt = require('jsonwebtoken');
const generateAccessToken = (id = '', role = '') => {
    return new Promise((resolve, reject) => {
        const payload = { id, role };
        jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '1h',
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
