const tag = require('express').Router()

tag.get('/', (req,res) => {
    res.json('masuk tag')
})



module.exports = tag