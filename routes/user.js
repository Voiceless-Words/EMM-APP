//manage user registrations
//user logon
const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');
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
        // console.log("login----------->");

        if (err)
        {
            console.log(err);
        }

        if (user)
        {
            var status = user.admin + 1;
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (err){
                    console.log(err);
                }
                if (isMatch)
                {
                    if (req.body.password == "123456")
                    {
                        res.send(JSON.stringify({
                            error : errors,
                            status : -1,
                        }));
                    }
                    else
                    {
                        //set session
                            // req.session.user = req.body.username;
                         User.find({"employee_id": { "$regex": req.body.username, "$options": "i"}})
                        .then(users => {
                                req.session.user = users[0].employee_id;
                                console.log("session set as "+req.session.user);
                                res.send(JSON.stringify({
                                    error : errors,
                                    status : status
                                }));
                            })
                        .catch(error => { console.log(error); })
                        
                    }
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

router.post('/register', function(req, res){
    var newUser = {
        employee_id: req.body.employee_id,
        first_name: req.body.first_name,
        last_name : req.body.last_name,
        password : req.body.password,
        contact : req.body.contact,
        admin : req.body.admin
    };
    // console.log(newUser);
    //will parse the data here *dont forget
    User.create( newUser, function(err, doc) {
        // console.log(doc);

        if (err){
            // console.log(err);
            errors.push("<strong>User</strong> Exists");
            res.send(JSON.stringify({
                error : errors,
                status : 0
            }));
        }

        if (doc)
        {
            errors.push("<strong>User</strong> Created");
            res.send(JSON.stringify({
                error : errors,
                status : 0
            }));
        }
    });
});

router.post('/update', function(req, res){
    
    bcrypt.genSalt(process.env.SALT_BCRYPT, function(err, salt) {
        ///testing
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(req.body.value, salt, null, function(err, hash) {
            if (err)
                console.log("change password err");

            // override the cleartext password with the hashed one
            User.updateOne({"employee_id": req.body.user}, {
                password : hash
            })
            .then(users => {
                    console.log(users);

                    req.session.user = users[0].employee_id;
                    console.log("session set as "+req.session.user);
                    res.send(JSON.stringify({
                        status : 200
                    }));
                })
            .catch(error => { console.log(error); })
        });
    });
});

module.exports = router;