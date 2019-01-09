

const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const router = express.Router();

const user = require('./user');

const User = require('../models/users');

 router.use(session({
     secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true
 }));


router.post('/update_field', function(req, res){
    console.log(req.body.id);
    // console.log('hitting upload field');
     User.updateOne({"employee_id": req.body.id}, {
                [req.body.name] : req.body.value
            })
            .then(users => {
                    console.log(users);

                    // req.session.user = users[0].employee_id;
                    // console.log("session set as on update field"+req.session.user);
                    if (users.nModified == 1){
                        res.send(JSON.stringify({
                        status : 200
                        }));
                    }
                    else if(users.nModified == 0)
                    {
                        res.send(JSON.stringify({
                        status : 100
                        }));
                    }
                    
                })
            .catch(error => { console.log(error); })
});

module.exports = router;