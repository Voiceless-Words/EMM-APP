const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

var app = express();
var server = app.listen(8080, function(){
    console.log("server started port 8080");
})

const user = require('./routes/user');



//session middleware
 app.use(session({
     secret: "passwhatever12", resave: false, saveUninitialized: true
 }));

//view engine middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//ser static path
app.use(express.static(path.join(__dirname, 'public')));

//use user
app.use('/user', user);

app.use(function(req, res, next){
    errors = [];
    next();
});

app.get('/', function (req, res){
    res.render('index');
});


app.use(function(req, res) {
    res.send("what are you trying to do" + req.url);
});