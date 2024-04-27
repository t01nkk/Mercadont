const jwt = require('jsonwebtoken');

const generateAccessToken = (id = '') => {
    return new Promise((resolve, reject) => {
        const payload = { id }
        jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { //payload MUST be an object or it will be treated as a string (treats it as option expiresIn)
            expiresIn: 60 * 60
        }, (err, token) => {
            if (err) { reject({ message: err.message }) }
            else resolve(token);
        })
    })
}

module.exports = { generateAccessToken };