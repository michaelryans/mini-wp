const User = require('../models/user')
const {jwtSign} = require('../helpers/jwt')
const {bcryptHash,bcryptCompare} = require('../helpers/bcrypt')

class UserController {
    static create(req,res) {
        console.log('masuk create lho')
        console.log(req.body)
        User.create({
            email:req.body.email,
            password:bcryptHash(req.body.password)
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
        // console.log('masuk login')
        User.findOne({
            // _id:
            email: req.body.email
        })
        .then(data => {
            //console.log('masuk then login')
            if(data) {
                //later add hash to this
                let comparison = bcryptCompare(req.body.password,data.password)
                if(comparison) {
                    const decode_this = {
                        _id:data._id,
                        email:data.email
                    }
                    const server_token = jwtSign(decode_this)
                    res.status(200).json(server_token) 
                } else {
                   res.status(401).json({
                       message: 'username/password wrong'
                   })
                }
            } else {
                res.status(401).json({
                    message: 'email not registered'
                })
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

    

    static googleSign(req,res) {
        console.log('masuk google sign - controller')
        // console.log(req.payload)
        
        User.findOne({
            email:req.payload.email
        })
        .then(found => {
            // console.log("masuk then login")
            if(found) {
                const token_data = {
                    _id:found._id,
                    email:found.email
                }
                const token = jwtSign(token_data)

                res.status(200).json({
                    message:"google account found",
                    token:token,
                })
            } else {
                // console.log("masuk else")

                const random = Math.random().toString(36).substring(2, 15)
                const data_user = {
                    email:req.payload.email,
                    password:bcryptHash(random)
                }

                return User.create(data_user)
                .then(created => {
                    // console.log('successully created new user -- google sign in')
                    const token_data = {
                        _id:created._id,
                        email:created.email
                    }
                    const token = jwtSign(token_data)
                    // console.log('---token google sign else-------')
                    // console.log(token)
                    res.status(201).json({token:token, message:"successfully create new google acc"})
                })
                .catch(err=> {
                    console.log('error when creating')
                    res.status(500).json(err)
                })
            }
                
        })
        .catch(err => {
            res.status(500).json({
                error:err,
                message:"error google sign in - controller"
            })
        })

        //res.status(200).json(req.body.token)
    }
}

module.exports = UserController