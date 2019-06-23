var express = require('express');
var app=express();//gives access
var session = require('express-session');
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});

// var mongoose=require('mongoose');
// mongoose.connect('localhost:27017/applicationDB');






app.use(session({secret:"iloveit"}));
app.set('view engine','ejs'); //set view engine to ejs
app.use('/assets',express.static('assets'));

var catalog=require('./controller/catalog.js');

var profileController=require('./controller/profileController.js');
//app.use('/profile',profileController);
app.use('/',catalog);
app.use('/profile',profileController);

app.listen(8080,function(){
  console.log('listening to port 8080');
});
//module.exports.session=session;
//module.exports.bodyParser=bodyParser;
//module.exports.urlencodedParser=urlencodedParser;
module.exports =app;
