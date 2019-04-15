const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email:{
        type:String,
        validate: [
            {
            validator: function(email) {
                return User.findOne({
                    email:email
                })
                .then(found => {
                    console.log(found)
                    console.log('----found validations email')
                    if(found) return false
                })
            },
            message: "email is registered, please enter another email"
        },
        {
            validator: function(email) {
                const regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return regex.test(email)
            },
            message: "please enter valid email adress"
        }]
    },
    password:String,
});
const User = mongoose.model('User', userSchema)
module.exports = User