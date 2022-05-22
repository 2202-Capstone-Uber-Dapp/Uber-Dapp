const {
  driver: { DRIVER, CAN_ACCEPT_RIDE, ABLE_TO_ACCEPT_RIDE },
  rider: { RIDER, REQUEST_RIDE },
} = require('./commons');
const Connection = require('./Connection');

class DriverEventHandler extends Connection {
  constructor(io, socket, user) {
    super(io, socket, user);

    socket.on(ABLE_TO_ACCEPT_RIDE, (rideRequest) =>
      this.driverCanAcceptRide(rideRequest)
    );
  }

  driverCanAcceptRide(rideRequest) {}
}

module.exports = DriverEventHandler;
