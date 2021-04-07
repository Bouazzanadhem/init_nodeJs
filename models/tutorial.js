const mongoose = require('mongoose');
const tutorial = mongoose.Schema({
    title: String,
    description: String
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('tuto',tutorial);