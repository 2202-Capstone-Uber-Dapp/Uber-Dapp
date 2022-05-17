import { useEffect } from 'react';
import socket from '../../socket';
const useSocket = () => {
  useEffect(() => {
    socket.connect();
    socket.on('connect_error', () => {});
    return () => {
      socket.off('connect_error');
    };
  }, []);
};

export default useSocket;
