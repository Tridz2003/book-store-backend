const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const sequelize = require('./util/database');
require('./models/associations');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    const date = new Date().toISOString().replace(/:/g, '-');
    cb(null, date + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  ); res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))

app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

sequelize
  .sync()
  // .sync({ force: true }) // Xóa và tạo lại bảng mỗi lần khởi động ứng dụng
  .then(result => {
    console.log('Database synced successfully');
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

// app.listen(3000);