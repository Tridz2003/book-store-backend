const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const NhanVien = sequelize.define('nhanvien', {
    nhanVienId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nguoiDungId: {
        type: Sequelize.INTEGER,
        reference: {
            model: 'nguoidung', // Tên bảng người dùng
            key: 'nguoiDungId' // Khóa chính của bảng người dùng
        },
        onDelete: 'CASCADE', // Thêm CASCADE ở đây
        onUpdate: 'CASCADE'
    }
}, {
    tableName: 'nhanvien' // Chỉ định tên bảng chính xác
})

module.exports = NhanVien;