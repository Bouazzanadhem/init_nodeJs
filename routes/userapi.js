const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');


const User = require('../models/user');

router.get('/users', async(req, res)=>{
    const users = await User.find().populate('userdetail','todos');
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

//affect Detail to User
router.put('/users/affectDet/:idUser/:idDet', async (req, res)=>{
    const addDettoUser = await User.findByIdAndUpdate(
        req.params.idUser,
        {$push:{userdetail: req.params.idDet}},
        {new: true}
    )
    res.json(addDettoUser);
});
//desaffect Detail to User
router.put('/users/desaffectDet/:idUser/:idDet', async (req, res)=>{
    const addDettoUser = await User.findByIdAndUpdate(
        req.params.idUser,
        {$pull:{userdetail: req.params.idDet}},
        {new: true}
    )
    res.json(addDettoUser);
});

//affect Todo to User
router.put('/users/affectTodo/:idUser/:idTodo', async (req, res)=>{
    const addTodotoUser = await User.findByIdAndUpdate(
        req.params.idUser,
        {$push:{todos: req.params.idTodo}},
        {new: true}
    )
    res.json(addTodotoUser);
});
//desaffect Todo to User
router.put('/users/desaffectTodo/:idUser/:idTodo', async (req, res)=>{
    const addTodotoUser = await User.findByIdAndUpdate(
        req.params.idUser,
        {$pull:{todos: req.params.idTodo}},
        {new: true}
    )
    res.json(addTodotoUser);
});

router.delete('/users/:id', async (req, res) => {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    res.json({message: 'delete seccussefuly'});
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

router.post('/users/send', async(req, res)=>{
    const user = await User.findById(req.params.id);
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });
    const templatepath = path.resolve('./mail_templates','register.html')
    console.log(templatepath);
    const registerTemplate = fs.readFileSync(templatepath, {encoding: 'utf-8'});
    console.log(registerTemplate);
    const render = ejs.render(registerTemplate, {name: "Nadhem"});
    console.log(render);
    const mailOptions = {
        from: '"Bouazza Nadhem ☺👻☻" <yoshomoto26@gmail.com>',
        // to: user.email,
        to: "bouazzanadhem@gmail.com",
        subject: "Test E-mail ✔",
        // text: "aalina w aalik snin deyma",
        // html: registerTemplate,
        html: render,
        attachments:[
            {
                filename: 'netero.jpg',
                path: './mail_templates/attachments/netero.jpg'
            }
        ]
    };
    transporter.sendMail(mailOptions,(err,data)=>{
        if (err) {
            res.json(err);
            console.log(err);
        }
        console.log("email sent");
        res.json({message: 'Email send'})
    })
})

module.exports = router;