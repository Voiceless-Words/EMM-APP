//dashboards ops
/*
const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const router = express.Router();

const User = require('../models/users');
const Asset = require('../models/assets');

 router.use(session({
     secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true
 }));

router.use(function(req, res, next){
    errors = [];
    next();
});


router.get('/dashboarda', function(req, res){
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

module.exports = router; */