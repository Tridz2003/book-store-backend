const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const KhachHang = sequelize.define('khachhang', {
    khachHangId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nguoiDungId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'nguoidung', // Tên bảng người dùng
            key: 'nguoiDungId' // Khóa chính của bảng người dùng
        },
        onDelete: 'CASCADE', // Thêm CASCADE ở đây
        onUpdate: 'CASCADE'
    }
}, {
    tableName: 'khachhang' // Chỉ định tên bảng chính xác
})

module.exports = KhachHang;