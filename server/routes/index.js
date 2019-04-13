const express = require('express')
const router = express.Router()
const articleRouter = require('./article')
const userRouter = require('./user')
const tagRouter = require('./tag')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mini-wp', {useNewUrlParser:true})

router.use('/articles', articleRouter)
router.use('/users', userRouter)
router.use('tags', tagRouter)

module.exports = router