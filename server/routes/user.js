const user = require('express').Router()
const controller = require('../controllers/user')
const {googleVerify} = require('../middlewares/google-sign')

user.post('/login', controller.login)
user.post('/google-login', googleVerify, controller.googleSign)
user.post('/', controller.create)
user.get('/', controller.findAll)


module.exports = user