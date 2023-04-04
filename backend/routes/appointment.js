const router = require('express').Router();

const Appointment = require('../model/appointments.model')

// Create appointment for a user
router.post('/api/:userId/appointment', async (req, res) => {
    try{
        const userID = req.params.userId;
        console.log(userID)
        const user = await User.findById(userID);
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
        const newAppointment = new Appointment({
        bookingDate: req.body.bookingDate,
        stylists: req.body.stylists,
        services: req.body.services
        });
        user.appointments.push(newAppointment);
        await user.save();
        res.status(200).json({ message: 'Appointment added successfully' });
    } catch (err) {
        res.json(err);
    }
});


module.exports = router;