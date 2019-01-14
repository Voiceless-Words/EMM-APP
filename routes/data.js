

const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');
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

router.post('/change_password', function(req, res){
    console.log(req.body);
        User.findOne({ employee_id: req.body.employeeNumber }, function(err, user)
        {
            user.comparePassword(req.body.opassword, function(err, isMatch) {
                if (err){
                    res.send(JSON.stringify({
                        status : 505
                    }));
                }
                if (isMatch)
                {
                     bcrypt.genSalt(process.env.SALT_BCRYPT, function(err, salt) {
                        if (err) return next(err);
                        bcrypt.hash(req.body.password, salt, null, function(err, hash) {
                            if (err)
                                console.log("change password err");

                            User.updateOne({"employee_id": req.body.employeeNumber}, {
                                password : hash
                            })
                            .then(users => {
                                    res.send(JSON.stringify({
                                        status : 200
                                    }));
                                })
                            .catch(error => { console.log(error); });
                        });
                     });
                }
                else{
                    res.send(JSON.stringify({
                        status : 100
                    }));
                }
            });
        });
});



module.exports = router;