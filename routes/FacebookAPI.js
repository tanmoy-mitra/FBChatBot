var express = require('express');
var router = express.Router();

const token = "EAATbbDYNjH8BAFC580APJlmwUY3UJ07jWzmgeJ8tpBpf9vgV7m9s6hZCqhiKYWyw7GW1xK1hZBEWBM2z92ItC6fmWZApYTzKoQ3JtTn2dz7a6kKhKufxnZCbhD4sR7Nnt1g4QuCqTKr2e4OlS6eIuZCKYFCPSid9vS4JKY5IVBwZDZD";
/* GET users listing. */
router.get('/', function(req, res, next) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
        let sender = event.sender.id
        if (event.message && event.message.text) {
            let text = event.message.text
            sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
        }
    }
    res.sendStatus(200)
});

function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    });
}

module.exports = router;