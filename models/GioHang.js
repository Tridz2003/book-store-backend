const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const GioHang = sequelize.define('giohang', {
    gioHangId: {
        type: Sequelize.INTEGER,
        autoIncrement: true, // Thêm autoIncrement để tự động tăng ID
        allowNull: false,
        primaryKey: true
    },
    khachHangId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'khachhang', // Tên bảng người dùng
            key: 'khachHangId' // Khóa chính của bảng người dùng
        },
        onDelete: 'CASCADE', // Thêm CASCADE ở đây
        onUpdate: 'CASCADE'
    },
    sachId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'sach', // Tên bảng người dùng
            key: 'sachId' // Khóa chính của bảng người dùng
        },
        onDelete: 'CASCADE', // Thêm CASCADE ở đây
        onUpdate: 'CASCADE'
    },
    soLuong: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 1}
}, {
    tableName: 'giohang' // Chỉ định tên bảng chính xác
});

module.exports = GioHang;