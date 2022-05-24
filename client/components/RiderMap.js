import React, { useContext, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  Autocomplete,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";
import GeoCode from "react-geocode";

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes, FaCompass, FaHome } from "react-icons/fa";

const RiderMap = (props) => {
  const {
    pickupLocation,
    setPickupLocation,
    handleRideRequest,
    calculateCost,
    calculateRoute,
    originRef,
    destinationRef,
    clearRoute,
    isRoute,
    distance,
    duration,
    marker,
    calculateCurrentPosition,
    map,
    panToHome
  } = props;

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
    setMap(map);
  });

  const pansTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);

  function handleTitleChange(event) {
    setPickupLocation(event.target.value);
  }

  return (
    <Box
      position="absolute"
      p={4}
      borderRadius="lg"
      m={4}
      bgColor="white"
      shadow="base"
      // minW="container.md"
      zIndex="1"
    >
      <HStack spacing={2} justifyContent="space-between">
        <Box flexGrow={1}>
          <Autocomplete>
            <Input
              type="text"
              placeholder="Pickup Location"
              value={pickupLocation}
              onChange={handleTitleChange}
              ref={originRef}
            />
          </Autocomplete>
        </Box>
      </HStack>
      <HStack spacing={4} mt={4} justifyContent="space-between">
        <Box flexGrow={1}>
          <Autocomplete>
            <Input type="text" placeholder="Destination" ref={destinationRef} />
          </Autocomplete>
        </Box>
      </HStack>
      <HStack spacing={4} mt={4} justifyContent="space-between">
        <ButtonGroup>
          <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
            Calculate Route
          </Button>
          <IconButton
            aria-label="center back"
            icon={<FaTimes />}
            onClick={clearRoute}
          />
          {isRoute === true ? (
            <Button
              colorScheme="pink"
              type="submit"
              onClick={handleRideRequest}
            >
              Request Ride
            </Button>
          ) : (
            <IconButton
          aria-label="center back"
          icon={<FaHome />}
          isRound
          onClick={() => panToHome()}
        />
          )}
        </ButtonGroup>
      </HStack>
      <HStack spacing={4} mt={4} justifyContent="space-between">
        <Text>Distance: {distance} </Text>
        <Text>Duration: {duration} </Text>
        <IconButton
          aria-label="center back"
          icon={<FaCompass />}
          isRound
          onClick={() => calculateCurrentPosition()}
        />
        <IconButton
          aria-label="center back"
          icon={<FaLocationArrow />}
          isRound
          onClick={() => {
            map.panTo(marker);
            map.setZoom(15);
          }}
        />
      </HStack>
      {isRoute === true ? (
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>
            Cost:{" "}
            {calculateCost(distance, duration).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Text>
        </HStack>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default RiderMap;
