const router = require('express').Router();
const User = require('../model/user.model');
const Appointment = require('../model/appointments.model')
const Review = require('../model/review.model')
const Employee = require('../model/employee.model')


// Create appointment for a client add 
router.post('/api/appointment/:id/:empid', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const emp = await Employee.findById(req.params.empid)
        if (user && user.user_type === "CLIENT") {
          const newAppointment = await new Appointment({
            user_id:req.params.id,
            emp_id:req.params.empid,
            bookingDate: req.body.bookingDate,
            services: req.body.services,
            }).save()
            emp.appointments.push(newAppointment._id)
            user.appointments.push(newAppointment._id)
            const userdata = await user.save();
            const empdata = await emp.save();
            res.status(200).json({ message: 'Appointment added successfully' });
        }
        else{
          return res.status(404).json({ message: 'Client not found' });
        }
    } catch (err) {
        console.log(err)
    }
});

//Get all appointments
router.get('/api/appointments', async (req, res) => {
        try{
            const allAppointments = await Appointment.find({});
            res.status(200).json(allAppointments)
        }catch(err){
            res.json(err);
        }   
})

//Delete an appointment from an id
router.delete('/api/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.deleteOne({ _id: req.params.id });
    if (appointment.deletedCount === 1) {
      return res.status(200).json({ message: 'Appointment deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Appointment not found' });
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}); 


// Adding reviews
//Get all reviews for admin
router.get('/api/reviews', async (req, res) => {
    try{
        const reviewData = await Review.find({});
        res.status(200).json(reviewData)
    }catch(err){
        console.log(err)
    }
})

//Get all reviews for admin
router.get('/api/reviews', async (req, res) => {
  try{
      const reviewData = await Review.find({});
      res.status(200).json(reviewData)
  }catch(err){
      console.log(err)
  }
})

// Write a review for a user
router.post('/api/review/:id', async (req, res) => {
  try{
    const body = req.body
    const user = await User.findById(req.params.id);
    if (user && user.user_type === "CLIENT") {
        const reviewData = await new Review({ 
          user_id: req.params.id,
          comment : req.body.comment
         }).save()
        user.comments.push(reviewData._id)
        const data = await user.save()
        return res.status(200).json({ message: 'Review added successfully' });
      }
    else{
      return res.status(404).json({ message: 'User not found' });
      }
  } catch (err) {
      console.log(err)
  }
})


// View all bookings for one client
router.get('/api/client/:id', async (req, res) => {
  try {
    const client = await User.findById(req.params.id).populate('appointments');
    res.status(200).json(client);
  } catch (err) {
    res.json(err);
  }
});

// View all bookings for one employee
router.get('/api/emp/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate('appointments');
    res.status(200).json(employee);
  } catch (err) {
    res.json(err);
  }
});

// Scheduling
// View all schedules of all employees -> Admin
router.get('/api/employees/sch', async (req, res) => {
  try {
    const employees = await Employee.find({}).populate('appointments');
    res.status(200).json(employees);
  } catch (err) {
    res.json(err);
  }
});


// View all schedules for clients -> Admin
router.get('/api/clients/sch', async (req, res) => {
  try {
    const clients = await User.find({}).populate('appointments');
    res.status(200).json(clients);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;