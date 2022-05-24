const {
  driver: { DRIVER, CAN_ACCEPT_RIDE, ABLE_TO_ACCEPT_RIDE },
  rider: { RIDER, REQUEST_RIDE },
} = require('./eventCommons');
const Connection = require('./Connection');

class DriverEventHandler extends Connection {
  constructor(io, socket, user) {
    super(io, socket, user);
    socket.on('DECLINE_RIDE', (message) => this.declineRide(message));

    console.log('Finished connecting as a driver...');
  }
  declineRide(message) {
    this.io.sockets
      .to(message.riderSocketId)
      .emit('DRIVER_DECLINE_RIDE', message);
  }
}

module.exports = DriverEventHandler;
