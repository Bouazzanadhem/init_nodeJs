const mongoose = require('mongoose');
const userDetail = mongoose.Schema({
    address: String,
    zipcode: String,
    city: String
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('UserDetail',userDetail);