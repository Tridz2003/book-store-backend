const express = require('express');
const { body, check } = require('express-validator'); // Bỏ '/check'
const NguoiDung = require('../models/NguoiDung');

const authController = require('../controllers/auth');
const router = express.Router();

router.put('/signup', 
    [
        check('email').custom((value, {req}) => {
            if (!value.trim().endsWith('@gmail.com')) {
                throw new Error('Email phai ket thuc bang @gmail.com');
            }
            return NguoiDung.findOne({where: {email: value}}) // Thêm where clause
                .then(nguoidung => {
                    if(nguoidung){
                        return Promise.reject('Email da ton tai');
                    }
                })
        }),
        body('password', 'Mat khai phai co it nhat 5 ky tu va chi chua chu so').trim()
        .isLength({min: 5}).isAlphanumeric(),
        body('confirmPassword').custom((value, {req}) => {
            if(value !== req.body.password){
                throw new Error("Mat khau khong khop");
            }
            return true;
        })
    ],
    authController.postSignup);

router.post('/login', authController.login);

module.exports = router;