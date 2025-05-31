const NguoiDung = require('./NguoiDung');
const KhachHang = require('./KhachHang');
const NhanVien = require('./NhanVien');

// Thiết lập mối quan hệ 1:1
// Một NguoiDung có thể là một KhachHang
NguoiDung.hasOne(KhachHang, {
    foreignKey: 'nguoiDungId',
    sourceKey: 'nguoiDungId',
    onDelete: 'CASCADE', // Khi xóa NguoiDung thì xóa luôn KhachHang
    onUpdate: 'CASCADE'
});

KhachHang.belongsTo(NguoiDung, {
    foreignKey: 'nguoiDungId',
    targetKey: 'nguoiDungId'
});

// Một NguoiDung có thể là một NhanVien
NguoiDung.hasOne(NhanVien, {
    foreignKey: 'nguoiDungId',
    sourceKey: 'nguoiDungId',
    onDelete: 'CASCADE', // Khi xóa NguoiDung thì xóa luôn NhanVien
    onUpdate: 'CASCADE'
});

NhanVien.belongsTo(NguoiDung, {
    foreignKey: 'nguoiDungId',
    targetKey: 'nguoiDungId'
});

module.exports = {
    NguoiDung,
    KhachHang,
    NhanVien
};