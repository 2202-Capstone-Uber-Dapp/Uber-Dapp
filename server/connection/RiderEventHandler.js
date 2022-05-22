const {
  driver: { DRIVER, CAN_ACCEPT_RIDE, ABLE_TO_ACCEPT_RIDE },
  rider: { RIDER, REQUEST_RIDE },
} = require('./commons');
const Connection = require('./Connection');

class RiderEventHandler extends Connection {
  constructor(io, socket, user) {
    super(io, socket, user);

    socket.on(REQUEST_RIDE, (location) => this.requestRide(location));

    console.log('Finished connecting as a rider...');
  }

  requestRide(location) {
    const rideRequest = {
      socketId: this.socket.id,
      location,
    };
    this.io.sockets.in(DRIVER).emit(CAN_ACCEPT_RIDE, rideRequest);
  }
}

module.exports = RiderEventHandler;
