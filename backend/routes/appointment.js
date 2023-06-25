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
        if (!emp){
          return res.status(404).json({message: 'Employee not found' })
        }
        if (user && user.user_type === "CLIENT") {
          const newAppointment = await new Appointment({
            user_id:req.params.id,
            emp_id:req.params.empid,
            bookingDate: req.body.bookingDate,
            services: req.body.services,
            hair_thickness : req.body.hair_thickness,
            hair_length : req.body.hair_length,
            isPaid: req.body.isPaid,
            status: req.body.status,
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

// Update an appointment
router.put('/api/appointment/update/:id', async (req, res) => {
  try {
    const { user_id, bookingDate, services, isPaid, isCancelled } = req.body;
    const updatedAppointment = await Appointment.findOne({_id: req.params.id});
    if (!updatedAppointment){
      return res.status(404).json({ message : "Unable to find appointment"});
    }
    updatedAppointment.user_id = user_id;
    updatedAppointment.bookingDate = bookingDate;
    updatedAppointment.services = services;
    updatedAppointment.isPaid = isPaid;
    updatedAppointment.isCancelled = isCancelled;
    await updatedAppointment.save();
    return res.status(200).json(updatedAppointment);
  } catch (error) {
    console.log("System trace ", error)
  }
})

//Get all appointments
router.get('/api/appointments', async (req, res) => {
        try{
            const allAppointments = await Appointment.find({});
            const cancelledAppointments = allAppointments.filter(appointment => appointment.isCancelled === true);
            const activeAppointments = allAppointments.filter(appointment => appointment.isCancelled === false);
            res.status(200).json(activeAppointments);
        }catch(err){
            res.json(err);
        }   
})

router.get('/api/appointments/cancelled', async (req, res) => {
  try{
      const allAppointments = await Appointment.find({});
      const cancelledAppointments = allAppointments.filter(appointment => appointment.isCancelled === true);
      res.status(200).json(cancelledAppointments);
  }catch(err){
      res.json(err);
  }   
})

//Delete an appointment from an id move it to cancel
router.get('/api/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findOne({ _id: req.params.id });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' }); 
    }
    appointment.isCancelled = true;
    appointment.save();
    return res.status(200).json({ message: 'Appointment deleted successfully' }); 
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

// Write a review for an appointment
router.post('/api/review/:id', async (req, res) => {
  try{
    const appointment = await Appointment.findById(req.params.id);
    if (appointment) {
        const reviewData = await new Review({ 
          app_id: req.params.id,
          comment : req.body.comment
         }).save()
         appointment.comment.push(reviewData._id);
        const data = await appointment.save()
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