const express = require('express');
const dotenv = require('dotenv').config();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const cors = require('cors');


const path = require('path');

mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb+srv://admin:"+ process.env.DB_PASSWORD +"@cluster0-xzip0.mongodb.net/emm?retryWrites=true" ,  { useNewUrlParser: true })

var app = express();

app.use(cors());


var server = app.listen(8080, function(){
    console.log("server started port 8080");
});

const user = require('./routes/user');
const search = require('./routes/search');
//const dashboarda = require('./routes/dashboarda');

const Asset = require('./models/assets');

const User = require('./models/users');

const Forms = require('./models/form');

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
app.use('/search', search);

//app.use('/dashboarda', dashboarda);

app.use(function(req, res, next){
    errors = [];
    next();
});

app.post('/cordova', (req, res) =>{
	console.log("cordova");
	res.send("hitting the server");
})

app.get('/', function (req, res){
    res.render('index');
});

app.get('/logout', function(req, res){
    req.session.user = null;
	res.render('index')
});




app.get('/dashboarda', function(req, res) {

	console.log(req.session.body);
	Asset.find({}, function(err, assets) {


		if (err) throw err;
		//console.log(assets);

		User.find({'admin' : '0'}, function(err, user) {
			if (err) throw err;
		//	console.log(user);

			res.render('dashboarda', {
				title : 'emmapp',
				details : {'first_name':'Anist', 'admin' : '1'},
				assets : assets
			});
		});


	});



});


app.get('/dashboardb', function(req, res) {
	res.render('dashboardb', {
			title : 'emmapp',
			details : {'first_name':'Anist', 'admin' : '0'}
		});
});

app.get('/register', function(req, res) {
	res.render('register');
});

app.post('/getview', function(req, res) {

	if (req.body.view == 'createjobcard') {
		Asset.find({}, function(err, assets) {

		if (err) throw err;
		console.log(assets);

		User.find({'admin' : '0'}, function(err, users) {
			if (err) throw err;
			console.log(users);

			res.render('templates/createjobcardform', {
				title : 'emmapp',
				details : {'first_name':'Anist', 'admin' : '1'},
				assets : assets,
				users : users

			});
		});


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

app.post('/form_save', function(req, res){

  var obj = JSON.parse(req.body.form);
  var no = req.body.jobNo;
  var cables = obj[no]['cables'];
  var number = cables.cableCount;
  var con1 = obj[no]['conditionAData'];
  var con2 = obj[no]['conditionBData'];
  var form = new Forms({
    jobnumber: no,
    conditionA: con1,
    conditionB: con2,
    cables: cables,
    time: Date.now()
  });

  form.save(function (err) {
  if (err) return handleError(err);

  console.log("saved akere");

});

  console.log(cables);
  console.log(con1);
  console.log(con2);
  console.log(number);
  res.send("success");
});

app.use(function(req, res) {
    res.send("what are you trying to do" + req.url);
});



function isAdmin(req, res, next){
	console.log("session set as ------->"+req.session.user);
	var errors = [];
	if (req.session.user)
	{
		User.find({"employee_id": { "$regex": req.session.body, "$options": "i"}})
		.then(users => {
			if (users[0].admin == 1)
			{
				next();
			}
			else
			{
				errors.push("You dont have admin rights");
				res.send(JSON.stringify({
					error : errors,
					status : 403
				}));
			}
			})
		.catch(error => { console.log(error); })
	}
	else {
		res.render('index');
	}
}
