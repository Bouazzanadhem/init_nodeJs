const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/users', async(req, res)=>{
    const users = await User.find();
    res.json(users);
});

router.get('/users/:id', async (req, res) => {
    const userId = await User.findById(req.params.id);
    res.json(userId);
});

router.post('/users', async (req, res) => {
    const createdUser = await User.create(req.body);
    res.json(createdUser);
});

router.put('/users/:id', async (req, res) => {
    const updateUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updateUser);
});

router.delete('/users/:id', async (req, res) => {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    res.json("{'delete seccussefuly'}");
});

//6. filter
router.get('/users/filter/gtage', async (req, res)=>{
    const users = await User.find({"age" :{$gt:24}});
    res.json(users)
})
router.get('/users/filter/ltage', async (req, res)=>{
    const users = await User.find({"age" :{$lt:25}});
    res.json(users)
})
router.get('/users/filter/orage', async (req, res)=>{
    const users = await User.find().or([{age: 25},{age: 24}]);
    res.json(users)
})
router.get('/users/filter/andage', async (req, res)=>{
    const users = await User.find().and([{firstName: 'Nadhem2'},{age: 25}]);
    res.json(users)
})


module.exports = router;