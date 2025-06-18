const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ChiTietDonHang = sequelize.define('chitietdonhang', {
    chiTietDonHangId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    donHangId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'donhang', // Tên bảng người dùng
            key: 'donHangId' // Khóa chính của bảng người dùng
        },
        onDelete: 'CASCADE', // Thêm CASCADE ở đây
        onUpdate: 'CASCADE'
    },
    sachId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'sach', // Tên bảng người dùng
            key: 'sachId' // Khóa chính của bảng người dùng
        },
        onDelete: 'SET NULL', // Thêm CASCADE ở đây
        onUpdate: 'CASCADE'
    },
    donGia: {type: Sequelize.DOUBLE, allowNull: false},
    soLuong: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 1}
}, {
    tableName: 'chitietdonhang' // Chỉ định tên bảng chính xác
});

module.exports = ChiTietDonHang;