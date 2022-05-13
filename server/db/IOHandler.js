const admin = require('../auth/firebase-config');
const {
  models: { User },
} = require('../db/');

const messages = new Set();
const users = new Map();

const messageExpirationTimeMS = 5 * 60 * 1000;

class Connection {
  constructor(io, socket, uid) {
    this.socket = socket;
    this.io = io;
    this.uid = uid;

    socket.on('getMessages', () => this.getMessages());
    socket.on('message', (value) => this.handleMessage(value));
    socket.on('disconnect', () => this.disconnect());
    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  sendMessage(message) {
    this.io.sockets.emit('message', message);
  }

  getMessages() {
    messages.forEach((message) => this.sendMessage(message));
  }

  handleMessage(value) {
    const message = {
      user: users.get(this.socket) || defaultUser,
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
    users.delete(this.socket);
  }
}

function IO(io) {
  io.use(authHandler);
  io.on('connection', (socket) => {
    new Connection(io, socket);
  });
}

async function authHandler(socket, next) {
  console.log(socket);
  const { token } = socket.handshake.query;

  try {
    const [authType, tokenValue] = token.trim().split(' ');
    if (authType !== 'Bearer') {
      throw new Error('Expected a Bearer token');
    }
    const decodeValue = await admin.auth().verifyIdToken(tokenValue);
    if (decodeValue && !users.has(decodeValue.user_id)) {
      const user = await User.findByPk(decodeValue.user_id);
      users.set(decodeValue.user_id, { role: user.role, location: '' });
    }
  } catch (e) {
    console.log(error);
  }

  next();
}
module.exports = IO;
