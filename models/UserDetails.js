const mongoose = require('mongoose');
const userDetail = mongoose.Schema({
    address: String,
    zipcode: String,
    city: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('UserDetail',userDetail);