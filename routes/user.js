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

router.post('/login', function(req, res){
    var status = 0;
    console.log(req.body);

    User.findOne({ employee_id: req.body.username }, function(err, user) {
        console.log(user);

        if (err) throw err;

        if (user)
        {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch)
                {
                    res.send(JSON.stringify({
                        error : errors,
                        status : 2
                    }));
                }
                else{
                    errors.push("<strong>Pasword</strong> Incorrect");
                    res.send(JSON.stringify({
                        error : errors,
                        status : 0
                    }));
                }
            });

        }
        else
        {
            errors.push("<strong>Username</strong> Dont exist");
            res.send(JSON.stringify({
                error : errors,
                status : 0
            }));
        }
    });
});

module.exports = router;