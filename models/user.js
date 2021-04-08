const mongoose = require('mongoose');
const user = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    age: Number,
    userdetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserDetail"
    },
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "todo"
        }
    ]

},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('user',user);