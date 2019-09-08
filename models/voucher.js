var pool = require('../config/database')
const QRCode = require('qrcode')
var uniqid = require('uniqid')
var settings = require('../config/settings')
var email_helper = require('../helper/email_helper')
var sms_helper = require('../helper/sms_helper')

var qrcode_options = {
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    rendererOpts: {
      quality: 0
    },
    level: 1
}

exports.addVoucher = function(voucher_type_id, customer_email, customer_phone_number, price, quantity, start_date, delivery_method, is_delivery, callback) {
    pool.query("SELECT * FROM voucher_type WHERE id = ? ", voucher_type_id, function (error, result) {             
        if(error) {
            callback(error, null)
        }
        else{
            if (result.length == 1) {
                var voucher_type = result[0]
                var status = 0
                var expire_date = new Date(start_date)
                expire_date.setDate(expire_date.getDate() + voucher_type['expires_in'])
                var unique_key = uniqid()

                var query_str = "INSERT INTO voucher (voucher_type_id, customer_email, customer_phone_number, unique_key, start_date, expire_date, price, quantity, delivery_method, status) VALUES ?"
                var query_params = [[[voucher_type_id, customer_email, customer_phone_number, unique_key, start_date, expire_date, price, quantity, delivery_method, status]]]

                pool.query(query_str, query_params, function (error, result) {
                    if(error) {
                        callback(error, null)
                    }
                    else{
                        if (is_delivery == 1) {
                            if (delivery_method == 0) { //sms
                                sms_helper.sendSMS(customer_phone_number, unique_key, callback)
                            } else if(delivery_method == 1) { //email
                                email_helper.sendEMail(customer_email, unique_key, callback)
                            } else {
                                callback("wrong delivery method", null)
                            }
                        } else {
                            callback(null, null)
                        }
                    }
                })   
            } else {
                callback("invalid voucher type", null)
            }
        }
    })
}

exports.getQrCode = function(unique_key, callback) {
    pool.query("SELECT * FROM voucher WHERE unique_key = ? ", unique_key, function (error, result) {             
        if(error) {
            callback(error, null)
        }
        else{
            if (result.length == 1) {
                var qr_code_source = settings.QRCODE_VERIFY_URL + unique_key

                QRCode.toDataURL(qr_code_source, function (err, qr_code) {
                    if (err) 
                        callback("qrcode generation failed", null)
                    else {
                        let data = qr_code.replace(/.*,/, '')
                        let image = new Buffer(data, 'base64')
                        callback(null, image)
                    }
                })
            } else {
                callback("invalid voucher type", null)
            }
        }
    })
}

exports.verifyQrCode = function(unique_key, callback) {
    pool.query("SELECT v.*, t.voucher_type_name, u.company_name FROM voucher v LEFT JOIN voucher_type t ON (v.voucher_type_id = t.id) LEFT JOIN user u ON (t.merchant_id = u.id) WHERE unique_key = ? ", unique_key, function (error, result) {             
        if(error) {
            callback(error, null)
        }
        else{
            if (result.length == 1) {
                let voucher_info = result[0]
                let today = new Date()
                let start_date = new Date(voucher_info['start_date'])
                let expire_date = new Date(voucher_info['expire_date'])
                let now = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + ' ' + 
                        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

                if (voucher_info['status'] == 1) {
                    callback("already redeemed", null)
                } else {
                    if (today < start_date) {
                        callback("before start", null)
                    } else if (today > expire_date) {
                        callback("voucher is expired", null)
                    } else {
                        var query_str = "UPDATE voucher SET status=?, redeemedAt=? WHERE id=?"
                        pool.query(query_str, [1, now, voucher_info['id']], function (error, result) {
                            if (error) {
                                callback(error, null)
                            } else {
                                callback(null, result[0])
                            }
                        })
                    }
                }
            } else {
                callback("invalid voucher", null)
            }
        }
    })
}

exports.getVoucherById = function (merchant_id, voucher_id, callback) {
    var query_str = "SELECT v.*, t.voucher_type_name, t.expires_in, u.email, u.company_name " +
                    "FROM voucher v " +
                    "LEFT JOIN voucher_type t ON (v.voucher_type_id = t.id) " + 
                    "LEFT JOIN user u ON (t.merchant_id = u.id) "
    var params = null
    
    if (merchant_id == "all") {
        query_str += "WHERE v.id=?"
        params = voucher_id
    } else {
        query_str += "WHERE t.merchant_id=? AND v.id=?"
        params = [merchant_id, voucher_id]
    }
                    
    pool.query(query_str, params, function(error, result) {
        if(error) {
            callback(error, null)
        }
        else{
            if (result.length == 1) {
                callback(null, result[0])
            } else {
                callback("invalid voucher type", null)
            }
        }
    })
}

exports.getVoucherList = function (merchant_id, callback) {
    var query_str = "SELECT v.*, t.voucher_type_name, t.expires_in, u.email, u.company_name, u.first_name, u.last_name " +
                    "FROM voucher v " + 
                    "LEFT JOIN voucher_type t ON (v.voucher_type_id = t.id) " +
                    "LEFT JOIN user u ON (t.merchant_id = u.id) " +
                    "WHERE t.merchant_id=?"
    pool.query(query_str, merchant_id, function(error, result) {             
        if(error) {
            callback(error, null)
        }
        else{
            callback(null, result)
        }
    })
}

exports.getVoucherListAll = function (callback) {
    var query_str = "SELECT v.*, t.voucher_type_name, t.expires_in, u.email, u.company_name, u.first_name, u.last_name " +
                    "FROM voucher v " + 
                    "LEFT JOIN voucher_type t ON (v.voucher_type_id = t.id) " +
                    "LEFT JOIN user u ON (t.merchant_id = u.id) "
    pool.query(query_str, function(error, result) {             
        if(error) {
            callback(error, null)
        }
        else{
            callback(null, result)
        }
    })
}

exports.updateVoucher = function(merchant_id, voucher_id, body, callback) {
    var query_str = "SELECT v.* FROM voucher v LEFT JOIN voucher_type t ON (v.voucher_type_id = t.id) "
    var params = null

    if (merchant_id == "all") {
        query_str += "WHERE v.id=?"
        params = voucher_id
    } else {
        query_str += "WHERE t.merchant_id=? AND v.id=?"
        params = [merchant_id, voucher_id]
    }

    pool.query(query_str, params, function (error, result) {             
        if(error) {
            callback(error, null)
        }
        else{
            if (result.length == 1) {
                var voucher = result[0]
                query_str = "SELECT * FROM voucher_type "

                if (merchant_id == "all") {
                    query_str += "WHERE id = ? "
                    params = body.voucher_type_id
                } else {
                    query_str += "WHERE merchant_id=? AND id = ? "
                    params = [merchant_id, body.voucher_type_id]
                }

                pool.query(query_str, params, function (error, result) {             
                    if(error) {
                        callback(error, null)
                    }
                    else{
                        if (result.length == 1) {
                            var voucher_type = result[0]

                            var voucher_type_id = body.voucher_type_id
                            var customer_email = body.customer_email
                            var qr_code = body.qr_code
                            var start_date = body.start_date
                            var expire_date = new Date(start_date)
                            expire_date.setDate(expire_date.getDate() + voucher_type['expires_in'])
                            var price = body.price
                            var quantity = body.quantity
                            var delivery_method = body.delivery_method
                            var status = body.status
                            var is_delivery = body.is_delivery
                            var customer_phone_number = body.customer_phone_number

                            var query_str = "UPDATE voucher SET id=?"
                            var query_params = [voucher_id]
                        
                            if (voucher_type_id != null)        { query_str += ", voucher_type_id=?";       query_params.push(voucher_type_id) }
                            if (customer_email != null)         { query_str += ", customer_email=?";        query_params.push(customer_email) }
                            if (customer_phone_number != null)  { query_str += ", customer_phone_number=?"; query_params.push(customer_phone_number) }
                            if (qr_code != null)                { query_str += ", qr_code=?";               query_params.push(qr_code) }
                            if (start_date != null)             { query_str += ", start_date=?";            query_params.push(start_date) }
                            if (expire_date != null)            { query_str += ", expire_date=?";           query_params.push(expire_date) }
                            if (price != null)                  { query_str += ", price=?";                 query_params.push(price) }
                            if (quantity != null)               { query_str += ", quantity=?";              query_params.push(quantity) }
                            if (delivery_method != null)        { query_str += ", delivery_method=?";       query_params.push(delivery_method) }

                            query_str += " WHERE id=?"
                            query_params.push(voucher_id)
                        
                            pool.query(query_str, query_params, function (error, result) {
                                if(error) {
                                    callback(error, null)
                                }
                                else{
                                    if (is_delivery == 1) {
                                        if (delivery_method == 0) { //sms
                                            sms_helper.sendSMS(customer_phone_number, voucher['unique_key'], callback)
                                        } else if(delivery_method == 1) { //email
                                            email_helper.sendEMail(customer_email, voucher['unique_key'], callback)
                                        } else {
                                            callback("wrong delivery method", null)
                                        }
                                    } else {
                                        callback(null, null)
                                    }
                                }
                            })    
                        } else {
                            callback("invalid voucher type id", null)
                        }
                    }
                })
            } else {
                callback("invalid voucher id", null)
            }
        }
    }) 
}

exports.deleteVoucher = function (merchant_id, voucher_id, callback) {
    var query_str = "SELECT v.* FROM voucher v LEFT JOIN voucher_type t ON (v.voucher_type_id = t.id) "
    var params = null

    if (merchant_id == "all") {
        query_str += "WHERE v.id=?"
        params = voucher_id
    } else {
        query_str += "WHERE t.merchant_id=? AND v.id=?"
        params = [merchant_id, voucher_id]
    }

    pool.query(query_str, params, function (error, result) {             
        if(error) {
            callback(error, null)
        }
        else{
            if (result.length == 1) {
                pool.query("DELETE FROM voucher WHERE id=?", voucher_id, function(error, result) {             
                    if(error) {
                        callback(error, null)
                    }
                    else{
                        callback(null, result)
                    }
                }) 
            } else {
                callback("invalid voucher id", null)
            }
        }
    }) 
}

exports.deliveryVoucher = function (merchant_id, voucher_id, callback) {
    var query_str = "SELECT v.* FROM voucher v LEFT JOIN voucher_type t ON (v.voucher_type_id = t.id) WHERE t.merchant_id=? AND v.id=?"

    pool.query(query_str, [merchant_id, voucher_id], function (error, result) {             
        if(error) {
            callback(error, null)
        }
        else{
            if (result.length == 1) {
                let voucher_info = result[0]

                if (voucher_info['delivery_method'] == 0) { //sms
                    sms_helper.sendSMS(voucher_info['customer_phone_number'], voucher_info['unique_key'], callback)
                } else {    //email
                    email_helper.sendEMail(voucher_info['customer_email'], voucher_info['unique_key'], callback)
                }
            } else {
                callback("invalid voucher id", null)
            }
        }
    }) 
}