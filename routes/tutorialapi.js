const express = require('express');
const router = express.Router();

const Tuto = require('../models/tutorial');

router.get('/tuto', async (req, res) => {
    const tutos = await Tuto.find();
    res.json(tutos);
});

router.get('/tuto/:id', async (req, res) => {
    const tutoId = await Tuto.findById(req.params.id);
    res.json(tutoId);
});

router.post('/tuto', async (req, res) => {
    const createdTuto = await Tuto.create(req.body);
    res.json(createdTuto);
});

router.put('/tuto/:id', async (req, res) => {
    const updateTuto = await Tuto.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updateTuto);
});

router.delete('/tuto/:id', async (req, res) => {
    const deleteTuto = await Tuto.findByIdAndDelete(req.params.id);
    res.json("{'delete seccussefuly'}");
});

module.exports = router;