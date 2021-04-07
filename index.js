const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
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

//import routing
const todoAPI = require('./routes/todoapi');
const userAPI = require('./routes/userapi')

app.get('/', async (req, res) => {
  res.json({message: "Hello Nadhem"});
});

//use routing
app.use('/api/v1',todoAPI);
app.use('/api/v1',userAPI);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});