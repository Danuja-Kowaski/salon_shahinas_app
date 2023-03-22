const router = require('express').Router();
//import model
const userModel = require('../model/user.model');

//adding recipe to db
router.post('/api/register', async (req, res) => {
    try{
        const userExists = await User.findOne({ username });
        if (userExists) {
        return res.status(409).json({ message: 'Username already taken' });
        }
        else{
            const newUser = new userModel({
                username : req.body.username,
                password : req.body.password,
                email: req.body.email
            })
            const saveItem = await newUser.save()
            res.status(200).json('User Added successfully')
        }
    }catch(err){
        res.json(err);
    }
})

//get all users
router.get('/api/users', async (req, res) =>{
    try{
        const allUsers = await userModel.find({});
        res.status(200).json(allUsers)
    }catch(err){
        res.json(err);
    }
})

module.exports = router;