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
    // console.log(req.body);

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
            // console.log(users);
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
    // console.log(req.body);
    // console.log(start);
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
    console.log('getting all jobs');
    console.log(req.body.user);
    Forms.find({"jobnumber": { "$regex": (req.body.user == 0000000) ? '' : req.body.user, "$options": "i"}})
    .then(users => {
            // console.log('getting jobs');
            // console.log(users);
            res.send(users);
        })
    .catch(error => { console.log(error); })
    
});

router.post('/getallusers', function(req, res){
    User.find({"creator": { "$regex": (req.body.user == 0000000) ? '' : req.body.user, "$options": "i"}})
    .then(users => {
            // console.log('getting jobs');
            res.send(users);
        })
    .catch(error => { console.log(error); })
    
});


router.post('/getonecard', function(req, res){
    // console.log(req.body);
    JobSave.find({"jobCardNumber": { "$regex": req.body.jobNumber, "$options": "i"}})
    .then(users => {
            // console.log('getting jobs');
            res.send(users);
        })
    .catch(error => { console.log(error); })
    
});

router.post('/statSearch', function(req, res){
    // console.log(req.body);
    if (req.body.options == 'users')
    {
         User.find({
             $and: [
                    { $or: [
                            {"employee_id": { "$regex": req.body.queryTerm, "$options": "i"}},
                            {"first_name": { "$regex": req.body.queryTerm, "$options": "i"}},
                            {"last_name": { "$regex": req.body.queryTerm, "$options": "i"}}
                        ]
                    },
                    {"creator": { "$regex": (req.body.company == '0000000') ? '' : req.body.company, "$options": "i"}}
                ]}
         )
        .then(users => {
                // console.log('getting jobs');
                res.send(users);
            })
        .catch(error => { console.log(error); })
    }
    else if (req.body.options == 'jobs')
    {

        var start;
        var end;
        // console.log(req.body.startDate);
        // console.log(req.body.endDate);

        if (req.body.startDate == '')
            start= new Date(2018, 11, 31);
        else if (req.body.startDate)
        {
            let str = req.body.startDate.split('-');
            start = new Date(str[0], +str[1] - 1, str[2]);
        }
            console.log('SETTING END DATE B');
        if (req.body.endDate == '')
        {
            end = new Date();
        }
        else if (req.body.endDate)
        {
            let str = req.body.endDate.split('-');
            end = new Date(str[0], +str[1] - 1, +str[2] + 1);
        }
        // console.log(start);
        // console.log(end);

        Forms.find({
             $and: [
                    { $or: [
                            {"jobnumber": { "$regex": req.body.queryTerm, "$options": "i"}},
                            {"completedby": { "$regex": req.body.queryTerm, "$options": "i"}},
                            {"company": { "$regex": req.body.queryTerm, "$options": "i"}}
                        ]
                    },
                    {"jobnumber": { "$regex": (req.body.company == '0000000') ? '' : req.body.company, "$options": "i"}},
                    {time: {
                        $gte: start,
                        $lte: end
                    }}
                ]}
         )
        .then(users => {
            return Promise.all(users.map(user => { // 2, 3
                return (JobSave.findOne({"jobCardNumber": { "$regex": user.jobnumber, "$options": "i"}})
                    .then(job => { // 4
                        // if (job){
                            console.log('returning a job');

    //                         jobCardNumber: { type: String},
    // permitNumber : { type: String},
    // assetType: { type: String},
    // assetsMaterial: { type: String},
    // jobActivity : { type: String},
    // jobLocation : { type: String},
    // created_by: { type: String},
    // gps_lati : { type: String},
    // gps_long : { type: String},
    // time : { type : Date, default: Date.now }


                            user.conditionA.push(job.jobCardNumber);
                            user.conditionA.push(job.permitNumber);
                            user.conditionA.push(job.assetType);
                            // console.log(job);

                            return user;
                        // } else

                    }).catch(error => { console.log(error); })
                )
            }))
        })
        .then(final => {
            console.log('final');
            res.send(final);
        }) 
        .catch(error => { console.log(error); })
    }
});

router.post('/listCompanies', function(req, res){
    console.log(req.body);
    User.find({"creator": { "$regex": '0000000', "$options": "i"}
    })
    .then(users => {
            // console.log(users);
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
//make one call, not two
router.post('/getJobAndAsset', function(req, res){
    console.log(req.body);
    Forms.findOne({"jobnumber": { "$regex": req.body.jobNumber, "$options": "i"}})
    .then(job => {
        JobSave.findOne({"jobCardNumber": { "$regex": req.body.jobNumber, "$options": "i"}})
        .then(asset => {
            res.send([job, asset]);
            })
        .catch(error => { console.log(error); })
        })
    .catch(error => { console.log(error); })
});

function logItem(job) {
    return (JobSave.findOne({"jobCardNumber": { "$regex": job.jobnumber, "$options": "i"}})
                .then(asset => {
                    job.asset = asset;
                    // console.log(asset);
                    return (job.asset);
                })
                .catch(error => { console.log(error); })
            );
}


function forEachPromise(items, fn) {
    return items.reduce(function (promise, item) {
        return promise.then(function () {
            return fn(item);
        });
    }, Promise.resolve());
}

module.exports = router;