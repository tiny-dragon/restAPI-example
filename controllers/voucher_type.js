var voucherTypeModel = require('../models/voucher_type')

exports.addVoucherType = function (req, res, next) {
    if (req.body.tokenIsAdmin == 1 || req.body.tokenUserId == req.params.userId) {
        if (req.body.voucher_type_name && req.body.expires_in) {
            voucherTypeModel.addVoucherType(req.params.userId, req.body, function(err, result) {
                if (err)
                    res.status(400).json({message: err, data: null})
                else {
                    res.status(200).json({
                        message : 'success',
                        data    : {
                            insert_id   : result
                        }
                    })
                }
            })
        }else {
            res.status(400).json({message: 'Wrong Input Voucher Type Info.', data: null})
        }
    } else {
        res.status(400).json({message: 'Permission Denied', data: null})
    }
}

exports.getVoucherTypeById = function(req, res, next) {
    if (req.body.tokenIsAdmin == 1 || req.body.tokenUserId == req.params.userId) {
        voucherTypeModel.getVoucherTypeById(req.params.userId, req.params.voucherTypeId, function(err, result) {
            if (err)
                res.status(400).json({message: err, data: null})
            else
                res.status(200).json({
                    message : 'success',
                    data    : {
                        voucher_type : result
                    }
                })
        })
    } else {
        res.status(400).json({message: 'Permission Denied', data: null})
    }
}

exports.getVoucherTypeList = function(req, res, next) {
    if (req.body.tokenUserId == req.params.userId) {
        voucherTypeModel.getVoucherTypeList(req.body.tokenUserId, function(err, result) {
            if (err)
                res.status(400).json({message: err, data: null})
            else
                res.status(200).json({
                    message : 'success',
                    data    : {
                        voucher_type_list : result
                    }
                })
        })
    }else {
        res.status(400).json({message: 'Permission Denied', data: null})
    }
}

exports.getVoucherTypeListAll = function(req, res, next) {
    if (req.body.tokenIsAdmin == 1) {
        voucherTypeModel.getVoucherTypeListAll(function(err, result) {
            if (err)
                res.status(400).json({message: err, data: null})
            else
                res.status(200).json({
                    message : 'success',
                    data    : {
                        voucher_type_list : result
                    }
                })
        })
    }else {
        res.status(400).json({message: 'Permission Denied', data: null})
    }
}

exports.updateVoucherType = function(req, res, next) {
    if (req.body.tokenIsAdmin == 1 || req.body.tokenUserId == req.params.userId) {
        voucherTypeModel.updateVoucherType(Number(req.params.userId), Number(req.params.voucherTypeId), req.body, function(err, result) {
            if (err)
                res.status(400).json({message: err, data: null})
            else
                res.status(200).json({
                    message : 'success',
                    data    : {
                        voucher_type_id : result
                    }
                })
        })
    }else {
        res.status(400).json({message: 'Permission Denied', data: null})
    }
}

exports.deleteVoucherType = function(req, res, next) {
    if (req.body.tokenIsAdmin == 1 || req.body.tokenUserId == req.params.userId) {
        voucherTypeModel.deleteVoucherType(Number(req.params.userId), Number(req.params.voucherTypeId), function(err, result) {
            if (err)
                res.status(400).json({message: err, data: null})
            else
                res.status(200).json({message: 'success', data: null})
        })
    } else {
        res.status(400).json({message: 'Permission Denied', data: null})
    }
}