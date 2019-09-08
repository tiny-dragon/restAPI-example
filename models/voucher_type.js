var pool = require('../config/database')

exports.addVoucherType = function(merchant_id, body, callback) {
    var voucher_type_name = body.voucher_type_name
    var expires_in = body.expires_in
    var status = body.status == null ? 0 : body.status

    pool.query("SELECT * FROM voucher_type WHERE merchant_id=? AND voucher_type_name = ? ", [merchant_id, voucher_type_name], function (error, result) {             
        if(error) {
            callback(error, null)
        }
        else{
            if (result.length == 0) {
                pool.query("INSERT INTO voucher_type (merchant_id, voucher_type_name, expires_in, status) VALUES ?", [[[merchant_id, voucher_type_name, expires_in, status]]], function (error, result) {
                    if(error) {
                        callback(error, null)
                    } else {
                        callback(null, result.insertId)
                    }
                })    
            } else {
                callback("invalid voucher type", null)
            }
        }
    }) 
}

exports.getVoucherTypeById = function (merchant_id, voucher_type_id, callback) {
    let sql_str = "SELECT v.*, u.email, u.company_name, u.first_name, u.last_name FROM voucher_type v LEFT JOIN user u ON (v.merchant_id = u.id)"
    let params = null
    
    if (merchant_id == 'all') {
        sql_str += " WHERE v.id=?"
        params = voucher_type_id
    } else {
        sql_str += " WHERE v.merchant_id = ? AND v.id=?"
        params = [merchant_id, voucher_type_id]
    }

    pool.query(sql_str, params, function(error, result) {             
        if(error) {
            callback(error, null)
        } else {
            if (result.length == 1) {
                callback(null, result[0])
            } else {
                callback("invalid voucher type", null)
            }
        }
    })
}

exports.getVoucherTypeList = function (merchant_id, callback) {
    pool.query("SELECT v.*, u.email, u.company_name, u.first_name, u.last_name FROM voucher_type v LEFT JOIN user u ON (v.merchant_id = u.id) WHERE v.merchant_id = ? ORDER BY v.id DESC", merchant_id, function(error, result) {             
        if(error) {
            callback(error, null)
        }
        else{
            callback(null, result)
        }
    })
}

exports.getVoucherTypeListAll = function (callback) {
    pool.query("SELECT v.*, u.email, u.company_name, u.first_name, u.last_name FROM voucher_type v LEFT JOIN user u ON (v.merchant_id = u.id) ORDER BY v.id DESC", function(error, result) {             
        if(error) {
            callback(error, null)
        }
        else{
            callback(null, result)
        }
    })
}

exports.updateVoucherType = function(merchant_id, voucher_type_id, body, callback) {
    var voucher_type_name = body.voucher_type_name
    var expires_in = body.expires_in
    var status = body.status

    pool.query("SELECT * FROM voucher_type WHERE merchant_id = ? AND id = ? ", [merchant_id, voucher_type_id], function (error, result) {             
        if(error) {
            callback(error, null)
        }
        else{
            if (result.length == 1) {
                var query_str = "UPDATE voucher_type SET id=?"
                var query_params = [voucher_type_id]
            
                if (voucher_type_name != null) {
                    query_str += ", voucher_type_name=?"
                    query_params.push(voucher_type_name)
                }
            
                if (expires_in != null) {
                    query_str += ", expires_in=?"
                    query_params.push(expires_in)
                }
            
                if (status != null) {
                    query_str += ", status=?"
                    query_params.push(status)
                }
                query_str += " WHERE id=?"
                query_params.push(voucher_type_id)
            
                pool.query(query_str, query_params, function (error, result) {
                    if(error) {
                        callback(error, null)
                    }
                    else{
                        callback(null, voucher_type_id)
                    }
                })    
            } else {
                callback("invalid voucher type id", null)
            }
        }
    }) 
}

exports.deleteVoucherType = function (merchant_id, voucher_type_id, callback) {
    pool.query("DELETE FROM voucher_type WHERE merchant_id=? AND id=?", [merchant_id, voucher_type_id], function(error, result) {             
        if(error) {
            callback(error, null)
        }
        else{
            callback(null, result)
        }
    }) 
}