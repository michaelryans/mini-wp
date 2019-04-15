const image = require('express').Router()
const controller = require('../controllers/image')
const {isLogin} = require('../middlewares/authentication')
const upload = require('../helpers/images')

image.post('/upload', isLogin, upload.multer.single("file"),upload.sendUploadToGCS, controller.uploadFile)
image.get('/', isLogin, controller.getImages)


module.exports = image