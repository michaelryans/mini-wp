const article = require('express').Router()
const controller = require('../controllers/article.js')


article.get('/', controller.findAll)
article.post('/', controller.create)
article.get('/:id', controller.findOne)
article.patch('/:id', controller.update)
article.delete('/:id', controller.delete)

module.exports = article