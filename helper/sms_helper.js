const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: 'e6f8f73f',
  apiSecret: 'qLbSakcrOQDZpvr0',
});

exports.sendSMS = function(customer_phone_number, qr_code, callback) {
    const from = 'Nexmo';
    const to = customer_phone_number;
    const text = '<img src="' + qr_code + '"/>';
    
    callback(null, qr_code);

    return;
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