const express = require('express');
const router = express.Router();
var authService = require('../controllers/auth');

// parent
var userController = require('../controllers/user');
var voucherController = require('../controllers/voucher');
var voucherTypeController = require('../controllers/voucher_type');

router.route('/login')
.post(userController.login);

router.route('/userInfo')
.get(authService.verifyToken, userController.userinfo);

router.route('/logout')
.get(authService.verifyToken, userController.logout);

router.route('/users')
.post(userController.addUser)
.get(authService.verifyToken, userController.getMerchantList);

router.route('/users/:userId')
.post(authService.verifyToken, userController.updateUser)
.delete(authService.verifyToken, userController.deleteUser);

router.route('/users/:userId/voucherTypes')
.post(authService.verifyToken, voucherTypeController.addVoucherType)
.get(authService.verifyToken, voucherTypeController.getVoucherTypeList);

router.route('/users/:userId/voucherTypes/:voucherTypeId')
.get(authService.verifyToken, voucherTypeController.getVoucherTypeById)
.post(authService.verifyToken, voucherTypeController.updateVoucherType)
.delete(authService.verifyToken, voucherTypeController.deleteVoucherType);

router.route('/vouchers/')
.post(voucherController.addVoucher);

router.route('/vouchers/:voucherId')
.post(authService.verifyToken, voucherController.updateVoucher);

router.route('/users/:userId/vouchers')
.get(authService.verifyToken, voucherController.getVoucherList);

router.route('/users/:userId/vouchers/:voucherId')
.delete(authService.verifyToken, voucherController.deleteVoucher);

router.route('/test')
.get(voucherController.testQRCODE);

module.exports = router;
