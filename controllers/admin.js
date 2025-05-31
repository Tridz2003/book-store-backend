const DonHang = require('../models/DonHang');
const { validationResult } = require('express-validator');

exports.addDonHang = (req, res, next) => {
    const nhanVienId = req.nguoiDungId; // Lấy ID nhân viên từ token
    const tenKhachHang = req.body.tenKhachHang;
    const sdt = req.body.sdt;
    const ghiChu = req.body.ghiChu;
    const phuongThucThanhToan = req.body.phuongThucThanhToan || 'COD'; // Mặc định là COD
    const trangThai = 'deliveried'; // Mặc định là đã nhận hàng
    const tongTien = req.body.tongTien || 0; // Mặc định là 0 nếu không có

    const donhang = new DonHang({
        nhanVienId: nhanVienId,
        ngayDat: new Date(),
        tenKhachHang: tenKhachHang,
        sdt: sdt,
        ghiChu: ghiChu,
        hinhThucThanhToan: phuongThucThanhToan,
        trangThai: trangThai,
        tongTien: tongTien
    });

    return donhang.save()
        .then(result => {
            res.status(201).json({
                message: 'Đơn hàng đã được tạo thành công!',
                donHang: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.updateDonHang = (req, res, next) => {
    const donHangId = req.params.donHangId;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Loi cu phap.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const trangThai = req.body.trangThai;
    return DonHang.findByPk(donHangId)
        .then(donhang => {
            if(!donhang){
                const error = new Error('Khong tim thay don hang.');
                error.statusCode = 404;
                throw error;
            }
            donhang.trangThai = trangThai;
            return donhang.save();
        })
        .then(result => {
            res.status(200).json({
                message: 'Cap nhat trang thai don hang thanh cong!',
                donHang: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.deleteDonHang = (req, res, next) => {
    const donHangId = req.params.donHangId;
    return DonHang.findByPk(donHangId)
        .then(donhang => {
            if(!donhang){
                const error = new Error('Khong tim thay don hang.');
                error.statusCode = 404;
                throw error;
            }
            return donhang.destroy();
        })
        .then(result => {
            res.status(200).json({
                message: 'Xoa don hang thanh cong!'
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}