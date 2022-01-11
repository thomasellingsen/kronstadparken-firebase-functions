const functions = require("firebase-functions");
const axios = require("axios");

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
