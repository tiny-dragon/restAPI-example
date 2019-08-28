var sql = require('../config/database');

exports.addVoucherType = function(merchant_id, body, callback) {
    var voucher_type_name = body.voucher_type_name;
    var expires_in = body.expires_in;
    var status = body.status == null ? 0 : body.status;

    sql.query("SELECT * FROM voucher_type WHERE merchant_id=? AND voucher_type_name = ? ", [merchant_id, voucher_type_name], function (error, result) {             
        if(error) {
            callback(error, null);
        }
        else{
            if (result.length == 0) {
                sql.query("INSERT INTO voucher_type (merchant_id, voucher_type_name, expires_in, status) VALUES ?", [[[merchant_id, voucher_type_name, expires_in, status]]], function (error, result) {
                    if(error) {
                        callback(error, null);
                    }
                    else{
                        callback(null, result.insertId);
                    }
                });    
            } else {
                callback("invalid voucher type", null);
            }
        }
    }); 
}

exports.getVoucherTypeById = function (merchant_id, voucher_type_id, callback) {
    sql.query("SELECT v.*, u.email, u.company_name FROM voucher_type v LEFT JOIN user u ON (v.merchant_id = u.id) WHERE v.merchant_id = ? AND v.id=?", [merchant_id, voucher_type_id], function(error, result) {             
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

exports.getVoucherTypeList = function (merchant_id, callback) {
    sql.query("SELECT v.*, u.email, u.company_name FROM voucher_type v LEFT JOIN user u ON (v.merchant_id = u.id) WHERE v.merchant_id = ?", merchant_id, function(error, result) {             
        if(error) {
            callback(error, null);
        }
        else{
            callback(null, result);
        }
    });
}

exports.getVoucherTypeListAll = function (callback) {
    sql.query("SELECT v.*, u.email, u.company_name FROM voucher_type v LEFT JOIN user u ON (v.merchant_id = u.id)", function(error, result) {             
        if(error) {
            callback(error, null);
        }
        else{
            callback(null, result);
        }
    });
}

exports.updateVoucherType = function(merchant_id, voucher_type_id, body, callback) {
    var voucher_type_name = body.voucher_type_name;
    var expires_in = body.expires_in;
    var status = body.status;

    sql.query("SELECT * FROM voucher_type WHERE merchant_id = ? AND id = ? ", [merchant_id, voucher_type_id], function (error, result) {             
        if(error) {
            callback(error, null);
        }
        else{
            if (result.length == 1) {
                var query_str = "UPDATE voucher_type SET id=?";
                var query_params = [voucher_type_id];
            
                if (voucher_type_name != null) {
                    query_str += ", voucher_type_name=?";
                    query_params.push(voucher_type_name);
                }
            
                if (expires_in != null) {
                    query_str += ", expires_in=?";
                    query_params.push(expires_in);
                }
            
                if (status != null) {
                    query_str += ", status=?";
                    query_params.push(status);
                }
                query_str += " WHERE id=?";
                query_params.push(voucher_type_id);
            
                sql.query(query_str, query_params, function (error, result) {
                    if(error) {
                        callback(error, null);
                    }
                    else{
                        callback(null, voucher_type_id);
                    }
                });    
            } else {
                callback("invalid voucher type id", null);
            }
        }
    }); 
}

exports.deleteVoucherType = function (merchant_id, voucher_type_id, callback) {
    sql.query("DELETE FROM voucher_type WHERE merchant_id=? AND id=?", [merchant_id, voucher_type_id], function(error, result) {             
        if(error) {
            callback(error, null);
        }
        else{
            callback(null, result);
        }
    }); 
}