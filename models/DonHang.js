const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const DonHang = sequelize.define('donhang', {
    donHangId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        autoIncrement: true, // Thêm autoIncrement
        primaryKey: true
    },
    ngayDat: {type: Sequelize.DATE},
    nhanVienId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'nhanvien', // Tên bảng người dùng
            key: 'nhanVienId' // Khóa chính của bảng người dùng
        },
        onDelete: 'SET NULL', // Thêm CASCADE ở đây
        onUpdate: 'CASCADE'
    },
    khachHangId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'khachhang', // Tên bảng người dùng
            key: 'khachHangId' // Khóa chính của bảng người dùng
        },
        onDelete: 'SET NULL', // Thêm CASCADE ở đây
        onUpdate: 'CASCADE'
    },
    tenKhachHang: {type: Sequelize.STRING, allowNull: true},
    sdt: {type: Sequelize.STRING, allowNull: true},
    diaChiNhanHang: {type: Sequelize.STRING, allowNull: true},
    tongTien: {type: Sequelize.DOUBLE},
    hinhThucThanhToan: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'COD' // Mặc định là thanh toán khi nhận hàng
    },
    trangThai: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending' // Mặc định là đang chờ xử lý
    },
    ghiChu: {type: Sequelize.STRING}
}, {
    tableName: 'donhang' // Chỉ định tên bảng chính xác
});

module.exports = DonHang;