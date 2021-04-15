const express = require('express');
const router = express.Router();
const passport = require('passport');
const Tag = require('../models/tag');

router.get('/tags',passport.authenticate('bearer', { session: false }), async (req, res) => {
    const tags = await Tag.find().populate('tutorials');
    res.json(tags);
});

router.get('/tags/:id',passport.authenticate('bearer', { session: false }), async (req, res) => {
    const tagId = await Tag.findById(req.params.id);
    res.json(tagId);
});

router.post('/tags',passport.authenticate('bearer', { session: false }), async (req, res) => {
    const createdTag = await Tag.create(req.body);
    res.json(createdTag);
});

router.put('/tags/:id',passport.authenticate('bearer', { session: false }), async (req, res) => {
    const updateTag = await Tag.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updateTag);
});

//affect Tuto to Tag
router.put('/tags/affectTuto/:idTag/:idTuto',passport.authenticate('bearer', { session: false }), async (req, res)=>{
    const addTutotoTag = await Tag.findByIdAndUpdate(
        req.params.idTag,
        {$push:{tutorials: req.params.idTuto}},
        {new: true}
    )
    res.json(addTutotoTag);
});

//desaffect Tuto to Tag
router.put('/tags/desaffectTuto/:idTag/:idTuto',passport.authenticate('bearer', { session: false }), async (req, res)=>{
    const addTutotoTag = await Tag.findByIdAndUpdate(
        req.params.idTag,
        {$pull:{tutorials: req.params.idTuto}},
        {new: true}
    )
    res.json(addTutotoTag);
});

router.delete('/tags/:id',passport.authenticate('bearer', { session: false }), async (req, res) => {
    const deleteTag = await Tag.findByIdAndDelete(req.params.id);
    res.json({message: 'delete seccussefuly'});
});

module.exports = router;