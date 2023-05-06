const mongoose = require('mongoose');
const Appointment = require('./appointments.model')
const employeeSchema = new mongoose.Schema({
  bookingTime: { 
    type: String, 
    required: true 
  },
  bookingDate: {
    type: Date,
    required: true
  },
  empName:{
    type: String,
    required : false
  },
  services: {
    type: String,
    required: true
  },
  appointments : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
}]
});
const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Appointment; 