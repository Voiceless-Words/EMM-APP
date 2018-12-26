const express = require('express');
const dotenv = require('dotenv').config();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');


const path = require('path');

mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb+srv://admin:"+ process.env.DB_PASSWORD +"@cluster0-xzip0.mongodb.net/emm?retryWrites=true" ,  { useNewUrlParser: true })

var app = express();
var server = app.listen(8080, function(){
    console.log("server started port 8080");
});

const user = require('./routes/user');
//const dashboarda = require('./routes/dashboarda');

const Asset = require('./models/assets');

const User = require('./models/users');

//session middleware
 app.use(session({
     secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true
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

//app.use('/dashboarda', dashboarda);

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

	Asset.find({}, function(err, user) {
		if (err) throw err;
		console.log(user)
	});
    	

	res.render('dashboarda', {
		title : 'emmapp',
		details : {'first_name':'Anist', 'rights' : 'admin'},
		assets : [
		{name : 'GE7736', desc : 'MV SUBSTATION - 7C2 JAVA CRESCENT'},
		{name : 'GE7737', desc : 'MV SUBSTATION - 7C2 PYTHON CRESCENT'},
		{name : 'GE7738', desc : 'MV SUBSTATION - 7C2 PHP CRESCENT'}
		]
	});

});


app.get('/dashboardb', function(req, res) {
	res.render('dashboardb', {
			title : 'emmapp',
			details : {'first_name':'Anist', 'rights' : 'user'}
		});
});


app.post('/getview', function(req, res) {
	
	if (req.body.view == 'createjobcard') {
		res.render('templates/createjobcardform', {
			title : 'emmapp',
			details : {'first_name':'Anist', 'rights' : 'admin'}
		});
	}
	else if (req.body.view == 'reviewjobcards')
	{
		res.send('Job Cards Review Coming Soon');
	}
	else if (req.body.view == 'useraccounts') {

		res.send('Manage User Accounts Coming Soon');
	}
	else
	{
		res.send('Empty Request');
	}


});

app.post('/createjobcard', function(req, res) {
	//access prevention here if req.session.rights != admin

	res.send('Patience is a virtue. Just dont wait forever');

});


app.get('/logon', function (req, res){
    res.render('logon');
});


app.use(function(req, res) {
    res.send("what are you trying to do" + req.url);
});
