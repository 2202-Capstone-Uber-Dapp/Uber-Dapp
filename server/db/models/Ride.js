const { Sequelize } = require("sequelize");
const db = require("../db");

const Ride = db.define("ride", {
  cost: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1, 
    },
  },
  distance: {
    type: Sequelize.INTEGER, //miles
  },
  duration: {
    type: Sequelize.INTEGER, // minutes
  },

  isCompleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Ride;
