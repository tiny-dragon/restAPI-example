var pool = require('../config/database')
var Cryptr = require('cryptr')
var cryptr = new Cryptr('myTotalySecretKey')

exports.login = function (body, callback) {
    var email = body.email
    var password = body.password
    
    pool.query("SELECT * FROM user WHERE email = ? ", email, function (error, result) {             
        if(error) {
            callback(error, null)
        } else {
            if (result.length == 1) {
                var userinfo = result[0]
                if (cryptr.decrypt(userinfo.password) == password) {
                    callback(null, userinfo)
                } else {
                    callback("wrong password", null)
                }
            } else {
                callback("invalid user", null)
            }
        }
    }) 
}

exports.userinfo = function (user_id, callback) {
    pool.query("SELECT * FROM user WHERE id = ? ", user_id, function (error, result) {             
        if(error) {
            callback(error, null)
        } else {
            if (result.length == 1) {
                callback(null, result[0])
            } else {
                callback("invalid user", null)
            }
        }
    }) 
}

exports.addUser = function(body, callback) {
    var email = body.email
    var password = body.password
    var first_name = body.first_name
    var last_name = body.last_name
    var company_name = body.company_name
    // var is_admin = body.is_admin == null ? 0 : is_admin
    // var status = body.status == null ? 0 : body.status
    var is_admin = 0
    var status = 0

    pool.query("SELECT * FROM user WHERE email = ? ", email, function (error, result) {             
        if(error) {
            callback(error, null)
        } else {
            if (result.length == 0) {
                pool.query("INSERT INTO user (email, first_name, last_name, company_name, password, is_admin, status) VALUES ?", [[[email, first_name, last_name, company_name, cryptr.encrypt(password), is_admin, status]]], function (error, result) {
                    if(error) {
                        callback(error, null)
                    } else {
                        callback(null, result.insertId)
                    }
                })    
            } else {
                callback("invalid email address", null)
            }
        }
    }) 
}

exports.getMerchantList = function (callback) {
    pool.query("SELECT * FROM user WHERE is_admin = 0", function(error, result) {             
        if(error) {
            callback(error, null)
        } else {
            callback(null, result)
        }
    }) 
}

exports.updateUser = function(userId, body, callback) {
    var email = body.email
    var first_name = body.first_name
    var last_name = body.last_name
    var company_name = body.company_name
    // var status = body.status

    pool.query("SELECT * FROM user WHERE id = ? ", userId, function (error, result) {             
        if(error) {
            callback(error, null)
        } else {
            if (result.length == 1) {
                var query_str = "UPDATE user SET id=?"
                var query_params = [userId]
            
                if (email != null)          { query_str += ", email=?";         query_params.push(email) }
                if (first_name != null)     { query_str += ", first_name=?";    query_params.push(first_name) }
                if (last_name != null)      { query_str += ", last_name=?";     query_params.push(last_name) }
                if (company_name != null)   { query_str += ", company_name=?";  query_params.push(company_name) }

                query_str += " WHERE id=?"
                query_params.push(userId)
            
                pool.query(query_str, query_params, function (error, result) {
                    if(error) {
                        callback(error, null)
                    } else {
                        callback(null, userId)
                    }
                })    
            } else {
                callback("invalid userid", null)
            }
        }
    }) 
}

exports.changePassword = function(userId, body, callback){
    var old_password = body.old_password
    var new_password = body.new_password

    pool.query("SELECT * FROM user WHERE id = ? ", userId, function (error, result) {             
        if(error) {
            callback(error, null)
        } else {
            if (result.length == 1) {
                if (old_password == new_password) {
                    callback("same password", null)
                } else {
                    let userinfo = result[0]

                    if (cryptr.decrypt(userinfo.password) == old_password) {
                        var query_str = "UPDATE user SET id=?"
                        var query_params = [userId]
                    
                        if (new_password != null) {
                            query_str += ", password=?"
                            query_params.push(cryptr.encrypt(new_password))
                        }
    
                        query_str += " WHERE id=?"
                        query_params.push(userId)
                    
                        pool.query(query_str, query_params, function (error, result) {
                            if(error) {
                                callback(error, null)
                            } else {
                                callback(null, null)
                            }
                        })
                    } else {
                        callback("wrong old password", null)
                    }
                }
            } else {
                callback("invalid userid", null)
            }
        }
    }) 
}

exports.deleteUser = function (userId, callback) {
    pool.query("DELETE FROM user WHERE id=?", userId, function(error, result) {             
        if(error) {
            callback(error, null)
        } else {
            callback(null, result)
        }
    }) 
}