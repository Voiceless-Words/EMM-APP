

functions = {
    send_mail : function (user, msg){
        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'loverboy.sfiso@gmail.com',
                pass: 'Mia@54321'
            }
        });
        let mailOptions = {
            from: '"Admin" <loverboy.sfiso@gmail.com>', // sender address
            to: user.email, // list of receivers
            subject: "Account verification", // Subject line
            text: "Thank you for signing up", // plain text body
            html: '<b>'+ msg +'</b>' // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
                res.render('index');
        });
    }
}



module.exports = functions;