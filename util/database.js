const Sequilize = require('sequelize');

const sequelize = new Sequilize('shop_db_2', 'root', '2003', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;