var voucherModel = require('../models/voucher')

exports.addVoucher = function (req, res, next) {
    if (req.body.tokenIsAdmin == 1 || req.body.tokenUserId == req.params.userId) {
        if (req.body.voucher_type_id && (req.body.customer_email || req.body.customer_phone_number)) {
            voucherModel.addVoucher(req.body.voucher_type_id, req.body.customer_email, req.body.customer_phone_number, req.body.price, req.body.quantity, req.body.start_date, req.body.delivery_method, req.body.is_delivery, function(err, result) {
                if (err)
                    res.status(400).json({message: err, data: null})
                else {
                    res.status(200).json({
                        message : 'success',
                        data    : result
                    })
                }
            })
        }else {
            res.status(400).json({message: 'Wrong Input Voucher Info.', data: null})
        }
    } else {
        res.status(400).json({message: 'Permission Denied', data: null})
    }
}

exports.getQrCode = function (req, res, next) {
    voucherModel.getQrCode(req.params.qrKey, function(err, result) {
        if (err) {
            res.status(400).json({message: err, data: null})
        } else {
            res.writeHead(200, {
                'Content-Type' : 'image/png',
                'Content-Length' : result.length
            })
            res.end(result)
        }
    })
}

exports.verifyQrCode = function(req, res, next) {
    voucherModel.verifyQrCode(req.params.qrKey, function(err, result) {
        if (err) {
            res.status(400).json({message: err, data: null})
        } else {
            res.status(200).json({message: null, data: result})
        }
    })
}

exports.getVoucherById = function(req, res, next) {
    if (req.body.tokenIsAdmin == 1 || req.body.tokenUserId == req.params.userId) {
        voucherModel.getVoucherById(req.params.userId, req.params.voucherId, function(err, result) {
            if (err)
                res.status(400).json({message: err, data: null})
            else
                res.status(200).json({
                    message : 'success',
                    data    : {
                        voucher : result
                    }
                })
        })
    }else {
        res.status(400).json({message: 'Permission Denied', data: null})
    }
}

exports.getVoucherList = function(req, res, next) {
    if (req.body.tokenUserId == req.params.userId) {
        voucherModel.getVoucherList(req.body.tokenUserId, function(err, result) {
            if (err)
                res.status(400).json({message: err, data: null})
            else
                res.status(200).json({
                    message : 'success',
                    data    : {
                        voucher_list : result
                    }
                })
        })
    }else {
        res.status(400).json({message: 'Permission Denied', data: null})
    }
}

exports.getVoucherListAll = function(req, res, next) {
    if (req.body.tokenIsAdmin == 1) {
        voucherModel.getVoucherListAll(function(err, result) {
            if (err)
                res.status(400).json({message: err, data: null})
            else
                res.status(200).json({
                    message : 'success',
                    data    : {
                        voucher_list : result
                    }
                })
        })
    }else {
        res.status(400).json({message: 'Permission Denied', data: null})
    }
}

exports.updateVoucher = function(req, res, next) {
    if (req.body.tokenIsAdmin == 1 || req.body.tokenUserId == req.params.userId) {
        voucherModel.updateVoucher(req.params.userId, Number(req.params.voucherId), req.body, function(err, result) {
            if (err)
                res.status(400).json({message: err, data: null})
            else
                res.status(200).json({
                    message : 'success',
                    data    : {
                        voucher_id : result
                    }
                })
        })
    }else {
        res.status(400).json({message: 'Permission Denied', data: null})
    }
}

exports.deleteVoucher = function(req, res, next) {
    if (req.body.tokenIsAdmin == 1 || req.body.tokenUserId == req.params.userId) {
        voucherModel.deleteVoucher(req.params.userId, req.params.voucherId, function(err, result) {
            if (err)
                res.status(400).json({message: err, data: null})
            else
                res.status(200).json({message: 'success', data: null})
        })
    } else {
        res.status(400).json({message: 'Permission Denied', data: null})
    }
}

exports.deliveryVoucher = function(req, res, next) {
    if (req.body.tokenIsAdmin == 1 || req.body.tokenUserId == req.params.userId) {
        voucherModel.deliveryVoucher(Number(req.params.userId), Number(req.params.voucherId), function(err, result) {
            if (err)
                res.status(400).json({message: err, data: null})
            else
                res.status(200).json({message: 'success', data: null})
        })
    } else {
        res.status(400).json({message: 'Permission Denied', data: null})
    }
}