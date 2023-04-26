const router = require('express').Router();
const User = require('../model/user.model');
const Appointment = require('../model/appointments.model')
const Review = require('../model/review.model')

// Create appointment for a user
router.post('/api/appointment/:id', async (req, res) => {
    try{
        const body = req.body
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newAppointment = await new Appointment({
        bookingDate: req.body.bookingDate,
        stylists: req.body.stylists,
        services: req.body.services,
        }).save()
        user.appointments.push(newAppointment);
        const userdata = await user.save();
        res.status(200).json({ message: 'Appointment added successfully' });
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
router.delete('/api/appointments/:userId/del/:id', async (req, res) => {
    try{
        const body = req.body
        const user = await User.findById(req.params.userId);
        const appointment = await Appointment.find(req.params.id)
        console.log(user) 
        console.log(appointment) 
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'user deleted successfully' });
    } catch (err) {
        console.log(err)
    }
})

//Write a review for an appointment
router.post('/api/review/:id', async (req, res) => {
    try{
        const body = req.body
        console.log(req.params.id)
        const appointment = await Appointment.findById(req.params.id);
        console.log(appointment)
        if (appointment) {
            const reviewData = await new Review({ ...body }).save()
            appointment.comment.push(reviewData)
            const data = await appointment.save()
            return res.status(200).json({ message: 'Review added successfully' });
        }
        return res.status(404).json({ message: 'User not found' });
    } catch (err) {
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

module.exports = router;