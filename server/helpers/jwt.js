const jwt = require('jsonwebtoken');

module.exports = {
    jwtVerify () {

    },
    jwtSign(input) {
        const token = jwt.sign(input, process.env.JWT_SECRET)
        return token
    }
}   