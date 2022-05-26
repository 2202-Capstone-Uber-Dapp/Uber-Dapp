import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';
const option = {
  autoConnect: false,
  withCredentials: true,
};
const socket = new io(SOCKET_URL, option);

export default socket;
