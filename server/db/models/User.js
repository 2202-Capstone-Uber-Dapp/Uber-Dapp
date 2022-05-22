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
  profileImage: {
    type: Sequelize.STRING,
    defaultValue: "https://media.istockphoto.com/vectors/default-avatar-photo-placeholder-profile-icon-vector-id1313110704?k=20&m=1313110704&s=612x612&w=0&h=rcF1_ukINlcPVY1JYkyYkTkbvET4E3jEslCgxeda11Y="
  }
});

module.exports = User;
