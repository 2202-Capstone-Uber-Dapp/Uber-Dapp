import React, { useContext, useState, useEffect } from 'react';
import io from '../socket';
const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [drivers, setSocketList] = useState([]);
  const [rideInfo, setRideInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(loading);
    io.connect();
    io.on('connect_error', (error) => {
      // ...
    });
    setSocket(io);
    setLoading(false);
  }, []);

  function disconnect() {
    socket.close();
  }

  function setRideMsg(message) {
    setRideInfo(message);
  }

  const value = { socket, disconnect, setSocketList, rideInfo, setRideMsg };

  return (
    <SocketContext.Provider value={value}>
      {!loading && children}
    </SocketContext.Provider>
  );
}
