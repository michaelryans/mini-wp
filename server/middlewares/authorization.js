const Article = require('../models/article')

module.exports = {
    isAuthorized(req,res,next) {
        try {
            // console.log('masuk ke authorized ~')
            // console.log(req.decoded) //user info

            // console.log(req.params)

            Article.findOne({
                _id:req.params.id
            })
            .then(found => {
                // console.log(found.user)
                // console.log('------------')
                // console.log(req.decoded._id)
                if(found.user == req.decoded._id) {
                    // console.log('yeaaah authorized')
                    next()
                }
            })
        }

        catch {
            res.status(403).json('User not authorized')
        }
    }
}