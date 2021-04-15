const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/user');

// const Image = require('../models/upload');

//create the storage
const myStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        const folder = path.resolve('./uploads');
        cb(null,folder);
    },
    filename: async(req,file,cb) => {
        const extension = path.extname(file.originalname) ;
        // console.log(extension);
        const newFileName = Date.now() + extension;
        // console.log(newFileName);

        await User.findByIdAndUpdate(req.params.id,{photo: newFileName},{new:true})
        cb(null,newFileName);
    },
    
});

const fileFilter = (req, file, cb) => {
    const allowedFileExtensions = ['.png','.jpeg','.jpg']
    const extension = path.extname(file.originalname) ;
    cb(null, allowedFileExtensions.includes(extension));
}

//create the multer middleware
const upload = multer({ 
    storage: myStorage,
    fileFilter: fileFilter,
    limits:{
        fileSize: 1024 * 1024 * 20
    },
});

// uploads Single
router.post('/uploadImage/id', upload.single('image'), async(req,res)=>{
    // const image = new Image({
    //     image: req.file.path
    // })
    // await image.save()
    res.json({message: 'image uploaded successfully !!'})
})

// uploads Multiple
router.post('/uploadImageMultiple', upload.array('image',2), async(req,res)=>{
    // const image = new Image({
    //     image: req.file.path
    // })
    // await image.save()
    res.json({message: 'image uploaded successfully !!'})
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