var sql = require('../config/database');
const QRCode = require('qrcode');
var uniqid = require('uniqid');
var settings = require('../config/settings');

var qrcode_options = {
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    rendererOpts: {
      quality: 1
    },
    level: 1
}

exports.addVoucher = function(voucher_type_id, customer_email, callback) {
    sql.query("SELECT * FROM voucher_type WHERE id = ? ", voucher_type_id, function (error, result) {             
        if(error) {
            callback(error, null);
        }
        else{
            if (result.length == 1) {
                var voucher_type = result[0];
                var status = 0;
                var expire_date = new Date();
                expire_date.setDate(expire_date.getDate() + voucher_type['expires_in']);
                var unique_key = uniqid();

                var query_str = "INSERT INTO voucher (voucher_type_id, customer_email, unique_key, expire_date, status) VALUES ?";
                var query_params = [[[voucher_type_id, customer_email, unique_key, expire_date, status]]];

                sql.query(query_str, query_params, function (error, result) {
                    if(error) {
                        callback(error, null);
                    }
                    else{
                        var qr_code_source = settings.QRCODE_VERIFY_URL + unique_key;

                        QRCode.toDataURL(qr_code_source, qrcode_options, function (err, qr_code) {
                            if (err) 
                                callback("qrcode generation failed", null);
                            else {
                                callback(null, {
                                    qr_code : qr_code
                                });
                            }
                        });
                    }
                });   
            } else {
                callback("invalid voucher type", null);
            }
        }
    });
}

exports.testQrcode = function(unique_key, callback) {
    sql.query("SELECT * FROM voucher WHERE unique_key = ? ", unique_key, function (error, result) {             
        if(error) {
            callback(error, null);
        }
        else{
            if (result.length == 1) {
                callback(null, result[0]);
            } else {
                callback("invalid voucher type", null);
            }
        }
    });
}

exports.getVoucherList = function (merchant_id, callback) {
    var query_str = "SELECT v.* FROM voucher v LEFT JOIN voucher_type t ON (v.voucher_type_id = t.id) WHERE t.merchant_id=?";
    sql.query(query_str, merchant_id, function(error, result) {             
        if(error) {
            callback(error, null);
        }
        else{
            callback(null, result);
        }
    });
}

exports.updateVoucher = function(merchant_id, voucher_id, body, callback) {
    var voucher_type_id = body.voucher_type_id;
    var customer_email = body.customer_email;
    var qr_code = body.qr_code;
    var expire_date = body.expire_date;
    var status = body.status;

    var query_str = "SELECT v.* FROM voucher v LEFT JOIN voucher_type t ON (v.voucher_type_id = t.id) WHERE t.merchant_id=? AND v.id=?";

    sql.query(query_str, [merchant_id, voucher_id], function (error, result) {             
        if(error) {
            callback(error, null);
        }
        else{
            if (result.length == 1) {
                var query_str = "UPDATE voucher SET id=?";
                var query_params = [voucher_id];
            
                if (voucher_type_id != null) {
                    query_str += ", voucher_type_id=?";
                    query_params.push(voucher_type_id);
                }
            
                if (customer_email != null) {
                    query_str += ", customer_email=?";
                    query_params.push(customer_email);
                }
            
                if (qr_code != null) {
                    query_str += ", qr_code=?";
                    query_params.push(qr_code);
                }
            
                if (expire_date != null) {
                    query_str += ", expire_date=?";
                    query_params.push(expire_date);
                }
            
                if (status != null) {
                    query_str += ", status=?";
                    query_params.push(status);
                }
                query_str += " WHERE id=?";
                query_params.push(voucher_id);
            
                sql.query(query_str, query_params, function (error, result) {
                    if(error) {
                        callback(error, null);
                    }
                    else{
                        callback(null, voucher_id);
                    }
                });    
            } else {
                callback("invalid voucher id", null);
            }
        }
    }); 
}

exports.deleteVoucher = function (merchant_id, voucher_id, callback) {
    var query_str = "SELECT v.* FROM voucher v LEFT JOIN voucher_type t ON (v.voucher_type_id = t.id) WHERE t.merchant_id=? AND v.id=?";

    sql.query(query_str, [merchant_id, voucher_id], function (error, result) {             
        if(error) {
            callback(error, null);
        }
        else{
            if (result.length == 1) {
                sql.query("DELETE FROM voucher WHERE id=?", voucher_id, function(error, result) {             
                    if(error) {
                        callback(error, null);
                    }
                    else{
                        callback(null, result);
                    }
                }); 
            } else {
                callback("invalid voucher id", null);
            }
        }
    }); 
}