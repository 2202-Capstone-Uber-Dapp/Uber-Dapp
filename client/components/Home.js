import React from 'react';
import { connect } from 'react-redux';
import {
  useLoadScript,
  GoogleMap,
  Marker,
  Autocomplete,
  InfoWindow,
  DirectionsRenderer,
} from '@react-google-maps/api';
import GeoCode from 'react-geocode';

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
} from '@chakra-ui/react';
import { FaLocationArrow, FaTimes, FaCompass } from 'react-icons/fa';

import mapStyle from './mapStyle';

// Constants: These will be passed in as props to the <GoogleMap> Component
const initialCenter = { lat: 40.7812, lng: -73.9665 };
const libraries = ['places'];
const containerStyle = {
  width: '83%',
  height: '88%',
};
const options = {
  styles:
    mapStyle /* This line changes the mapstyle; can comment it out to change map back to regular */,
  disableDefaultUI: true,
  zoomControl: true,
};

export const Home = (props) => {
  const { username } = props;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  GeoCode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

  // Hooks to manage state
  const [center, setCenter] = React.useState(initialCenter);
  const [newCenter, setNewCenter] = React.useState(center);
  const [map, setMap] = React.useState(null);
  const [directionsResponse, setDirectionsResponse] = React.useState(null);
  const [distance, setDistance] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [marker, setMarker] = React.useState(center);
  const [selected, setSelected] = React.useState(center);
  const [address, setAddress] = React.useState(center);
  const [pickupLocation, setPickupLocation] = React.useState('');
  const [isRoute, setIsRoute] = React.useState(false);
  const [isRideRequest, setIsRideRequest] = React.useState(false);
  // const [rideCost, setRideCost] = React.useState(0);

  const originRef = React.useRef();
  const destinationRef = React.useRef();
  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
    setMap(map);
  });

  const pansTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);

  function calculateAddress() {
    GeoCode.fromLatLng(marker.lat, marker.lng).then((response) => {
      const address = response.results[0].formatted_address;
      setAddress(address);
      setPickupLocation(address);
    });
  }

  function handleTitleChange(event) {
    setPickupLocation(event.target.value);
  }

  function handleRideRequest() {
    setIsRideRequest(true);
  }

  async function calculateRoute() {
    // If either origin or destination fields are empty, cannot calculate a route
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    setIsRoute(true);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    setPickupLocation('');
    originRef.current.value = '';
    destinationRef.current.value = '';
    setIsRoute(false);
    setIsRideRequest(false);
  }

  function calculateCost(distance, duration) {
    // const basefare = "2448697131268900"
    // const basefare = 0.0024486971312689 /* eth*/
    const basefare = 5.0; /*USD*/
    const _distance = Number(distance.split(' ')[0]);
    const _duration = Number(duration.split(' ')[0]);
    const cost =
      (basefare * ((_distance * _duration) / (_distance + _duration))) / 3;
    return cost.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }

  if (loadError) return 'Error Loading Map';
  if (!isLoaded) return <SkeletonText />;

  return (
    <Flex
      position="absolute"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={containerStyle}
          options={options}
          onLoad={onMapLoad}
          onClick={(event) => {
            setMarker({
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            });
            calculateAddress();
            setNewCenter({
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            });
          }}
        >
          <Marker
            position={marker}
            onClick={() => {
              setSelected(marker);
            }}
          />
          {selected && selected !== initialCenter ? (
            <InfoWindow position={{ lat: selected.lat, lng: selected.lng }}>
              <div>
                <p>{JSON.stringify(address)}</p>
              </div>
            </InfoWindow>
          ) : null}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
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
              <Input
                type="text"
                placeholder="Destination"
                ref={destinationRef}
              />
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
              <></>
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
            onClick={() =>
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  pansTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  });
                  setMarker({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  });
                  setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  });
                  calculateAddress();
                },
                () => null
              )
            }
          />
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(newCenter);
              map.setZoom(15);
            }}
          />
        </HStack>
        {isRoute === true ? (
          <HStack spacing={4} mt={4} justifyContent="space-between">
            <Text>Cost: {calculateCost(distance, duration)} (USD)</Text>
            {/* {console.log("distance:", distance)}
          {console.log("duration:", duration)}
          {console.log("distance again:", Number(distance.split(' ')[0]))}
          {console.log("duration again:", Number(duration.split(' ')[0]))} */}
          </HStack>
        ) : (
          <></>
        )}
      </Box>
    </Flex>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
