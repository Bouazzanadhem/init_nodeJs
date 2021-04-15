const express = require('express');
const router = express.Router();
const passport = require('passport');

const Todo = require('../models/todoSchema');

router.get('/todos',passport.authenticate('bearer', { session: false }) ,async (req, res) => {
    const todos = await Todo.find().populate('user');
    res.json(todos);
});

router.get('/todos/:id',passport.authenticate('bearer', { session: false }), async (req, res) => {
    const todoId = await Todo.findById(req.params.id);
    res.json(todoId);
});

router.post('/todos',passport.authenticate('bearer', { session: false }), async (req, res) => {
    const createdTodo = await Todo.create(req.body);
    res.json(createdTodo);
});

//affect User to Todo
router.put('/todos/affectUser/:idTodo/:idUser',passport.authenticate('bearer', { session: false }), async (req, res)=>{
    const addUsertoTodo = await Tuto.findByIdAndUpdate(
        req.params.idTodo,
        {$push:{user: req.params.idUser}},
        {new: true}
    )
    res.json(addUsertoTodo);
});

//desaffect User to Todo
router.put('/todos/desaffectUser/:idTodo/:idUser',passport.authenticate('bearer', { session: false }), async (req, res)=>{
    const addUsertoTodo = await Tuto.findByIdAndUpdate(
        req.params.idTodo,
        {$pull:{user: req.params.idUser}},
        {new: true}
    )
    res.json(addUsertoTodo);
});

router.put('/todos/:id',passport.authenticate('bearer', { session: false }), async (req, res) => {
    const updateTodo = await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updateTodo);
});


router.delete('/todos/:id',passport.authenticate('bearer', { session: false }), async (req, res) => {
    const deleteTodo = await Todo.findByIdAndDelete(req.params.id);
    res.json({message: 'delete seccussefuly'});
});

module.exports = router;