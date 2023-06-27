const functions = require("firebase-functions");
const axios = require("axios");
const nodemailer = require('nodemailer');



exports.authenticateIzy = functions.https.onCall((data, context) => {
    
  return axios
    .post(functions.config().izy.base_url + "authenticate", {
      email: functions.config().izy.email,
      password: functions.config().izy.password,
      key: functions.config().izy.key,
    })
    .then((response) => {
      return {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        expires_in: response.data.expires_in,
      };
    })
    .catch((err) => {
        console.error(err);
      return {
        error: "could not authenticate",
      };
    });
});


exports.sendMailOverHTTP = functions.https.onRequest((req, res) => {

  var transporter = nodemailer.createTransport({
    host: functions.config().mail.smtp,
    port: 587,
    secure: false,
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
      },
    auth: {
        user: functions.config().mail.user,
        pass: functions.config().mail.pwd
    }
  });

  const mailOptions = {
      from: functions.config().mail.user,
      to: functions.config().mail.to,
      subject: 'Varsel om booking',
      html: `<h1>Varsel om booking</h1>
                          <p>
                            <b>Grunn for varsel: </b>${req.body.reason}<br>
                             <b>Navn: </b>${req.body.name}<br>
                             <b>Firma: </b>${req.body.company}<br>
                             <b>Email: </b>${req.body.email}<br>
                             <b>Møterom: </b>${req.body.meetingroom}<br>
                             <b>Tidspunkt fra: </b>${req.body.from}<br>
                             <b>Antall timer: </b>${req.body.to}<br>
                          </p>`
  };
  return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
          return res.send(error.toString());
      }
      var data = JSON.stringify(data)
      return res.send(`Sent! ${data}`);
  });
});

