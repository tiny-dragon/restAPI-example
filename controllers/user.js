var userModel = require('../models/user')
var jwt = require('jsonwebtoken')
var settings = require('../config/settings')

exports.login = function (req, res, next) {
    if (req.body.email && req.body.password) {
        userModel.login(req.body, function(err, result) {
            if (err)
                res.status(400).json({message:err, data: null})
            else {
                res.status(200).json({
                    message : 'success',
                    data    : {
                        id          : result.id,
                        first_name  : result.first_name,
                        last_name   : result.last_name,
                        token       : jwt.sign(
                            { 
                                tokenUserId     : result.id, 
                                tokenEmail      : result.email,
                                tokenIsAdmin    : result.is_admin
                            },
                            settings.TOKEN_SECRET
                        )
                    }
                })
            }
        })
    }else {
        res.status(400).json({message:'Wrong Input Login Info.'})
    }
}

exports.userinfo = function(req, res, next){
    userModel.userinfo(req.body.tokenUserId, function(err, result) {
        if (err)
            res.status(400).json({message:err, data: null})
        else {
            res.status(200).json({
                message : 'success',
                data    : {
                    id          : result.id,
                    first_name  : result.first_name,
                    last_name   : result.last_name,
                    email       : result.email,
                    company_name: result.company_name,
                    is_admin    : result.is_admin
                }
            })
        }
    })
}

exports.getUserInfoById = function(req, res, next) {
    if (req.body.tokenIsAdmin == 1) {
        userModel.userinfo(req.params.userId, function(err, result) {
            if (err)
                res.status(400).json({message:err, data: null})
            else {
                res.status(200).json({
                    message : 'success',
                    data    : {
                        id          : result.id,
                        first_name  : result.first_name,
                        last_name   : result.last_name,
                        email       : result.email,
                        company_name: result.company_name,
                        is_admin    : result.is_admin
                    }
                })
            }
        })
    }
}

exports.logout = function(req, res, next) {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
                res.status(400).json({message: err, data: null})
            } else {
                res.status(200).json({message: 'success', data: null})
            }
        })
    }else{
        res.status(200).json({message: 'success', data: null})
}
}

exports.addUser = function(req, res, next) {
    if (req.body.email && req.body.password) {
        userModel.addUser(req.body, function(err, result) {
            if (err)
                res.status(400).json({message: err, data: err})
            else 
                res.status(200).json({
                    message : 'success',
                    data    : {
                        insert_id : result
                    }
                })
        })
    }else {
        res.status(400).json({message: 'Wrong Input Signup Info.', data: null})
    }
}

exports.getMerchantList = function(req, res, next) {
    if (req.body.tokenIsAdmin == 1) {
        userModel.getMerchantList(function(err, result) {
            if (err)
                res.status(400).json({message: err, data: err})
            else
                res.status(200).json({
                    message : 'success',
                    data    : {
                        user_list : result
                    }
                })
        })
    } else {
        res.status(400).json({message: 'Invalid Action', data: null})
    }
}

exports.updateUser = function(req, res, next) {
    if (req.body.tokenIsAdmin == 1 || req.body.tokenUserId == req.params.userId) {
        userModel.updateUser(Number(req.params.userId), req.body, function(err, result) {
            if (err)
                res.status(400).json({message: err, data: err})
            else
                res.status(200).json({
                    message : 'success',
                    data    : {
                        user_id : result
                    }
                })
        })
    }else {
        res.status(400).json({message: 'Permission Denied', data: null})
    }
}

exports.changePassword = function(req, res, next) {
    if (req.body.tokenUserId == req.params.userId) {
        if (req.body.old_password && req.body.new_password) {
            userModel.changePassword(Number(req.params.userId), req.body, function(err, result) {
                if (err)
                    res.status(400).json({message: err, data: err})
                else
                    res.status(200).json({
                        message : 'success',
                        data    : null
                    })
            })
        } else {
            res.status(400).json({message: 'Wrong Info', data: null})
        }
    }else {
        res.status(400).json({message: 'Permission Denied', data: null})
    }
}

exports.deleteUser = function(req, res, next) {
    if (req.body.tokenIsAdmin == 1) {
        userModel.deleteUser(Number(req.params.userId), function(err, result) {
            if (err)
                res.status(400).json({message: err, data: err})
            else
                res.status(200).json({message: 'success', data: null})
        })
    } else {
        res.status(400).json({message: 'Permission Denied', data: null})
    }
}