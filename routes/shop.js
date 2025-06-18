const express = require('express');
const { body, check } = require('express-validator');

const sachController = require('../controllers/sach');
const shopController = require('../controllers/shop');
const { isAuth } = require('../middlewares/is-auth');

const router = express.Router();

// GET /shop/sachs - Lấy danh sách sách (tất cả người dùng)
router.get('/sachs', sachController.getSachs);

// GET /shop/sach/:sachId - Xem chi tiết sách (tất cả người dùng)
router.get('/sach/:sachId', sachController.getSach);

// GET /shop/don-hang - Lấy danh sách đơn hàng của người dùng (tất cả người dùng)
router.get('/don-hang', isAuth, shopController.getDonHang);

// POST /shop/add-gio-hang - Thêm sách vào giỏ hàng (tất cả người dùng)
router.post('/add-gio-hang', isAuth,
    [
        body('sachId')
        .isInt({ min: 1 })
        .withMessage('SachId phai la so nguyen duong'),
        body('soLuong')
        .isInt({ min: 1})
        .withMessage('So luong phai lon hon 0'),
    ],
    shopController.addGioHang)

// GET /shop/gio-hang - Lấy giỏ hàng của người dùng (tất cả người dùng)
router.get('/gio-hang', isAuth, shopController.getGioHang);

router.post('/dat-hang', isAuth, shopController.datHang);

module.exports = router;
