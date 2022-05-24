const {
  models: { User },
} = require('../db');

const { sessionMiddleware, wrap } = require('./serverController');
const {
  DriverEventHandler,
  RiderEventHandler,
  DRIVER,
  RIDER,
} = require('../connection');

function SocketIOController(io) {
  io.use(wrap(sessionMiddleware));

  io.on('connection', async (socket) => {
    console.log('Socket is connecting');
    const user = await User.findByPk(socket.request.session.user_id);
    if (user) {
      switch (user.role) {
        case DRIVER:
          new DriverEventHandler(io, socket, user);
          break;
        case RIDER:
          new RiderEventHandler(io, socket, user);
          break;
      }
    }
  });
}

module.exports = SocketIOController;
