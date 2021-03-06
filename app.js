const express = require('express');
const dotenv = require('dotenv').config();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const cors = require('cors');
const fs = require('fs');


const path = require('path');

mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb+srv://admin:"+ process.env.DB_PASSWORD +"@cluster0-xzip0.mongodb.net/emm?retryWrites=true" ,  { useNewUrlParser: true })

var app = express();

app.use(cors());


var server = app.listen(8080, function(){
    console.log("server started port 8080");
});


// app.use(function(req, res, next) {
//    var allowedOrigins = ['localhost:8080', 'localhost:81', 'localhost:8080', '192.168.250.1:3000', 'http://192.168.43.54:3000', 'localhost:8080'];
//    var origin = req.headers.origin;
//    if(allowedOrigins.indexOf(origin) > -1){
//         res.setHeader('Access-Control-Allow-Origin', origin);
//    }
//    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
//    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//    res.header('Access-Control-Allow-Credentials', true);
//   return next();
// });

const user = require('./routes/user');
const search = require('./routes/search');
const data = require('./routes/data');
//const dashboarda = require('./routes/dashboarda');

const Asset = require('./models/assets');

const User = require('./models/users');

const Forms = require('./models/form');

const JobCard = require('./models/jobCard');

const JobSave = require('./models/jobSave');

const Image = require('./models/img');

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
app.use('/data', passSession, data);

//app.use('/dashboarda', dashboarda);

app.use(function(req, res, next){
	console.log(req.url);
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

app.post('/reviewjob', function(req, res){
  if (req.body.view == 'data')
  {
    Forms.find({'reviewStatus': '0'}, function(err, values){
      if (err) throw err;
      console.log(values)
			res.send(values);
			res.end();
    });
  }
});

app.post('/getview', function(req, res) {

	if (req.body.view == 'createjobcard') {
		Asset.find({}, function(err, assets) {

		if (err) throw err;
		console.log(assets);

		User.find({'admin' : '0'}, function(err, users) {
			if (err) throw err;
			console.log(users);

			if (req.body.format == 'JSON') {
				var newjobforminfo = {
					'users' : users,
					'assets' : assets
				}
				console.log(newjobforminfo);
				res.send(newjobforminfo);
				res.end();
			}
			else
			{
				res.render('templates/createjobcardform', {
				title : 'emmapp',
				details : {'first_name':'Anist', 'admin' : '1'},
				assets : assets,
				users : users

			});
			}

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

app.get('/inspection', function (req, res){
    res.render('inspection');
});


app.post('/jobcard_save', function(req, res){

  console.log(req.body.newjob);

  var val = JSON.parse(req.body.newjob);

  console.log(val.jobNumber);
console.log(val.permitNumber);
console.log(val.jobAssetsType);
console.log(val.assetsMaterial);
console.log(val.jobActivity);
console.log(val.jobCreatedBy);
console.log(val.jobNumber);

  var job = new JobSave({
    jobCardNumber: val.jobNumber,
    permitNumber : val.permitNumber,
    assetType: val.jobAssetsType,
    assetsMaterial: val.assetsMaterial,
    jobActivity : val.jobActivity,
    jobLocation : val.jobLocation,
    created_by: val.jobCreatedBy,
    gps_lati : val.asset_lati,
    gps_long : val.asset_long,
    time : Date.now()
  });



  job.save(function (err) {
  if (err) return handleError(err);

	  console.log("saved the job");
	  res.send('200');

	});
});

app.post('/form_save', function(req, res){

console.log('form save');

  var obj = JSON.parse(req.body.form);
  var no = req.body.jobNo;
  console.log(obj);
  console.log(no);
  var cables = obj[no]['cables'];
  var con1 = obj[no]['conditionAData'];
  var con2 = obj[no]['conditionBData'];
  var completedby = obj[no]['completedby'];

  var form = new Forms({
    jobnumber: no,
    conditionA: con1,
    conditionB: con2,
    cables: cables,
    reviewStatus: 0,
    completedby: completedby,
    time: Date.now()
  });

  form.save(function (err) {
  if (err) return handleError(err);

  console.log("saved akere");

});

  //console.log(cables);
  //console.log(con1);
  //console.log(con2);
  res.send("success");
});

app.post('/pics_save', function(req, res){
  console.log('here');
  var imageData = req.body.img;
  console.log(req.body.jobnumber);
  console.log(req.body.img);
  var image1 = new Image({
    jobnumber: req.body.jobnumber,
    type: 'image/jpeg',
    img:imageData
  });
  image1.save(function(err){
    if (err) throw err;

    console.log("saved akere");
  });
  res.send("success");
});


app.use(function(req, res) {
    res.send("what are you trying to do" + req.url);
});

app.get('/getallareas', function(req, res){

 // db.runCommand ( { distinct: "inventory", key: "dept" } )
/*  Street.find({ distinct: "town/0", key: "town/0" }, function(err, assets){
    if (err) throw err;

    res.send(assets);

  });

  Asset.find({}, function(err, assets){
    if (err) throw err;

    res.send(assets);
  }); */

  var assets = [{name : 'help'}];
  res.send(assets);

});


app.post('/getallareas', function(req, res){

 // db.runCommand ( { distinct: "inventory", key: "dept" } )
/*  Street.find({ distinct: "town/0", key: "town/0" }, function(err, assets){
    if (err) throw err;

    res.send(assets);

  });

  Asset.find({}, function(err, assets){
    if (err) throw err;

    res.send(assets);
  }); */

  var assets = [{'help' : 'help'}];
  res.send(assets);

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

function passSession (res, req, next) {
	console.log('session in app');
	console.log(req.session);
	next();
}
