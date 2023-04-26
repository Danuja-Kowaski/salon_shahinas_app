//Modal for user
const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    comment : [{
        type: String
    }]
})
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;