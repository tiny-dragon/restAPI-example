const sgMail = require('@sendgrid/mail');
var settings = require('../config/settings');
// const sgMail = require('sendgrid')(settings.SENDGRID_API_KEY);
// var helper = require('sendgrid').mail;

exports.sendEMail2 = function(customer_email, qr_code, callback) {
    console.log(customer_email);
    console.log(qr_code);
    sgMail.setApiKey(settings.SENDGRID_API_KEY);
    sgMail.send({
        to: customer_email,
        from: settings.SENDER_EMAIL,
        subject: 'Test Mail',
        files: [
            {
                filename:     'qr_code.png',          
                contentType:  'image/png',
                cid:          'qr_code_cid',
                content:      ('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAACkCAYAAAAZtYVBAAAAAklEQVR4AewaftIAAAYvSURBVO3BQY4cy5LAQDLQ978yR0tfJZCoar3QHzezP1jrEoe1LnJY6yKHtS5yWOsih7UucljrIoe1LnJY6yKHtS5yWOsih7UucljrIoe1LnJY6yKHtS7yw4dU/qaKSeVJxRsqU8Wk8qRiUpkqJpWp4onKVPFE5W+q+MRhrYsc1rrIYa2L/PBlFd+k8qRiUplUnlQ8UZkqJpU3VN5QmSomlaniScU3qXzTYa2LHNa6yGGti/zwy1TeqPhExaTyRsWkMqlMFZPKk4onKk9UpopPqLxR8ZsOa13ksNZFDmtd5Id/nMpU8aRiUpkqpopJZVJ5UvFGxRsqU8W/7LDWRQ5rXeSw1kV++B+j8kRlqnijYlJ5Q2WqmFSmiknlf9lhrYsc1rrIYa2L/PDLKm5SMal8omJSeVIxqTxRmSq+qeImh7UucljrIoe1LvLDl6n8lyomlTcqJpWpYlKZKiaVqeJJxaTyRGWqeKJys8NaFzmsdZHDWhexP/iHqbxR8YbKVPFE5Zsq/j85rHWRw1oXOax1kR8+pDJVvKEyVUwqb1RMKpPKk4onKlPFk4o3VCaVqWJS+U0VT1Smik8c1rrIYa2LHNa6iP3BF6k8qZhUpoo3VKaKSWWq+ITKGxVPVKaKSeVJxaQyVUwqU8Wk8qTiNx3WushhrYsc1rrID19WMalMKlPFpPIJlaniDZU3Kp6oTBVTxaQyVUwqn6h4o+JvOqx1kcNaFzmsdZEfPqTypOITFZPKk4pJZap4o+KJylQxVfwmlScqU8WTijdUpopPHNa6yGGtixzWusgPH6qYVCaVqWJSeaIyVUwqk8obKm+ofEJlqvhExROVSeWNikllqvimw1oXOax1kcNaF/nhP1bxhspU8URlUnlDZap4Q+WJylQxqbyhMlV8QmWq+E2HtS5yWOsih7UuYn/wRSpvVDxR+UTFpPKkYlJ5UjGpPKmYVKaKSeWbKiaVqWJSeVLxTYe1LnJY6yKHtS5if/CLVD5RMal8U8UbKm9UvKEyVTxRmSreUHlS8Tcd1rrIYa2LHNa6yA8fUnlS8QmVNyomlScqb1Q8UXmiMlU8UfmEylTxCZWp4psOa13ksNZFDmtd5If/mMqTijdUPlExqUwqTyomlaliUvlExaQyVTypmFQmlaniNx3WushhrYsc1rqI/cEHVN6oeKLyRsUTlScVb6hMFZPKVPGGyicqJpWp4onKVDGpTBXfdFjrIoe1LnJY6yI//LKKSeVJxROVSeWNik9UvKEyVXxTxTdVvKEyVXzisNZFDmtd5LDWRX74UMUTlScVT1SeVDxR+SaVqWKqmFQmlScVb6hMFU9U3qj4mw5rXeSw1kUOa13E/uADKp+omFSmim9SmSqeqEwVk8pU8URlqnhDZap4Q2WqmFTeqPimw1oXOax1kcNaF/nhQxVvqDypmFTeqHhDZaqYKt5Q+YTKVPFE5TdVTCq/6bDWRQ5rXeSw1kXsD36RylQxqTypmFSmiknlScWk8kbFE5V/WcUTlScVnzisdZHDWhc5rHUR+4MPqDyp+ITKJyo+ofKJijdUpoonKr+p4m86rHWRw1oXOax1EfuDf5jKGxWfUJkqJpWp4onKGxWTylTxhspUMalMFb/psNZFDmtd5LDWRX74kMrfVPFGxROVT6hMFZPKVPGk4ptUpoonKlPFpDJVfNNhrYsc1rrIYa2L/PBlFd+k8qTiicpU8U0VTyomlaniicpU8UbFv+Sw1kUOa13ksNZFfvhlKm9UvKEyVUwVTyomlScVk8pU8V9S+U0Vv+mw1kUOa13ksNZFfvjHVUwqU8UTlaliUnlS8UTlicqTikllqniiMlVMKlPFE5Wp4psOa13ksNZFDmtd5If/MRWTyicqJpWp4knFE5WpYlL5JpVPVPymw1oXOax1kcNaF/nhl1X8lyreUJkqnqi8UTFVTCpPKiaVqeKNikllqvibDmtd5LDWRQ5rXeSHL1P5m1Q+UTFVPKmYVJ5UTCpTxZOKSeWJylTxROUTKlPFJw5rXeSw1kUOa13E/mCtSxzWushhrYsc1rrIYa2LHNa6yGGtixzWushhrYsc1rrIYa2LHNa6yGGtixzWushhrYsc1rrI/wGbhwljdxCWFwAAAABJRU5ErkJggg==' | Buffer)
            }
        ],
        text:'test text',
        html:'<html><body><img src="cid:qr_code_cid"/></body></html>'
    }, function (err) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, null);
        }
    });
}

exports.sendEMail1 = function(customer_email, qr_code, callback) {
    // Add from emails
    const senderEmail = new helper.Email(settings.SENDER_EMAIL);
        
    // Add to email
    const toEmail = new helper.Email(customer_email);

    // HTML Content
    var htmlContent = '<img src="' + qr_code + '"/>';
    const content = new helper.Content('text/html', htmlContent);

    const mail = new helper.Mail(senderEmail, "subject", toEmail, content);

    var request = sgMail.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    console.log(mail.toJSON());

    sgMail.API(request, function (error, response) {
        console.log('SendGrid');
        if (error) {
            console.log('Error response received');
            callback(error, null);
        } else {
            callback(null, null);
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
        }
    });
}

exports.sendEMail = function(customer_email, unique_key, callback) {
    sgMail.setApiKey(settings.SENDGRID_API_KEY);

    const msg = {
        to: customer_email,
        from: 'no-reply@koalabeds.com',
        subject: 'Voucher',
        text: 'Voucher',
        // html: '<div style="background-image: url(' + settings.QRCODE_GENERATION_URL + unique_key + '); width: 150px; height: 150px;">My Background Image</div>',
        // html: '<div style="background-image: url(' + settings.QRCODE_GENERATION_URL + unique_key + '); width: 150px; height: 150px;">My Background Image</div>' + 
        //         '<img alt="My Image" src="' + settings.QRCODE_GENERATION_URL + unique_key + '" />'
        // html: `<table><tr><td style="width:150px; height:150px; background:url(${settings.QRCODE_GENERATION_URL}${unique_key}) no-repeat;">&nbsp;</td></tr></table>`
        html: `<table><tr><td><a href="${settings.QRCODE_GENERATION_URL}${unique_key}"><img alt="${settings.QRCODE_GENERATION_URL}${unique_key}" src="${settings.QRCODE_GENERATION_URL}${unique_key}" /></a></td></tr></table>`
        // html: '<img alt="' + settings.QRCODE_GENERATION_URL + unique_key + '" src="data:image/png;base64,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" />'
    };

    console.log(msg);

    sgMail.send(msg).then((sent) => {
        callback(null, sent);
    });
}
