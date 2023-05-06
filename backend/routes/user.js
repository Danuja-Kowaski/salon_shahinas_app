const router = require('express').Router();
//import model
const User = require('../model/user.model');

//register user to db
router.post('/api/register', async (req, res) => {
    try{
        const body = req.body;
        const savedUser = await new User({ ...body }).save();
        res.status(200).json({user : savedUser})
    }catch(err){
        if (err.code === 11000) {
            res.status(409).json({ message: 'Username already exists' });
          } else {
            // For any other error, return the error message
            res.status(500).json({ error: err.message });
          }
    }
})

//login user
router.post('/api/login', async (req, res) => {
    try{
        const body = req.body;
        const user = await User.findOne({ username : body.username })
        if (user){
            if (user.password === body.password){
                return res.status(200).json({user: user});
            }
            return res.status(401).json({ message: 'Invalid username or password' });  
        }
        return res.status(401).json({ message: 'Invalid username or password' });
        }catch(err){
        res.json(err);
    }
})

//get all users
router.get('/api/users', async (req, res) =>{
    try{
        const allUsers = await User.find({});
        res.status(200).json(allUsers)
    }catch(err){
        res.json(err);
    }
})


//Get details by user_type (for employee and to show in admin)
router.get('/api/users/:id', async (req, res) =>{
    try{
        const test = await User.findById(req.params.id);
        console.log(test)
        res.status(200).json(test)
    }catch(err){
        res.json(err);
    }
})

// Get booking details based on userid
router.get('/api/users/:id', async (req, res) =>{
    try{
        const user = await User.findById(req.params.id);
        if (!user){
            return res.status(401).json({ message: 'User not found' });   
        }
        if (user.user_type === "Employee"){

        }
        res.status(200).json(test)
    }catch(err){
        res.json(err);
    }
})


module.exports = router;