//manage user registrations
//user logon
const express = require('express');
const session = require('express-session');
const router = express.Router();

router.use(session({
    secret: "passwhatever12", resave:false, saveUninitialized: true
}));

router.post('/login', function(req, res){
    var errors = [];
    var status = 0;
    
    //testing
    // errors.push("<strong>Password</strong> Dont match");

    if (errors.length == 0)
    {
        req.session.user = 2222222; //current user id
        status = 1;
    }

    res.send(JSON.stringify({
        error : errors,
        status : status
    }));
});

module.exports = router;