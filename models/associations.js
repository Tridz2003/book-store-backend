const GioHang = require('./GioHang');
const Sach = require('./Sach');
const KhachHang = require('./KhachHang');
const DonHang = require('./DonHang');
const ChiTietDonHang = require('./ChiTietDonHang');
const NguoiDung = require('./NguoiDung');
const NhanVien = require('./NhanVien');

// GioHang associations
GioHang.belongsTo(Sach, { foreignKey: 'sachId' });
GioHang.belongsTo(KhachHang, { foreignKey: 'khachHangId' });

// Sach associations
Sach.hasMany(GioHang, { foreignKey: 'sachId' });
Sach.hasMany(ChiTietDonHang, { foreignKey: 'sachId' });

// KhachHang associations
KhachHang.belongsTo(NguoiDung, { foreignKey: 'nguoiDungId' });
KhachHang.hasMany(GioHang, { foreignKey: 'khachHangId' });
KhachHang.hasMany(DonHang, { foreignKey: 'khachHangId' });

// DonHang associations
DonHang.belongsTo(KhachHang, { foreignKey: 'khachHangId' });
DonHang.belongsTo(NhanVien, { foreignKey: 'nhanVienId' });
DonHang.hasMany(ChiTietDonHang, { foreignKey: 'donHangId' });

// ChiTietDonHang associations
ChiTietDonHang.belongsTo(DonHang, { foreignKey: 'donHangId' });
ChiTietDonHang.belongsTo(Sach, { foreignKey: 'sachId' });

// NhanVien associations
NhanVien.belongsTo(NguoiDung, { foreignKey: 'nguoiDungId' });
NhanVien.hasMany(DonHang, { foreignKey: 'nhanVienId' });

// NguoiDung associations
NguoiDung.hasOne(KhachHang, { foreignKey: 'nguoiDungId' });
NguoiDung.hasOne(NhanVien, { foreignKey: 'nguoiDungId' });

module.exports = {
    GioHang,
    Sach,
    KhachHang,
    DonHang,
    ChiTietDonHang,
    NguoiDung,
    NhanVien
};