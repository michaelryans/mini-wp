const Image = require('../models/image')

class ImageController {

    static uploadFile(req,res) {
        console.log('masuk sini upload file /images/upload')
        Image.create({
            imageUrl:req.file.cloudStoragePublicUrl,
            user:req.decoded._id
        })
        .then(uploaded => {
            res.status(200).json({
                uploaded:uploaded,
                message:"successfully get URL for files"
            })
        })
        .catch(err => {
            res.status(500).json({
                error:err,
                message:"error in creating file - imageurl"
            })
        })
        
    }

    static getImages(req,res) {
        Image.find({
            user:req.decoded._id
        })
        .then(data => {
            // console.log(data)
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }







}


module.exports = ImageController