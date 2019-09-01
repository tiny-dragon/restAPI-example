const Nexmo = require('nexmo');
var settings = require('../config/settings');

const nexmo = new Nexmo({
  apiKey: 'Your Api Key',
  apiSecret: 'Your Api Secret',
});

exports.sendSMS = function(customer_phone_number, unique_key, callback) {
    const from = 'Nexmo';
    const to = customer_phone_number;
    const text = settings.QRCODE_GENERATION_URL + unique_key;
    
    nexmo.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                callback(null, "Message sent successfully.");
            } else {
                callback(`Message failed with error: ${responseData.messages[0]['error-text']}`, null);
            }
        }
    });
}