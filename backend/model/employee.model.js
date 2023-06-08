const mongoose = require('mongoose');
const Appointment = require('./appointments.model')
const employeeSchema = new mongoose.Schema({
  empName:{
    type: String,
  },
  empPassword:{
    type: String
  },
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
}],
});
const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee; 