const Article = require('../models/article')


class ArticleController {
    static create(req,res) {
        Article.create({
            user:req.decoded._id,
            title:req.body.title,
            content:req.body.content,
            createdAt: new Date()
            // user:req.decoded._id,
            //title:req.file.cloudStoragePublicUrl,
            // content:req.body.content,
            // createdAt: new Date()
        })
        .then(created => {
            res.status(201).json(created)
        })
        .catch(err => {
            res.status(500).json({
                error:err,
                message:"error"
            })
        })
    }

    static update(req,res) {
        //findOneAndUpdate accepts 3 params
        //first param is the filter
        //second param is the value to be updated
        //3rd param {new:true} -> will return the newly updated data
        console.log('masuk sini')
        Article.findOneAndUpdate({
            _id:req.params.id
        }, req.body, {new:true})
        .then(found => {
            res.status(200).json(found)
        })
        .catch(err => {
            res.status(500).json({
                error:err,
                message: "error di find one and update"
            })
        })
    }

    static findAllUserArticle(req,res) {
        console.log('masuk fungsiii')
        console.log(req.decoded)
        Article.find({
            user:req.decoded._id
        })
        .then(found => {
            res.status(200).json(found)
        })
        .catch(err => {
            res.status(500).json({
                message:"error get user specific article - server",
                error:err
            })
        })
    }

    static findAll(req,res) {
        Article.find()
        .then(found => {
            res.status(200).json(found)
        })
        .catch(err => {
            res.status(500).json({
                error:err,
                message: "error di atricle:update"
            })
        })
    }

    static findOne(req,res) {
        Article.findOne({
            _id:req.params.id
        })
        .then(found => {
            res.json(found)
        })
        .catch(err => {
            res.status(500).json({
                error:err,
                message: "error di find one"
            })
        })
    }

    static delete(req,res) {
        Article.findOneAndDelete({
            _id:req.params.id
        })
        .then(found => {
            res.status(200).json(found)
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "error di article:delete"
            })
        })
    }
}

module.exports = ArticleController