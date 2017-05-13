const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

//setup express app
const app = express();

//connect to mongoDB
mongoose.connect('mongodb://localhost/bookstore');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});  

//init routes
app.use('/api', require('./api/api'));

//error handling
app.use(function (err, req, res, next){
    res.status(422).send({error: err.message})
});

//listen for request
const port = 4000;
app.listen(port, function(){
    console.log('now listening for request on port: ' + port);
});
