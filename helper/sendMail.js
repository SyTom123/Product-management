const nodemailer = require('nodemailer');
module.exports.sendMail = (email, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            password: process.env.EMAIL_PASS
        }
    });

    const mailOption = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: html
    }

    transporter.sendMail(mailOption, function(error, info){
        if(error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
            // do something useful
        }
    });
}