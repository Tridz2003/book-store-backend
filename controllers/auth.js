const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const NguoiDung = require('../models/NguoiDung');
const KhachHang = require('../models/KhachHang');
const NhanVien = require('../models/NhanVien');
const { where } = require('sequelize');

exports.postSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Loi cu phap.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const role = req.body.role || 'User'; // 'User' or 'Admin'
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const nguoidung = new NguoiDung({
        hoTen: name,
        email: email,
        password: hashedPw,
        vaiTro: role
      });
      return nguoidung.save();
    })
    .then(result => {
        if (role === 'User') {
            const khachhang = new KhachHang({
            nguoiDungId: result.nguoiDungId
            });
            return khachhang.save();
        } else if (role === 'Admin') {
            const nhanvien = new NhanVien({
            nguoiDungId: result.nguoiDungId,
            });
            return nhanvien.save();
        }
        return result;
    })
    .then(result => {
      res.status(201).json({ message: 'Nguoi dung da duoc tao thanh cong!', nguoiDungId: result.nguoiDungId });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedNguoiDung;
  NguoiDung.findOne({where: { email: email }})
    .then(nguoidung => {
      if (!nguoidung) {
        const error = new Error('Nguoi dung khong ton tai.');
        error.statusCode = 401;
        throw error;
      }
      loadedNguoiDung = nguoidung;
      return bcrypt.compare(password, nguoidung.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Sai email hoac mat khau!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedNguoiDung.email,
          nguoiDungId: loadedNguoiDung.nguoiDungId.toString(),
          vaiTro: loadedNguoiDung.vaiTro // 'User' or 'Admin'
        },
        'somesupersecretsecret',
        { expiresIn: '12h' }
      );
      res.status(200).json({
        token: token,
        nguoiDungId: loadedNguoiDung.nguoiDungId.toString(),
        vaiTro: loadedNguoiDung.vaiTro // 'User' or 'Admin'
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
