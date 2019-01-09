//manage user registrations
//user logon
const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const router = express.Router();

const User = require('../models/users');
const Forms = require('../models/form');

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
            console.log(users);
            var response = {
                count : users.length,
                data : users.map(function(users){
                    return {
                        first_name : users.first_name,
                        last_name : users.last_name,
                        employee_id : users.employee_id,
                        contact : users.contact,
                    };
                })
            };
            res.send(response);
        })
    .catch(error => { console.log(error); })
});

router.post('/all', function(req, res){

    User.find({"employee_id": { "$regex": req.body.user, "$options": "i"}})
    .then(users => {
            console.log(users);
            var response = {
                count : users.length,
                data : users.map(function(users){
                    return {
                        first_name : users.first_name,
                        last_name : users.last_name,
                        employee_id : users.employee_id,
                        contact : users.contact,
                        date : users.date
                    };
                })
            };
            res.send(response);
        })
    .catch(error => { console.log(error); })
});

router.post('/reviewJob', function(req, res){
    var lookFor = req.body.value;

    Forms.find({
        $or: [
                {"jobnumber": { "$regex": lookFor, "$options": "i"}}
            ]
        })
    .then(users => {
            console.log(users);
            res.send(users);
        })
    .catch(error => { console.log(error); })
});

module.exports = router;