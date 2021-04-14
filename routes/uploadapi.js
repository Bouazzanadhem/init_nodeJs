const express = require('express');
const router = express.Router();

const multer = require('multer');
const Image = require('../models/upload');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g,'-')+file.originalname);
    }
});

const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post('/uploadImage',upload.single('image'),async(req,res,next)=>{
    const image = new Image({
        image: req.file.path
    })
    await image.save()
    res.json(image)
})



// router.get('/uploads', async(req, res)=>{
//     const uplo = await Image.find();
//     res.json(uplo);
// });

// router.get('/uploads/:id', async (req, res) => {
//     const uploId = await Image.findById(req.params.id);
//     res.json(uploId);
// });

// router.post('/uploads', async(req, res)=>{
//     const creatuplo = await Image.create(req.body);
//     res.json(creatuplo);
// })



module.exports = router;