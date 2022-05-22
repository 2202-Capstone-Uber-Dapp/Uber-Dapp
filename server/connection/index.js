const DriverEventHandler = require('./DriverEventHandler');
const RiderEventHandler = require('./RiderEventHandler');

const {
  driver: { DRIVER },
  rider: { RIDER },
} = require('./commons');
module.exports = { DriverEventHandler, RiderEventHandler, DRIVER, RIDER };
