const express = require('express');
const router = express.Router();

const UserDet = require('../models/tutorial');

router.get('/UserDetail', async (req, res) => {
    const users = await UserDet.find();
    res.json(users);
});

router.get('/UserDetail/:id', async (req, res) => {
    const userId = await UserDet.findById(req.params.id);
    res.json(userId);
});

router.post('/UserDetail', async (req, res) => {
    const createdUser = await UserDet.create(req.body);
    res.json(createdUser);
});

router.put('/UserDetail/:id', async (req, res) => {
    const updateUser = await UserDet.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updateUser);
});

router.delete('/UserDetail/:id', async (req, res) => {
    const deleteUser = await UserDet.findByIdAndDelete(req.params.id);
    res.json("{'delete seccussefuly'}");
});

module.exports = router;