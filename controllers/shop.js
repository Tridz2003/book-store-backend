const GioHang = require('../models/GioHang');
const Sach = require('../models/Sach');
const KhachHang = require('../models/KhachHang');
const DonHang = require('../models/DonHang');
const ChiTietDonHang = require('../models/ChiTietDonHang');
const { validationResult } = require('express-validator');
const e = require('express');

exports.getDonHang = async (req, res, next) => {
    try{
        const nguoiDungId = req.nguoiDungId;
        const khachhang = await KhachHang.findOne({ where: { nguoiDungId: nguoiDungId } });
        if (!khachhang) {
            const error = new Error('Ban khong phai la khach hang hoac chua dang ky thong tin khach hang.');
            error.statusCode = 403;
            throw error;
        }
        const donHang = await DonHang.findAll({
            where: {
                khachHangId: khachhang.khachHangId
            },
            include: [{
                model: ChiTietDonHang,
                include: [{
                    model: Sach
                }]
            }],
            order: [['ngayDat', 'DESC']]
        });
        res.status(200).json({
            message: 'Lay danh sach don hang thanh cong!',
            donhangs: donHang
        });
    } catch (err) {
        console.error('Error in getDonHang:', err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.addGioHang = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const nguoiDungId = req.nguoiDungId;
        const sachId = parseInt(req.body.sachId);
        const soLuong = parseInt(req.body.soLuong) || 1;

        // ✅ Bước 1: Tìm khách hàng
        const khachhang = await KhachHang.findOne({ where: { nguoiDungId: nguoiDungId } });
        if (!khachhang) {
            const error = new Error('Ban khong phai la khach hang hoac chua dang ky thong tin khach hang.');
            error.statusCode = 403;
            throw error;
        }
        const khachHangId = khachhang.khachHangId;

        // ✅ Bước 2: Kiểm tra sách
        const sach = await Sach.findByPk(sachId);
        if (!sach) {
            const error = new Error('Sach khong ton tai.');
            error.statusCode = 404;
            throw error;
        }

        if (sach.soLuong < soLuong) {
            const error = new Error(`Chi con ${sach.soLuong} sach trong kho.`);
            error.statusCode = 400;
            throw error;
        }

        // ✅ Bước 3: Tìm hoặc tạo giỏ hàng
        let giohang = await GioHang.findOne({
            where: {
                khachHangId: khachHangId,
                sachId: sachId
            }
        });
        console.log('Gio hang:', giohang);

        if (giohang) {
            // Cập nhật số lượng
            const newQuantity = soLuong;
            giohang.soLuong = newQuantity;
            await giohang.save();
        } else {
            // Tạo mới
            giohang = await GioHang.create({
                khachHangId: khachHangId,
                sachId: sachId,
                soLuong: soLuong
            });
        }

        res.status(201).json({
            message: 'Them sach vao gio hang thanh cong.',
            gioHang: {
                gioHangId: giohang.gioHangId,
                khachHangId: giohang.khachHangId,
                sachId: giohang.sachId,
                soLuong: giohang.soLuong,
                createdAt: giohang.createdAt,
                updatedAt: giohang.updatedAt
            }
        });

    } catch (err) {
        console.error('Error in addGioHang:', err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getGioHang = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const nguoiDungId = req.nguoiDungId;

        // ✅ Bước 1: Tìm khách hàng
        const khachhang = await KhachHang.findOne({ where: { nguoiDungId: nguoiDungId } });
        if (!khachhang) {
            const error = new Error('Ban khong phai la khach hang hoac chua dang ky thong tin khach hang.');
            error.statusCode = 403;
            throw error;
        }
        const khachHangId = khachhang.khachHangId;

        // ✅ Bước 3: Tìm hoặc tạo giỏ hàng
        let giohangs = await GioHang.findAll({
            where: {
                khachHangId: khachHangId
            },
            include: [{
                model: Sach,
                attributes: ['sachId', 'ten', 'donGia', 'hinhAnh', 'soLuong']
            }]
        });
        console.log('Gio hang:', giohangs);

        res.status(201).json({
            message: 'Lay gio hang thanh cong.',
            giohangs: giohangs
        });

    } catch (err) {
        console.error('Error in addGioHang:', err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.datHang = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const nguoiDungId = req.nguoiDungId;

        // ✅ Bước 1: Tìm khách hàng
        const khachhang = await KhachHang.findOne({ where: { nguoiDungId: nguoiDungId } });
        if (!khachhang) {
            const error = new Error('Ban khong phai la khach hang hoac chua dang ky thong tin khach hang.');
            error.statusCode = 403;
            throw error;
        }
        const khachHangId = khachhang.khachHangId;

        // ✅ Bước 2: Tìm giỏ hàng của khách hàng
        let giohangs = await GioHang.findAll({
            where: {
                khachHangId: khachHangId
            }
        });

        if (giohangs.length === 0) {
            const error = new Error('Gio hang cua ban rong. Khong the dat hang.');
            error.statusCode = 400;
            throw error;
        }

        // ✅ Bước 3: Xử lý đặt hàng
        // (Giả sử bạn sẽ xử lý thanh toán và lưu đơn hàng ở đây)
        const donHang = await DonHang.create({
            khachHangId: khachHangId,
            ngayDat: new Date(),
            tongTien: req.body.tongTien, // Tổng tiền từ giỏ hàng
            tenKhachHang: req.body.tenKhachHang,
            sdt: req.body.sdt,
            ghiChu: req.body.ghiChu,
            diaChiNhanHang: req.body.diaChiNhanHang,
            hinhThucThanhToan: req.body.phuongThucThanhToan, // 'COD', 'Online', etc.
            trangThai: 'pending' // Hoặc trạng thái khác tùy ý
        });

        const chiTietDonHang = req.body.chiTietDonHang.map(item => ({
            ...item,
            donHangId: donHang.donHangId
        }));

        await ChiTietDonHang.bulkCreate(chiTietDonHang);
        // Xóa giỏ hàng sau khi đặt hàng thành công
        await GioHang.destroy({
            where: {
                khachHangId: khachHangId
            }
        });

        res.status(201).json({
            message: 'Dat hang thanh cong.'
        });

    } catch (err) {
        console.error('Error in datHang:', err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}