const express = require('express');
const router = express.Router();
const passport = require('passport');

const UserDet = require('../models/UserDetails');

router.get('/UserDetails',passport.authenticate('bearer', { session: false }), async (req, res) => {
    const users = await UserDet.find().populate('user');
    res.json(users);
});

router.get('/UserDetails/:id',passport.authenticate('bearer', { session: false }), async (req, res) => {
    const userId = await UserDet.findById(req.params.id);
    res.json(userId);
});

router.post('/UserDetails',passport.authenticate('bearer', { session: false }), async (req, res) => {
    const createdUser = await UserDet.create(req.body);
    res.json(createdUser);
});

router.put('/UserDetails/:id',passport.authenticate('bearer', { session: false }), async (req, res) => {
    const updateUser = await UserDet.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updateUser);
});

//affect User to Detail
router.put('/UserDetails/affectUser/:idDet/:idUser',passport.authenticate('bearer', { session: false }), async (req, res)=>{
    const addUsertoDet = await UserDet.findByIdAndUpdate(
        req.params.idDet,
        {$push:{user: req.params.idUser}},
        {new: true}
    )
    res.json(addUsertoDet);
});
//desaffect User to Detail
router.put('/UserDetails/desaffectUser/:idDet/:idUser',passport.authenticate('bearer', { session: false }), async (req, res)=>{
    const addUsertoDet = await UserDet.findByIdAndUpdate(
        req.params.idDet,
        {$pull:{user: req.params.idUser}},
        {new: true}
    )
    res.json(addUsertoDet);
});

router.delete('/UserDetails/:id',passport.authenticate('bearer', { session: false }), async (req, res) => {
    const deleteUser = await UserDet.findByIdAndDelete(req.params.id);
    res.json({message: 'delete seccussefuly'});
});

module.exports = router;