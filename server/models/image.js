const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const imageSchema = new Schema({
    imageUrl: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});
const Image = mongoose.model('Image', imageSchema)
module.exports = Image