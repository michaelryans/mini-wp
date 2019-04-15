const jwt = require('jsonwebtoken');

module.exports = {
    jwtVerify(token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return decoded
    },
    jwtSign(input) {
        const token = jwt.sign(input, process.env.JWT_SECRET)
        return token
    }
}   