//Modal for user
const mongoose = require('mongoose');
const Appointment = require('./appointments.model');
const Review = require('./review.model');
const Employee = require('./employee.model');
const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true,
        unique : true,
        trim: true,
    },
    password : {
        type: String,
        required : true,
    },
    email : {
        type : String
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Appointment'
    }],
    comments : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    user_type : {
        type: String,
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Employee'
    }
    
})

const User = mongoose.model('User', userSchema);

module.exports = User;