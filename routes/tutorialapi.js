const express = require('express');
const router = express.Router();

const Tuto = require('../models/tutorial');

router.get('/tutos', async (req, res) => {
    const tutos = await Tuto.find();
    res.json(tutos);
});

router.get('/s/:id', async (req, res) => {
    const tutoId = await Tuto.findById(req.params.id);
    res.json(tutoId);
});

router.post('/tutos', async (req, res) => {
    const createdTuto = await Tuto.create(req.body);
    res.json(createdTuto);
});

router.put('/tutos/:id', async (req, res) => {
    const updateTuto = await Tuto.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updateTuto);
});

router.put('/tutos/affectTag/:idTuto/:idTag', async (req, res)=>{
    const addTagtoTuto = await Tuto.findByIdAndUpdate(
        req.params.idTuto,
        {$push:{tags: req.params.idTag}},
        {new: true, useFindAndModify: false}
    )
    res.json(addTagtoTuto);
});

router.delete('/tutos/:id', async (req, res) => {
    const deleteTuto = await Tuto.findByIdAndDelete(req.params.id);
    res.json({message: 'delete seccussefuly'});
});

module.exports = router;