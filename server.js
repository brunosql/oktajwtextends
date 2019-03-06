var express = require("express");
var app = express();

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.post('/iamx-token', (req, res) => {

  const message = {
    "commands":
        [{
            "type": "com.okta.tokens.id_token.patch",
            "value":
                [
                {
                    "op": "add",
                    "path": "/claims/extPatientId",
                    "value": "1234"
                }
                ]
        },
        {
            "type": "com.okta.tokens.access_token.patch",
            "value":
                [
                {
                    "op": "add",
                    "path": "/claims/external_guid",
                    "value": "F0384685-F87D-474B-848D-2058AC5655A7"
                }
                ]
        }]
    };
    return res.status(200).send(message);
  });

app.listen(server_port, server_ip_address, () => {
    console.log( "Listening on " + server_ip_address + ", port " + server_port )
});

module.exports = app;