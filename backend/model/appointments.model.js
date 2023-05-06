const mongoose = require('mongoose');
const Review = require('./review.model')

const appointmentSchema = new mongoose.Schema({
  bookingTime: { 
    type: String, 
    required: true 
  },
  bookingDate: {
    type: Date,
    required: true
  },
  name:{
    type: String,
    required : false
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