const mongoose = require('mongoose');
const Review = require('./review.model')

const appointmentSchema = new mongoose.Schema({
  bookingDate: {
    type: String,
    required: true
  },
  stylists: {
    type: String,
    required: true
  },
  services: {
    type: String,
    required: true
  },
  comment : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }]
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment; 