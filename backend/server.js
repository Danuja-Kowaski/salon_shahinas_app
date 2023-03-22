const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;
const uri = process.env.URI;

//Route
const userRoute = require('./routes/user')
app.use(cors());
app.use(express.json());


//DB connection setup
mongoose.connect(uri)
.then(() => console.log("DB connected successfully"))
.catch( (error) =>  { console.log(" DB connection unsuccesful " , error) });


app.use('/', userRoute);

app.listen(port, () => {
    console.log(`Running on port : ${port}`);
})