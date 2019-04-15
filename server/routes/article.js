const article = require('express').Router()
const controller = require('../controllers/article.js')
const {isLogin} = require('../middlewares/authentication')
const {isAuthorized} = require('../middlewares/authorization')


article.get('/users/', isLogin, controller.findAllUserArticle)
// article.post('/', upload.multer.single("image"),upload.sendUploadToGCS, controller.create)
article.get('/:id', controller.findOne)
article.patch('/:id', isLogin, isAuthorized, controller.update)
article.delete('/:id', isLogin, isAuthorized, controller.delete)

article.post('/', isLogin, controller.create)
article.get('/', controller.findAll)
module.exports = article