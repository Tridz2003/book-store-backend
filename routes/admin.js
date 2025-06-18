const express = require('express');
const { body } = require('express-validator');

const sachController = require('../controllers/sach');
const adminController = require('../controllers/admin');
const { isAuth, isAdmin } = require('../middlewares/is-auth');

const router = express.Router();

// POST /admin/add-sach - Thêm sách mới (chỉ Admin)
router.post('/add-sach',
    isAuth,
    isAdmin,
    [
        body('ten')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Ten sach khong duoc de trong'),
        body('donGia')
            .isFloat({ min: 0 })
            .withMessage('Don gia phai la so duong'),
        body('soLuong')
            .isInt({ min: 0 })
            .withMessage('So luong phai la so nguyen duong')
    ],
    sachController.addSach
);

// GET /admin/sachs - Lấy danh sách tất cả sách (chỉ Admin)
router.get('/sachs', isAuth, isAdmin, sachController.getSachs);

// GET /admin/sach/:sachId - Lấy thông tin sách theo ID (chỉ Admin)
router.get('/sach/:sachId', isAuth, isAdmin, sachController.getSach);

// PUT /admin/update-sach/:sachId - Cập nhật sách (chỉ Admin)
router.put('/update-sach/:sachId',
    isAuth,
    isAdmin,
    [
        body('ten')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Ten sach khong duoc de trong'),
        body('tacGia')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Tac gia khong duoc de trong'),
        body('theLoai')
            .trim()
            .isLength({ min: 1 })
            .withMessage('The loai khong duoc de trong'),
        body('donGia')
            .isFloat({ min: 0 })
            .withMessage('Don gia phai la so duong'),
        body('soLuong')
            .isInt({ min: 0 })
            .withMessage('So luong phai la so nguyen duong')
    ],
    sachController.updateSach
);

// DELETE /admin/delete-sach/:sachId - Xóa sách (chỉ Admin)
router.delete('/delete-sach/:sachId', isAuth, isAdmin, sachController.deleteSach);

// GET /admin/find-sach - Tìm kiếm sách (chỉ Admin)
router.get('/find-sach', isAuth, isAdmin, sachController.findSach);

// POST /admin/ban-hang - Thêm đơn hàng (chỉ Admin)
router.post('/ban-hang', isAuth, isAdmin, adminController.addDonHang);

// GET /admin/don-hang - Lấy danh sác h đơn hàng (chỉ Admin)
// router.get('/don-hang', isAuth, isAdmin, donHangController.getDonHangs);

// PUT /admin/update-don-hang/:donHangId - Cập nhật đơn hàng (chỉ Admin)
router.put('/update-don-hang/:donHangId',
    isAuth,
    isAdmin,
    [
        body('trangThai')
            .trim()
            .isIn(['pending', 'deliveried', 'cancelled'])
            .withMessage('Trang thai khong hop le')
    ],
    adminController.updateDonHang
);

router.delete('/delete-don-hang/:donHangId', isAuth, isAdmin, adminController.deleteDonHang);


module.exports = router;