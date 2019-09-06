const express = require('express');
const router = express.Router();
var authService = require('../controllers/auth');

// parent
var userController = require('../controllers/user');
var voucherController = require('../controllers/voucher');
var voucherTypeController = require('../controllers/voucher_type');
var analysisController = require('../controllers/analysis');

router.route('/qr/:qrKey')
.get(voucherController.getQrCode);

router.route('/qrv/:qrKey')
.get(voucherController.verifyQrCode);

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
.get(authService.verifyToken, userController.getUserInfoById)
.post(authService.verifyToken, userController.updateUser)
.delete(authService.verifyToken, userController.deleteUser);

router.route('/users/:userId/changePassword')
.post(authService.verifyToken, userController.changePassword);

router.route('/users/:userId/voucherTypes')
.post(authService.verifyToken, voucherTypeController.addVoucherType)
.get(authService.verifyToken, voucherTypeController.getVoucherTypeList);

router.route('/voucherTypesAll')
.get(authService.verifyToken, voucherTypeController.getVoucherTypeListAll);

router.route('/users/:userId/voucherTypes/:voucherTypeId')
.get(authService.verifyToken, voucherTypeController.getVoucherTypeById)
.post(authService.verifyToken, voucherTypeController.updateVoucherType)
.delete(authService.verifyToken, voucherTypeController.deleteVoucherType);

router.route('/vouchersAll')
.get(authService.verifyToken, voucherController.getVoucherListAll);

router.route('/users/:userId/vouchers')
.post(authService.verifyToken, voucherController.addVoucher)
.get(authService.verifyToken, voucherController.getVoucherList);

router.route('/users/:userId/vouchers/:voucherId')
.get(authService.verifyToken, voucherController.getVoucherById)
.post(authService.verifyToken, voucherController.updateVoucher)
.delete(authService.verifyToken, voucherController.deleteVoucher);

router.route('/users/:userId/vouchers/:voucherId/delivery')
.post(authService.verifyToken, voucherController.deliveryVoucher);

router.route('/analysis/:fromDate/:toDate')
.get(authService.verifyToken, analysisController.dashboard);

module.exports = router;
