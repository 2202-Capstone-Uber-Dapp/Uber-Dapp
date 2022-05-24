import React, { useContext, useState, useEffect } from "react";
import io from "../socket";
import { useToast } from "@chakra-ui/react";
const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [drivers, setSocketList] = useState([]);
  const [rideInfo, setRideInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  useEffect(() => {
    io.connect();
    io.on("connect_error", (error) => {
      // ...
    });
    io.on("DRIVER_DECLINE_RIDE", (message) => sendRequestToNextDriver(message));
    io.on("NO_DRIVER_AVALIABLE", () =>
      toast({
        description: "No Driver Avaliable",
        status: "error",
        position: "top",
      })
    );
    setSocket(io);
    setLoading(false);
  }, []);

  function sendRequestToNextDriver(message) {
    io.emit("REQUEST_RIDE_TO_DRIVER", message);
  }

  function disconnect() {
    socket.close();
  }

  function setRideMsg(message) {
    setRideInfo(message);
  }

  function setDriverList(driverList) {
    setSocketList((list) => list.concat(driverList));
    console.log(drivers);
  }

  const value = { socket, disconnect, setDriverList, rideInfo, setRideMsg };

  return (
    <SocketContext.Provider value={value}>
      {!loading && children}
    </SocketContext.Provider>
  );
}
