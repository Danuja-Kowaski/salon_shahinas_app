//Modal for user
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true,
        trim: true,
        //minlength : 3
    },
    password : {
        type: String,
        required : true,
    },
    email : {
        type : String
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;