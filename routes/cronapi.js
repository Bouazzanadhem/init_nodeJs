const express = require('express');
const router = express.Router();
const cron = require('node-cron');

cron.schedule('* * * * * *',()=>{
    console.log('');
})


module.exports = router;  