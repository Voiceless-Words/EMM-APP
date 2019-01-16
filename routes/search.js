//manage user registrations
//user logon
const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const router = express.Router();

const User = require('../models/users');
const Forms = require('../models/form');
const JobSave = require('../models/jobSave');

 router.use(session({
     secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true
 }));

router.use(function(req, res, next){
    errors = [];
    next();
});

router.post('/search', function(req, res){
    var lookFor = req.body.search;
    console.log(req.body);

    // User.find({
    //     $or: [
    //             {"first_name": { "$regex": lookFor, "$options": "i"}},
    //             {"last_name": { "$regex": lookFor, "$options": "i"}},
    //             {"employee_id": { "$regex": lookFor, "$options": "i"}},
    //             {"contact": { "$regex": lookFor, "$options": "i"}}
    //         ],
    //         date: {
    //             $gte: req.body.start,
    //             $lte: req.body.end
    //          }
    //     })
    // .then(users => {
    //         console.log(users);
    //         var response = {
    //             count : users.length,
    //             data : users.map(function(users){
    //                 return {
    //                     first_name : users.first_name,
    //                     last_name : users.last_name,
    //                     employee_id : users.employee_id,
    //                     contact : users.contact,
    //                 };
    //             })
    //         };
    //         res.send(response);
    //     })
    // .catch(error => { console.log(error); })
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
    var lookFor = req.body.search;
    var start = req.body.start.split("-");
    var end = req.body.end.split("-");
    start = (new Date(start[0],String(parseInt(start[1]) - 1),start[2]));
    console.log(req.body);
    console.log(start);
    // Forms.find({
    //     $or: [
    //             {"jobnumber": { "$regex": lookFor, "$options": "i"}},
    //             {"completedby": { "$regex": lookFor, "$options": "i"}}
    //         ]
    //     },
    //      {date: {
    //             $gte: req.body.start,
    //             $lte: req.body.end
    //          }})
    // .then(users => {
    //         console.log(users);
    //         res.send(users);
    //     })
    // .catch(error => { console.log(error); })
});

router.post('/getalljobs', function(req, res){
    console.log(req.body);
    Forms.find({"jobnumber": { "$regex": req.body.user, "$options": "i"}})
    .then(users => {
            console.log('getting jobs');
            res.send(users);
        })
    .catch(error => { console.log(error); })
    
});
router.post('/getonecard', function(req, res){
    console.log(req.body);
    JobSave.find({"jobCardNumber": { "$regex": req.body.jobNumber, "$options": "i"}})
    .then(users => {
            console.log('getting jobs');
            res.send(users);
        })
    .catch(error => { console.log(error); })
    
});

module.exports = router;