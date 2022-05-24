const {
  driver: { DRIVER, CAN_ACCEPT_RIDE, ABLE_TO_ACCEPT_RIDE },
  rider: { RIDER, REQUEST_RIDE, GET_ALL_DRIVER, REQUEST_RIDE_TO_DRIVER },
} = require('./eventCommons');
const Connection = require('./Connection');

class RiderEventHandler extends Connection {
  constructor(io, socket, user) {
    super(io, socket, user);
    socket.on(GET_ALL_DRIVER, () => this.getDriver());
    socket.on(REQUEST_RIDE, (location) => this.requestRide(location));
    socket.on(REQUEST_RIDE_TO_DRIVER, (driverSocket, message) =>
      this.sendRequestToDriver(driverSocket, message)
    );

    console.log('Finished connecting as a rider...');
  }

  sendRequestToDriver(driverSocket, message) {
    console.log('made it...');
    this.io.sockets.to(driverSocket).emit(CAN_ACCEPT_RIDE, message);
  }
  getDriver() {
    try {
      const driverList = [...this.socket.adapter.rooms.get(DRIVER)];
      this.socket.emit('DRIVER_LIST_RESPONSE', driverList);
    } catch {
      this.socket.emit('DRIVER_LIST_RESPONSE', []);
    }
  }
  requestRide(location) {
    const rideRequest = {
      socketId: this.socket.id,
      location,
    };
    console.log(this.socket.adapter.rooms.get(DRIVER));
    this.io.sockets.in(DRIVER).emit(CAN_ACCEPT_RIDE, rideRequest);
  }
}

module.exports = RiderEventHandler;
