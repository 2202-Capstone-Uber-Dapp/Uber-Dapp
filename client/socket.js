import { io } from 'socket.io-client';

const SOCKET_URL = 'https://young-everglades-26931.herokuapp.com/:8080';
const option = {
  autoConnect: false,
  withCredentials: true,
};
const socket = new io(SOCKET_URL, option);

export default socket;
