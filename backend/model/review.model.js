//Modal for user
const mongoose = require('mongoose');
const User = require('./user.model')
const reviewSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
      },
    comment : [{
        type: String
    }],
})
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;