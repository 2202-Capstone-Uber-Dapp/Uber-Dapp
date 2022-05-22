const DriverEventHandler = require('./DriverEventHandler');
const RiderEventHandler = require('./RiderEventHandler');

const {
  driver: { DRIVER },
  rider: { RIDER },
} = require('./eventCommons');
module.exports = { DriverEventHandler, RiderEventHandler, DRIVER, RIDER };
