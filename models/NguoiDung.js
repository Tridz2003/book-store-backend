const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const NguoiDung = sequelize.define('nguoidung', {
    nguoiDungId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    hoTen: {type: Sequelize.STRING},
    sdt: {type: Sequelize.STRING},
    email: {type: Sequelize.STRING},
    password: {type: Sequelize.STRING},
    ngaySinh: {type: Sequelize.DATE},
    diaChi: {type: Sequelize.STRING},
    gioiTinh: {type: Sequelize.STRING},
    vaiTro: {
        type: Sequelize.STRING,
        defaultValue: 'user' // Mặc định là người dùng
    },
}, {
    tableName: 'nguoidung' // Chỉ định tên bảng chính xác
})

module.exports = NguoiDung;