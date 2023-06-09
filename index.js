const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const PORT = 5000;
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());;
var nodemailer = require('nodemailer');
require("dotenv").config();

app.get("/", (req, res) => {
    res.json({
        message: "welcome to this Mojo server"
    });
});
              
app.post("/send", (req, res) => {
    const data = {
        message: 'John Doe',
        title: 'Content Writer'
    };

    axios.post('http://localhost:5000/sendtome', data)
        .then((res) => {
            console.log(`Status: ${res.status}`);
            console.log('Body: ', res.data);
        }).catch((err) => {
            console.error(err);
        }); 


});





app.post("/sendtome", (req, res) => {

    try {
        var message = req.body.message;
        var name = req.body.name;
        var mobile = req.body.mobile;
        var email = req.body.email;
        var dtype = req.body.dtype;
        console.log(message);
 

        var transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: process.env.EMAIL_SENDER,
                pass: process.env.EMAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        var mailOptions = {
            from: `"MOJO.in" <${process.env.EMAIL_SENDER}>`,
            to: process.env.EMAIL_ME,

            subject: `New Request From Mojo`,
            text: `Hey there, Welcome to mojo , Your daily solution to keep you updated`,
            html: `<b>Name: </b>  ${name} <p> <b>Mobile:</b> ${mobile} <p> <b>Message: </b> ${message} <p><b>Email: </b>  ${email} <p> <b>Dtype: </b>  ${dtype} <p> `,

        };
        
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {

                return console.log(error);
            }
            console.log(info);
            res.send({ message: "sent" })
            console.log('Message sent: %s', info.messageId);
        });


    }
    catch (error) {
        console.log(error);


    };



});

app.listen(PORT, () => {
    console.log(`Server is running on 5000`)
});
