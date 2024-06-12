const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",

    port:465,
    secure:true,
    logger:true,
    debug:true,
    secureConnection:true,


    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS
    },

    tls:{
        rejectUnauthorized:true
    }
})

const sendMail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_ADRESS,
        to,
        subject,
        text
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data.response);
        }
    });
}

module.exports = sendMail;