const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
// const ejs = require('ejs');
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

app.get('/logout', function(req, res){
    req.session.user = null;
	res.render('index')
});

app.get('/dashboarda', function(req, res) {
	res.render('dashboarda', {
		title : 'emmapp',
		details : {'first_name':'Anist', 'rights' : 'admin'}
	});
});


app.get('/dashboardb', function(req, res) {
	res.render('dashboardb', {
			title : 'emmapp',
			details : {'first_name':'Anist', 'rights' : 'user'}
		});
});


app.get('/logon', function (req, res){
    res.render('logon');
});


app.use(function(req, res) {
    res.send("what are you trying to do" + req.url);
});
