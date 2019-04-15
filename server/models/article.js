const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title:String,
    content:String,
    createdAt:Date,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
