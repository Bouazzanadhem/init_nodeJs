const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config({ debug: process.env.DEBUG });


const port = 3000;

//create app
const app = express();

//cors config
app.use(cors())

//morgan
app.use(morgan('dev'))

//body-pareser config
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



//import connection to database
const connect = require('./database/connect');
const Schedule = require('./Schedule');

//import routing
const todoAPI = require('./routes/todoapi');
const userAPI = require('./routes/userapi');
const tagAPI = require('./routes/tagapi');
const tutoralAPI = require('./routes/tutorialapi');
const userDetAPI = require('./routes/userDetailapi');
const uploadAPI = require('./routes/uploadapi');
const AuthAPI = require('./routes/authAPI');

app.get('/', async (req, res) => {
  res.json({message: "Hello Nadhem"});
});
//static files
app.use("/",express.static('./uploads'));
//use routing
app.use('/api/v1',todoAPI);
app.use('/api/v1',userAPI);
app.use('/api/v1',tagAPI);
app.use('/api/v1',tutoralAPI);
app.use('/api/v1',userDetAPI);
app.use('/api/v1',uploadAPI);
app.use('/api/v1',AuthAPI);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});