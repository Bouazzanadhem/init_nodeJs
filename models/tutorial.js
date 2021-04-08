const mongoose = require('mongoose');
const tutorial = mongoose.Schema({
    title: String,
    author: String,
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tag"
        }
    ]
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('tuto',tutorial);