const admin = require('../auth/firebase-config');
const {
  models: { User },
} = require('../db');

const { sessionMiddleware, wrap } = require('./serverController');
const authSocket = require('./authSocket');
const messages = new Set();
const request = new Set();
const userRoom = new Map();

const messageExpirationTimeMS = 5 * 60 * 1000;

const DRIVER = 'DRIVER';
const RIDER = 'RIDER';

class Connection {
  constructor(io, socket, user) {
    this.socket = socket;
    this.io = io;
    this.user = user;
    this.findUser(user, socket);
    console.log('Made a connection');
    socket.on('getMessages', () => this.getMessages());
    socket.on('message', (value) => this.handleMessage(value));
    socket.on('requestRide', (location) => this.requestRide(location));
    socket.on('disconnect', () => this.disconnect());
    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  findUser(user, socket) {
    const currentRoom = userRoom.get(user);
    if (!currentRoom) {
      userRoom.set(user.user_id, user.role);
      socket.join(user.role);
    } else {
      socket.join(currentRoom);
    }
  }

  requestRide(location) {
    const header = {
      socketId: this.socket.id,
      location,
    };
    this.io.sockets.in(DRIVER).emit('needRide', header);
  }

  sendMessage(message) {
    this.io.sockets.emit('message', message);
  }

  getMessages() {
    messages.forEach((message) => this.sendMessage(message));
  }

  handleMessage(value) {
    const message = {
      user: userRoom.get(this.socket) || defaultUser,
      value,
      time: Date.now(),
    };

    messages.add(message);
    this.sendMessage(message);

    setTimeout(() => {
      messages.delete(message);
      this.io.sockets.emit('deleteMessage', message.id);
    }, messageExpirationTimeMS);
  }

  disconnect() {
    console.log('disconnecting');
    userRoom.delete(this.user.user_id);
  }
}

function IO(io) {
  io.use(wrap(sessionMiddleware));
  // io.use(authSocket);

  io.on('connection', async (socket) => {
    const user = await User.findByPk(socket.request.session.user_id);
    if (user) new Connection(io, socket, user);
  });
}

module.exports = IO;
