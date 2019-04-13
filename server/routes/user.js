const user = require('express').Router()
const controller = require('../controllers/user')

user.post('/', controller.create)
user.post('/login', controller.login)
user.get('/', controller.findAll)


module.exports = user