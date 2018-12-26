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

router.post('/search', function(req, res){
    var lookFor = req.body.search;

    User.find({
        $or: [
                {"first_name": { "$regex": lookFor, "$options": "i"}},
                {"last_name": { "$regex": lookFor, "$options": "i"}},
                {"employee_id": { "$regex": lookFor, "$options": "i"}},
                {"contact": { "$regex": lookFor, "$options": "i"}}
            ]
        })
    .then(users => {
            console.log(users.length);
            var results = [];
            for(var i = 0; i < users.length; i++)
            {
                console.log(users[i].first_name);
                var user = {
                    first_name : users[i].first_name,
                    last_name : users[i].last_name,
                    employee_id : users[i].employee_id,
                    contact : users[i].contact,
                };
                results.push(user);
            }
            res.send(results);
        })
    .catch(error => { console.log(error); })
});

module.exports = router;