const mongoose = require('mongoose');
const tag = mongoose.Schema({
    title: String,
    slug: String,
    tutorials:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tutorial"
        }
    ]
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('tag',tag);