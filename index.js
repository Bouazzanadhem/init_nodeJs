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

//require todo Schema
const Todo = require('./models/todoSchema');

app.get('/', async (req, res) => {
  res.json({message: "Hello Nadhem"});
});

//1. get all todos
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

//2. get todo by id
app.get('/todos/:id', async (req, res) => {
    res.json({message: "get todo by id"});
});

//3. add todo
app.post('/todos', async (req, res) => {
    const createdTodo = await Todo.create(req.body);
    res.json(createdTodo);
});

//4. update todo
app.put('/todos/:id', async (req, res) => {
    res.json({message: "update todo by id"});
});

//5. delete todo by id
app.delete('/todos/:id', async (req, res) => {
    res.json({message: "delete todo by id"});
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});