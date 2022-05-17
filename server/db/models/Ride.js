const { Sequelize } = require("sequelize")
const db = require("../db")

// defaults are empty immediately when user is created, should prob take user straight to profile page to edit
// bio could go string or text depending on if we want the user to give their life story

// Decimal degrees (DD): 41.40338, 2.17403
// Degrees, minutes, and seconds (DMS): 41°24'12.2"N 2°10'26.5"E
// Degrees and decimal minutes (DMM): 41 24.2028, 2 10.4418


const Ride = db.define("ride", {
  cost: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1, // 0?
    },
  },
  distanceTraveled: {
    type: Sequelize.INTEGER, //miles
  },
    estimatedTime: {
    type: Sequelize.INTEGER // minutes 
  },
  
  isCompleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});





// const Ride = db.define("ride", {
//   cost: {
//     type: Sequelize.INTEGER,
//     validate: {
//       min: 1, // 0?
//     },
//   },
//   distanceTraveled: {
//     type: Sequelize.DECIMAL(10, 2),
//   },
//   startPoint: {
//     type: Sequelize.STRING,
//     // type: Sequelize.GEOGRAPHY("POINT", 4326),
//   },
//   endPoint: {
//     type: Sequelize.STRING,
//     // type: Sequelize.GEOGRAPHY("POINT", 4326),
//   },
//   isCompleted: {
//     type: Sequelize.BOOLEAN,
//     defaultValue: false,
//   },
// })

module.exports = Ride
