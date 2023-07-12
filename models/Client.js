const mongoose = require('mongoose');



const schema = mongoose.Schema({
    fullname:String,
    email:String,
    telephone:Number,
})

module.exports = mongoose.model('Client',schema);
