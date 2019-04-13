const User = require('../models/user')
const {jwtVerify} = require('../helpers/jwt')
const {jwtSign} = require('../helpers/jwt')

class UserController {
    static create(req,res) {
        console.log('masuk create lho')
        User.create({
            email:req.body.email,
            password:req.body.password
        })
        .then(created => {
            res.status(201).json(created)
        })
        .catch(err => {
            res.status(500).json({
                error:err,
                message:"failed create new user"
            })
        })
    }

    static login(req,res) {
        //console.log('masuk login')
        User.findOne({
            // _id:
            email: req.body.email
        })
        .then(data => {
            //console.log('masuk then login')
            if(data) {
                //later add hash to this
                if(data.password == req.body.password) {
                    const decode_this = {
                        _id:data._id,
                        email:data.email
                    }
                    const server_token = jwtSign(decode_this)
                    res.json(server_token) 
                }
            }
        })
        .catch(err => {
            res.status(401).json({
                error:err,
                message:"Login failed"
            })
        })
    }
    
    static findAll(req,res) {
        User.find()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({
                error:err,
                message:"gagal findall user - server"
            })
        })
    }
}

module.exports = UserController