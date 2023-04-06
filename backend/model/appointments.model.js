const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
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
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment; 