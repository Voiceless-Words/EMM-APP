//manage user registrations
//user logon
const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const router = express.Router();

const User = require('../models/users');

 router.use(session({
     secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true
 }));

router.use(function(req, res, next){
    errors = [];
    next();
});

router.get('/search', function(req, res){git 
    User.find({ 
        "first_name": { "$regex": "on", "$options": "i"}
        },
        function(err,docs) {
            if (err)
                console.log(err);
            else
                console.log(docs);
    });
});

module.exports = router;