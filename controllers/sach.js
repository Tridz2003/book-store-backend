const { validationResult } = require('express-validator');
const { Op } = require('sequelize'); // Thêm Op để tìm kiếm linh hoạt
const Sach = require('../models/Sach');

// Thêm sách mới (chỉ Admin)
exports.addSach = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Loi cu phap.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const ten = req.body.ten;
    const tacGia = req.body.tacGia;
    const theLoai = req.body.theLoai;
    const nhaXuatBan = req.body.nhaXuatBan;
    const namXuatBan = req.body.namXuatBan;
    const soLuong = req.body.soLuong || 0;
    const donGia = req.body.donGia || 0;
    const moTa = req.body.moTa;
    const hinhAnh = req.file ? req.file.path : null; // Từ multer

    Sach.create({
        ten: ten,
        tacGia: tacGia,
        theLoai: theLoai,
        nhaXuatBan: nhaXuatBan,
        namXuatBan: namXuatBan,
        soLuong: soLuong,
        donGia: donGia,
        moTa: moTa,
        hinhAnh: hinhAnh
    })
    .then(result => {
        res.status(201).json({
            message: 'Sach da duoc them thanh cong!',
            sach: result,
            sachId: result.sachId
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

// Lấy tất cả sách
exports.getSachs = (req, res, next) => {
    Sach.findAll()
        .then(sachs => {
            res.status(200).json({
                message: 'Lay danh sach sach thanh cong!',
                sachs: sachs
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

// Lấy sách theo ID
exports.getSach = (req, res, next) => {
    const sachId = req.params.sachId;
    
    Sach.findByPk(sachId)
        .then(sach => {
            if (!sach) {
                const error = new Error('Khong tim thay sach.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message: 'Lay thong tin sach thanh cong!',
                sach: sach
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

// Tim kiếm sách (chỉ Admin)
exports.findSach = (req, res, next) => {
    const searchQuery = req.query.search;
    if(!searchQuery || searchQuery.length === 0){
        return Sach.findAll()
        .then(sachs => {
            res.status(200).json({
                message: 'Lay danh sach sach thanh cong!',
                sachs: sachs,
                total: sachs.length
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    }
    Sach.findAll({where: {
                [Op.or]: [
                { ten: { [Op.like]: `%${searchQuery}%` } },
                { tacGia: { [Op.like]: `%${searchQuery}%` } },
                { theLoai: { [Op.like]: `%${searchQuery}%` } },
                { nhaXuatBan: { [Op.like]: `%${searchQuery}%` } }
            ]
        }
    })
    .then(sachs => {
        res.status(200).json({
            message: sachs.length > 0 
                ? `Tim thay ${sachs.length} sach phu hop!` 
                : 'Khong tim thay sach nao phu hop!',
            sachs: sachs,
            searchQuery: searchQuery,
            total: sachs.length
        });
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
            next(err);
        }
    })
}

// Cập nhật sách (chỉ Admin)
exports.updateSach = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Loi cu phap.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const sachId = req.params.sachId;
    const ten = req.body.ten;
    const tacGia = req.body.tacGia;
    const theLoai = req.body.theLoai;
    const nhaXuatBan = req.body.nhaXuatBan;
    const namXuatBan = req.body.namXuatBan;
    const soLuong = req.body.soLuong;
    const donGia = req.body.donGia;
    const moTa = req.body.moTa;
    let hinhAnh = req.body.hinhAnh;

    if (req.file) {
        hinhAnh = req.file.path;
    }

    Sach.findByPk(sachId)
        .then(sach => {
            if (!sach) {
                const error = new Error('Khong tim thay sach.');
                error.statusCode = 404;
                throw error;
            }
            sach.ten = ten;
            sach.tacGia = tacGia;
            sach.theLoai = theLoai;
            sach.nhaXuatBan = nhaXuatBan;
            sach.namXuatBan = namXuatBan;
            sach.soLuong = soLuong;
            sach.donGia = donGia;
            sach.moTa = moTa;
            sach.hinhAnh = hinhAnh;
            return sach.save();
        })
        .then(result => {
            res.status(200).json({
                message: 'Cap nhat sach thanh cong!',
                sach: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

// Xóa sách (chỉ Admin)
exports.deleteSach = (req, res, next) => {
    const sachId = req.params.sachId;
    
    Sach.findByPk(sachId)
        .then(sach => {
            if (!sach) {
                const error = new Error('Khong tim thay sach.');
                error.statusCode = 404;
                throw error;
            }
            return Sach.destroy({ where: { sachId: sachId } });
        })
        .then(result => {
            res.status(200).json({
                message: 'Xoa sach thanh cong!'
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};