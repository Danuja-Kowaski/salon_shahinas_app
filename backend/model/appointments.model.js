const mongoose = require('mongoose');
const User = require('./user.model')
const Review = require('./review.model')
const Employee = require('./employee.model')
const appointmentSchema = new mongoose.Schema({
  user_id:{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  emp_id:{
    type: mongoose.Schema.Types.ObjectId, ref: 'Employee'
  },
  bookingDate: {
    type: Date,
    required: true
  },
  services: [{
    label: {
        type: String,
    },
    value: {
        type: String,
    },
    price: {
        type: String,
    },
}],
hair_thickness : [{type : String
}],
hair_length : {
  type : Number
},
comment:[{
  type: mongoose.Schema.Types.ObjectId, ref: 'Review'
}],
isPaid:{
  type: Boolean,
  default: false
},
isCancelled:{
  type: Boolean,
  default: false
},
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment; 