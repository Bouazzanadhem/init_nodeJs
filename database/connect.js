const mongoose = require('mongoose');
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect('mongodb://localhost:27017/database001', option).then(success =>{
    console.log("Successfully connected to databae!");
}).catch(error =>{
    console.log("Error in connection to database!");
});