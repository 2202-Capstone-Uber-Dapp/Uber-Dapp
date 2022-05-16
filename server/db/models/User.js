const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  user_id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: true,
  },
  role: {
    type: Sequelize.ENUM('RIDER', 'DRIVER'),
    defaultValue: 'RIDER',
  },
  wallet: {
    type: Sequelize.STRING,
  },
});

module.exports = User;
