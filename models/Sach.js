const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Sach = sequelize.define('sach', {
    sachId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true // Thêm autoIncrement
    },
    ten: {type: Sequelize.STRING},
    tacGia: {type: Sequelize.STRING},
    theLoai: {type: Sequelize.STRING},
    nhaXuatBan: {type: Sequelize.STRING},
    namXuatBan: {type: Sequelize.INTEGER},
    soLuong: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0},
    donGia: {type: Sequelize.DOUBLE, allowNull: false, defaultValue: 0},
    moTa: {type: Sequelize.STRING},
    hinhAnh: {type: Sequelize.STRING}

}, {
    tableName: 'sach' // Chỉ định tên bảng chính xác
});

module.exports = Sach;