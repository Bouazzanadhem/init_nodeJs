const express = require('express');
const router = express.Router();

const Tag = require('../models/tag');

router.get('/tags', async (req, res) => {
    const tags = await Tag.find().populate('tutorials');
    res.json(tags);
});

router.get('/tags/:id', async (req, res) => {
    const tagId = await Tag.findById(req.params.id);
    res.json(tagId);
});

router.post('/tags', async (req, res) => {
    const createdTag = await Tag.create(req.body);
    res.json(createdTag);
});

router.put('/tags/:id', async (req, res) => {
    const updateTag = await Tag.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updateTag);
});

//affect Tuto to Tag
router.put('/tags/affectTuto/:idTag/:idTuto', async (req, res)=>{
    const addTutotoTag = await Tag.findByIdAndUpdate(
        req.params.idTag,
        {$push:{tutorials: req.params.idTuto}},
        {new: true}
    )
    res.json(addTutotoTag);
});

//desaffect Tuto to Tag
router.put('/tags/desaffectTuto/:idTag/:idTuto', async (req, res)=>{
    const addTutotoTag = await Tag.findByIdAndUpdate(
        req.params.idTag,
        {$pull:{tutorials: req.params.idTuto}},
        {new: true}
    )
    res.json(addTutotoTag);
});

router.delete('/tags/:id', async (req, res) => {
    const deleteTag = await Tag.findByIdAndDelete(req.params.id);
    res.json({message: 'delete seccussefuly'});
});

module.exports = router;