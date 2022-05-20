import { useState, useEffect } from 'react';
import io from '../socket';
const useSocket = () => {
  const [socket, setSocket] = useState();
  useEffect(() => {
    io.connect();
    io.on('connect_error', () => {});
    io.on('needRide', (data) => {
      console.log(data);
      //calculateAddress
      //if(howfar)
      // io.to(data.location.socketId).emit('canAcceptRide', io.socket.id);
      //TODO: send back end leave driver room join special room driverUser id + riderUserId
      //isriding is true;
      //}
    });
    io.on('canAcceptRide', () => {});
    setSocket(io);

    return () => {
      io.off('needRide');
    };
  }, [socket]);

  function disconnect() {
    socket.close();
    setSocket();
  }
  return { socket, disconnect };
};

export default useSocket;
