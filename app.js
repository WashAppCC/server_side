const mongoose = require('mongoose');
var express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const  urlencoded  = require('express');
var path = require('path');
const ClientRouter = require('./routes/Client.js')




const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

 app.use('/client',ClientRouter);



app.use((req,res,next)=>{
    next(createError(404));
})

mongoose.connect("mongodb://localhost:27017/booking_an_appointment")
    

module.exports = app;



