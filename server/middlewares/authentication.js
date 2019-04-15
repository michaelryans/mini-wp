const {jwtVerify} = require('../helpers/jwt')
const User = require('../models/user')

module.exports = {
    isLogin(req,res,next) {
        console.log('masuk isLogin')
        try {
            // console.log('masuk try')
            const decoded = jwtVerify(req.headers.token, process.env.JWT_SECRET)
            // console.log(decoded)
            User.findOne({
                _id:decoded._id
            })
            .then(found => {
                if(found) {
                    req.decoded = decoded
                    next()
                }
            })
        }
        catch {
            res.status(401).json({
                message: "error authenticating user"
            })
        }
    }
}