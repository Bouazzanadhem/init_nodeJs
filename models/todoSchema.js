const mongoose = require('mongoose');
const todoSchema = mongoose.Schema({
    title: String,
    description: String
});

module.exports = mongoose.model('todo',todoSchema);