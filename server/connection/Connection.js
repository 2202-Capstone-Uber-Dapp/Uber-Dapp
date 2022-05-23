const CONNECT_ERROR = 'connect_error';
const DISCONNECT = 'disconnect';

const request = new Set();
const userRoom = new Map();

class Connection {
  constructor(io, socket, user) {
    this.socket = socket;
    this.io = io;
    this.user = user;
    this.addUserToRoom(user, socket);

    console.log('Made a connection...');

    socket.on(DISCONNECT, () => this.disconnect());
    socket.on(CONNECT_ERROR, (err) => connectError(err));
  }

  addUserToRoom(user, socket) {
    const currentRoom = userRoom.get(user);
    if (!currentRoom) {
      userRoom.set(user.user_id, user.role);
      socket.join(user.role);
    } else {
      socket.join(currentRoom);
    }
  }

  setRoom(room) {
    userRoom(this.user.user_id, room);
  }

  connectError(err) {
    console.log(`connect_error due to ${err.message}`);
  }

  disconnect() {
    console.log('disconnecting');
    userRoom.delete(this.user.user_id);
  }
}

module.exports = Connection;
