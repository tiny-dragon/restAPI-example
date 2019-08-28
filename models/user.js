var sql = require('../config/database');
var Cryptr = require('cryptr');
var cryptr = new Cryptr('myTotalySecretKey');

exports.login = function (body, callback) {
    var email = body.email;
    var password = body.password;
    
    sql.query("SELECT * FROM user WHERE email = ? ", email, function (error, result) {             
        if(error) {
            callback(error, null);
        }
        else{
            if (result.length == 1) {
                var userinfo = result[0];
                if (cryptr.decrypt(userinfo.password) == password) {
                    callback(null, userinfo);
                } else {
                    callback("wrong password", null);
                }
            } else {
                callback("invalid user", null);
            }
        }
    }); 
}

exports.userinfo = function (user_id, callback) {
    sql.query("SELECT * FROM user WHERE id = ? ", user_id, function (error, result) {             
        if(error) {
            callback(error, null);
        }
        else{
            if (result.length == 1) {
                callback(null, result[0]);
            } else {
                callback("invalid user", null);
            }
        }
    }); 
}

exports.addUser = function(body, callback) {
    var email = body.email;
    var password = body.password;
    var first_name = body.first_name;
    var last_name = body.last_name;
    var company_name = body.company_name;
    // var is_admin = body.is_admin == null ? 0 : is_admin;
    // var status = body.status == null ? 0 : body.status;
    var is_admin = 0;
    var status = 0;

    sql.query("SELECT * FROM user WHERE email = ? ", email, function (error, result) {             
        if(error) {
            callback(error, null);
        }
        else{
            if (result.length == 0) {
                sql.query("INSERT INTO user (email, first_name, last_name, company_name, password, is_admin, status) VALUES ?", [[[email, first_name, last_name, company_name, cryptr.encrypt(password), is_admin, status]]], function (error, result) {
                    if(error) {
                        callback(error, null);
                    }
                    else{
                        callback(null, result.insertId);
                    }
                });    
            } else {
                callback("invalid email address", null);
            }
        }
    }); 
}

exports.getMerchantList = function (callback) {
    sql.query("SELECT * FROM user WHERE is_admin = 0", function(error, result) {             
        if(error) {
            callback(error, null);
        }
        else{
            callback(null, result);
        }
    }); 
}

exports.updateUser = function(userId, body, callback) {
    var email = body.email;
    var password = body.password;
    // var is_admin = body.is_admin;
    // var status = body.status;

    sql.query("SELECT * FROM user WHERE id = ? ", userId, function (error, result) {             
        if(error) {
            callback(error, null);
        }
        else{
            if (result.length == 1) {
                var query_str = "UPDATE user SET id=?";
                var query_params = [userId];
            
                if (email != null) {
                    query_str += ", email=?";
                    query_params.push(email);
                }
            
                if (password != null) {
                    query_str += ", password=?";
                    query_params.push(cryptr.encrypt(password));
                }
            
                // if (is_admin != null) {
                //     query_str += ", is_admin=?";
                //     query_params.push(is_admin);
                // }
            
                // if (status != null) {
                //     query_str += ", status=?";
                //     query_params.push(status);
                // }
                query_str += " WHERE id=?";
                query_params.push(userId);
            
                sql.query(query_str, query_params, function (error, result) {
                    if(error) {
                        callback(error, null);
                    }
                    else{
                        callback(null, userId);
                    }
                });    
            } else {
                callback("invalid userid", null);
            }
        }
    }); 
}

exports.deleteUser = function (userId, callback) {
    sql.query("DELETE FROM user WHERE id=?", userId, function(error, result) {             
        if(error) {
            callback(error, null);
        }
        else{
            callback(null, result);
        }
    }); 
}