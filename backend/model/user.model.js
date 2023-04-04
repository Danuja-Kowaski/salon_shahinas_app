//Modal for user
const mongoose = require('mongoose');
const Appointment = require('../model/appointments.model')
const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true,
        unique : true,
        trim: true,
        //minlength : 3
    },
    password : {
        type: String,
        required : true,
    },
    email : {
        type : String
    },
    appointments : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Appointment
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;