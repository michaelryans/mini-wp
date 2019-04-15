const express = require('express')
const router = express.Router()
const articleRouter = require('./article')
const userRouter = require('./user')
const imageRouter = require('./image')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mini-wp', {useNewUrlParser:true})

router.use('/articles', articleRouter)
router.use('/users', userRouter)
router.use('/images', imageRouter)

module.exports = router