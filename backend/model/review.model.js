//Modal for user
const mongoose = require('mongoose');
const User = require('./user.model');
const Appointment = require('./appointments.model');
const reviewSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    app_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Appointment'
    },
    comment : {
        type: String
    }
})
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;