import { io } from 'socket.io-client';
const PORT = process.env.PORT || 8080;

const SOCKET_URL = `https://localhost:${PORT}`;
const option = {
  autoConnect: false,
  withCredentials: true,
};
const socket = new io(SOCKET_URL, option);

export default socket;
