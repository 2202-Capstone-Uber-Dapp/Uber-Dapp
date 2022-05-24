const {
  driver: { DRIVER, CAN_ACCEPT_RIDE, ABLE_TO_ACCEPT_RIDE },
  rider: { RIDER, REQUEST_RIDE, GET_ALL_DRIVER, REQUEST_RIDE_TO_DRIVER },
} = require('./eventCommons');
const Connection = require('./Connection');

class RiderEventHandler extends Connection {
  constructor(io, socket, user) {
    super(io, socket, user);
    this.driverList = [];
    socket.on(GET_ALL_DRIVER, () => this.getDriver());
    socket.on(REQUEST_RIDE, (location) => this.requestRide(location));
    socket.on(REQUEST_RIDE_TO_DRIVER, (message) =>
      this.sendRequestToDriver(message)
    );

    console.log('Finished connecting as a rider...');
  }

  sendRequestToDriver(message) {
    console.log('made it...');
    if (this.driverList.length) {
      this.io.sockets
        .to(this.driverList.shift())
        .emit(CAN_ACCEPT_RIDE, message);
    } else {
      this.socket.emit('NO_DRIVER_AVALIABLE');
    }
  }
  getDriver() {
    try {
      this.driverList = [...this.socket.adapter.rooms.get(DRIVER)];
      this.socket.emit('DRIVER_LIST_RESPONSE');
    } catch {
      this.socket.emit('DRIVER_LIST_RESPONSE');
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
