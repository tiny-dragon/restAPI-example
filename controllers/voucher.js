var voucherModel = require('../models/voucher');

exports.addVoucher = function (req, res, next) {
    if (req.body.voucher_type_id && req.body.customer_email) {
        voucherModel.addVoucher(req.body.voucher_type_id, req.body.customer_email, function(err, result) {
            if (err)
                res.status(400).json({message: err, data: null});
            else {
                res.status(200).json({
                    message : 'success',
                    data    : result
                });
            }
        });
    }else {
        res.status(400).json({message: 'Wrong Input Voucher Info.', data: null});
    }
};

exports.testQRCODE = function (req, res, next) {
    voucherModel.testQrcode(req.query.key, function(err, result) {
        res.status(200).json({
            message : 'success',
            data    : result
        });
    });
};

exports.getVoucherList = function(req, res, next) {
    if (req.body.tokenUserId == req.params.userId) {
        voucherModel.getVoucherList(req.body.tokenUserId, function(err, result) {
            if (err)
                res.status(400).json({message: err, data: null});
            else
                res.status(200).json({
                    message : 'success',
                    data    : {
                        voucher_list : result
                    }
                });
        });
    }else {
        res.status(400).json({message: 'Permission Denied', data: null});
    }
};

exports.updateVoucher = function(req, res, next) {
    if (req.body.tokenUserId == req.params.userId) {
        voucherModel.updateVoucher(Number(req.params.userId), Number(req.params.voucherId), req.body, function(err, result) {
            if (err)
                res.status(400).json({message: err, data: null});
            else
                res.status(200).json({
                    message : 'success',
                    data    : {
                        voucher_id : result
                    }
                });
        });
    }else {
        res.status(400).json({message: 'Permission Denied', data: null});
    }
};

exports.deleteVoucher = function(req, res, next) {
    if (req.body.tokenUserId == req.params.userId) {
        voucherModel.deleteVoucher(Number(req.params.userId), Number(req.params.voucherId), function(err, result) {
            if (err)
                res.status(400).json({message: err, data: null});
            else
                res.status(200).json({message: 'success', data: null});
        });
    } else {
        res.status(400).json({message: 'Permission Denied', data: null});
    }
}