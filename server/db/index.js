const db = require('./db');
const User = require('./models/User');
const Ride = require("./models/Ride")

//associations could go here!

Ride.belongsTo(User, { as: "driver" })
Ride.belongsTo(User, { as: "rider" })


module.exports = {
  db,
  models: {
    User,
    Ride,
  },
}
