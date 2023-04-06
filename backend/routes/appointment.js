const router = require('express').Router();
const User = require('../model/user.model');
const Appointment = require('../model/appointments.model')

// Create appointment for a user
router.post('/api/appointment/:id', async (req, res) => {
    try{
        const body = req.body
        console.log(req.params.id)
        const user = await User.findById(req.params.id);
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
        const newAppointment = new Appointment({
        bookingDate: req.body.bookingDate,
        stylists: req.body.stylists,
        services: req.body.services
        });
        user.appointments.push(newAppointment);
        const userdata = await user.save();
        const appointment = await new Appointment({ ...body }).save();
        res.status(200).json({ message: 'Appointment added successfully' });
    } catch (err) {
        console.log(err)
    }
});



//Get all appointments
router.get('/api/appointments', async (req, res) => {
    try{
        try{
            const allAppointments = await Appointment.find({});
            console.log(allAppointments)
            res.status(200).json(allAppointments)
        }catch(err){
            res.json(err);
        }
    }catch(err){

    }
})


module.exports = router;