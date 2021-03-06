const express = require('express');
const dotenv = require('dotenv').config();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const cors = require('cors');


const path = require('path');

mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb+srv://admin:"+ process.env.DB_PASSWORD +"@cluster0-xzip0.mongodb.net/emm?retryWrites=true" ,  { useNewUrlParser: true })

var app = express();

app.use(cors());

 app.use(function(req, res, next) {
    var allowedOrigins = ['http://127.0.0.1:8080','http://192.168.250.1:3000', 'http://localhost:81', 'http://192.168.250.1:3000', 'http://192.168.43.54:3000', 'http://localhost:8080'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
   console.log("next");
   return next();
 });


var server = app.listen(8080, function(){
    console.log("server started port 8080");
});

const user = require('./routes/user');
const search = require('./routes/search');
const data = require('./routes/data');
//const dashboarda = require('./routes/dashboarda');

const Asset = require('./models/assets');
const Area = require('./models/areas');
const Street = require('./models/streets');

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
app.use(bodyParser.json({
  limit: '5mb'
}));
app.use(bodyParser.urlencoded({
  limit: '5mb',
  parameterLimit: 100000,
  extended:false
}));

//ser static path
app.use(express.static(path.join(__dirname, 'public')));

//use user
app.use('/user', user);
app.use('/search', search);
app.use('/data', passSession, data);

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


app.post('/getallareas', function(req, res){

  Area.find({}, function(err, areas){
    if (err) throw err;

    res.send(areas);
    
  }); 
});

app.post('/getalljobs', function(req, res){
  Forms.find({}, function(err, forms){
    if (err) throw err;

    res.send(forms);
  });
});


app.get('/dashboarda', function(req, res) {

	// console.log(req.session.body);
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
		// console.log(assets);

		User.find({'admin' : '0'}, function(err, users) {
			if (err) throw err;
			// console.log(users);

			if (req.body.format == 'JSON') {
				var newjobforminfo = {
					'users' : users,
					'assets' : assets
				}
				// console.log(newjobforminfo);
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

app.post('/jobcard_save', function(req, res){

  var val = req.body;
  var job = new JobSave({
    jobCardNumber: val.jobNumber,
    permitNumber: val.permitNumber,
    assetsMaterial: val.assetsMaterial,
    jobLocation: val.jobLocation,
    asset_lati: val.asset_lati,
    asset_long: val.asset_long,
    jobAssetType: val.jobAssetsType,
    jobActivity: val.jobActivity,
    created_by: val.jobCreatedBy
  });
   console.log(job);
  job.save(function (err) {
  if (err) console.log(err);
  else
	res.send("200");
	});
});
app.post('/form_save', function(req, res){

  var obj = JSON.parse(req.body.form);
  var no = req.body.jobNo;
//   console.log(obj);
//   console.log(no);
  var cables = obj[no]['cables'];
  var images = obj[no]['images'];
  var con1 = obj[no]['conditionAData'];
  var con2 = obj[no]['conditionBData'];
  var completedby = obj[no]['completedby'];

  var form = new Forms({
    jobnumber: no,
    conditionA: con1,
    conditionB: con2,
    cables: cables,
    images: images,
    reviewStatus: 0,
    completedby: completedby,
    time: Date.now()
  });

  form.save(function (err) {
  if (err) return handleError(err);

  console.log("saved akere");

});

  res.send("success");
});

app.post('/sendemail', function(req, res){
    let transpoter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_EMAIL_SEPHIRI
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  let mailOptions = {
    from: '"Inspections" <pietthabiso@gmail.com>',
    to: req.body.email,//the email goes here
    subject: 'Report you requested',
    html: req.body.report//the html goes here
  };
  transpoter.sendMail(mailOptions, function(error, info){
    if (error){
      res.json({status : 300});
    } else
      res.json({status : 200});
  });
});

app.post('/profilePic', function(req, res){
  console.log(req.body.image);
  console.log(req.body.employeeNumber);
  User.findOneAndUpdate({employee_id: req.body.employeeNumber}, {$set:{image: req.body.image }}, {new: true, upsert: true}, function (err, doc) {
    if (err) {
      throw err;
      console.log(err);
    }
    console.log(doc);
  });
});

app.use(function(req, res) {
    res.send("what are you trying to do" + req.url);
});



function passSession (res, req, next) {
	console.log('session in app');
	console.log(req.session);
	next();
}
