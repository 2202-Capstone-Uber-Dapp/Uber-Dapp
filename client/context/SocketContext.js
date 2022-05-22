import React, { useContext, useState, useEffect } from 'react';

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);

  const value = { socket };

  return (
    <SocketContext.Provider value={value}>
      {!loading && children}
    </SocketContext.Provider>
  );
}
