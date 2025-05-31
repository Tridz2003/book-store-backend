const jwt = require('jsonwebtoken');

exports.isAuth  = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        const error = new Error('Khong duoc xac thuc.');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somesupersecretsecret');
    } catch(err) {
        err.statusCode = 500;
        throw err;
    }   
    if(!decodedToken){
        const error = new Error('Khoong duoc xac thuc.');
        error.statusCode = 401;
        throw error;
    }
    req.nguoiDungId = decodedToken.nguoiDungId;
    req.vaiTro = decodedToken.vaiTro; // 'User' or 'Admin'
    next();
}

// Middleware kiểm tra quyền Admin
exports.isAdmin = (req, res, next) => {
    if (req.vaiTro !== 'Admin') {
        const error = new Error('Khong co quyen truy cap. Can quyen Admin.');
        error.statusCode = 403;
        throw error;
    }
    next();
}