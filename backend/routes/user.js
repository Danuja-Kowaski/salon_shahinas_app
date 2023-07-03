const router = require('express').Router();
const Employee = require('../model/employee.model');
//import model
const User = require('../model/user.model');



async function linkUserAndEmployee() {
    try {
      const users = await User.find();
      
      for (const user of users) {
        const employee = await Employee.findOne({ empName: user.username });
        
        if (employee) {
          user.employee = employee;
          await user.save();
        }
      }
      
      console.log('User and Employee data linked successfully.');
    } catch (error) {
      console.error('Error linking User and Employee data:', error);
    }
  }
  
  // Call the function to link User and Employee data
  linkUserAndEmployee();
  
  
  
  
  
  
//register emp to db
router.post('/api/register/emp', async (req, res) => {
    try{
        const body = req.body;
        const savedUser = await new Employee({ ...body }).save();
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
        const user = await User.findOne({ username : body.name })
        const emp = await Employee.findOne({ empName : body.name })
        if (user){
            if (user.password === body.password){
                if (user.user_type === 'CLIENT' || user.user_type === 'ADMIN') {
                    return res.status(200).json({user: user});
                  }
            }
            else{
                return res.status(401).json({ message: 'Invalid username or password' });  
            }
        }
        else if (emp){
            if (emp.empPassword === body.password){
                return res.status(200).json({emp: emp});
            }
            else{
                return res.status(401).json({ message: 'Invalid employee name or password' });
            }
        }
        else{
            return res.status(401).json({ message: 'Invalid user name or password' });
        }
        }catch(err){
        res.json(err);
    }
})

//get all users for admin
router.get('/api/users', async (req, res) =>{
    try{
        const allUsers = await User.find({});
        res.status(200).json(allUsers)
    }catch(err){
        res.json(err);
    }
})

//get all clients for admin
router.get('/api/clients', async (req, res) => {
    try {
      const allUsers = await User.find({ user_type: "CLIENT" });
      res.status(200).json(allUsers);
    } catch (err) {
      res.json(err);
    }
  });

//get all employees for admin
router.get('/api/emps', async (req, res) =>{
    try{
        const allEmp = await Employee.find({});
        res.status(200).json(allEmp)
    }catch(err){
        res.json(err);
    }
})



module.exports = router;