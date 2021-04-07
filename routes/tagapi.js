const express = require('express');
const router = express.Router();

const Tag = require('../models/tag');

router.get('/tag', async (req, res) => {
    const tags = await Tag.find();
    res.json(tags);
});

router.get('/tag/:id', async (req, res) => {
    const tagId = await Tag.findById(req.params.id);
    res.json(tagId);
});

router.post('/tag', async (req, res) => {
    const createdTag = await Tag.create(req.body);
    res.json(createdTag);
});

router.put('/tag/:id', async (req, res) => {
    const updateTag = await Tag.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updateTag);
});

router.delete('/tag/:id', async (req, res) => {
    const deleteTag = await Tag.findByIdAndDelete(req.params.id);
    res.json("{'delete seccussefuly'}");
});

module.exports = router;