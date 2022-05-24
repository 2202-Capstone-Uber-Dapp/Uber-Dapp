/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
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
  useToast,
} from '@chakra-ui/react';
import { FaLocationArrow, FaTimes, FaCompass } from 'react-icons/fa';
import mapStyle from './mapStyle';
import { TransactionContext } from '../src/ether/TransactionContext';
import { userContext } from '../context/UserContext';
import { requestRide } from '../redux/user';
import { useSocket } from '../context/SocketContext';
import RideAlert from './RideAlert';
import RiderMap from './RiderMap';
import DriverMap from './DriverMap';

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
  const { socket, setRideMsg } = useSocket();

  useEffect(() => {
    socket.on('test', () => {});
    return () => {
      socket.off('test');
    };
  }, [socket]);
  let {
    rideData,
    handleRideData,
    sendRideRequest,
    connectWallet,
    checkIfWalletIsConnect,
    currentAccount,
    sendTransaction,
    setIs,
    setRider,
    setDriver,
  } = useContext(TransactionContext);

  const auth = useSelector((state) => state.auth);
  //ComponentDidUpdate
  //Prompt User to Connect Wallet
  useEffect(() => {
    connectWallet();
  }, [currentAccount]);

  const dispatch = useDispatch();
  const { user } = userContext();
  const userId = user.user_id;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  GeoCode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

  // Hooks to manage state
  const [center, setCenter] = React.useState(initialCenter);
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
  const { rideInfo } = useSocket();
  const originRef = React.useRef();
  const destinationRef = React.useRef();
  const mapRef = React.useRef();
  const [driverLocation, setDriverLocation] = React.useState(center);
  const [isRouteToRider, setIsRouteToRider] = React.useState(false);
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
    setMap(map);
  });

  const pansTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);

  // brings map back to original spot (central park is how we have it for initial center)
  function panToHome() {
    setCenter(initialCenter);
    setMarker(initialCenter);
  }

  // Reverse Geocoding; using coordinates to obtain address using react-geocode
  function calculateAddress() {
    GeoCode.fromLatLng(marker.lat, marker.lng).then((response) => {
      const address = response.results[0].formatted_address;
      setAddress(address);
      setPickupLocation(address);
    });
  }
  //concider removing this from home as I (zach) moved this function to RiderMap.js
  function handleTitleChange(event) {
    setPickupLocation(event.target.value);
  }

  function createRideInfo() {
    return {
      riderSocketId: socket.id,
      imageUrl: user.profileImage,
      earning: calculateCost(distance, duration).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
      eth: 0.059,
      time: duration,
      miles: distance,
      pickupLocation: originRef.current.value,
      dropOff: destinationRef.current.value,
      marker,
      wallet: { rideRequestId: 0, riderId: 0, riderWalletId: 0 },
    };
  }

  async function handleRideRequest() {
    setIsRideRequest(true);
    console.log('RideRequest status is', isRideRequest);

    let cost = calculateCost(distance, duration);
    dispatch(
      requestRide({
        cost: parseInt(cost),
        distance: parseInt(distance.split(' ')[0]),
        duration: parseInt(duration.split(' ')[0]),
        userId: userId,
      })
    );
    console.log(
      'Data in Home Right before Set State',
      distance,
      duration,
      cost
    );

    try {
      await sendRideRequest({
        distance: distance,
        duration: duration,
        cost: parseInt(cost),
        riderId: userId,
      });
    } catch (e) {
      console.log(e);
    } finally {
      socket.emit('GET_ALL_DRIVER');
      socket.once('DRIVER_LIST_RESPONSE', () => {
        const rideInfoMessage = createRideInfo();
        setRideMsg(rideInfoMessage);
        socket.emit('REQUEST_RIDE_TO_DRIVER', rideInfoMessage);
      });
    }
  }

  // Directions from Driver location to Rider location
  async function setDriverToPickupLocation() {
    if (driverLocation === '' || rideInfo.marker === '') {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: driverLocation,
      destination: rideInfo.marker,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setIsRouteToRider(true);
  }

  // function clearDriverRoute() {
  //   setDriverLocation("")
  // }

  //Rider enters pickup spot and destination; route and directions calculated
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
    // Geocoding; obtaining coordinates from address
    GeoCode.fromAddress(originRef.current.value).then((response) => {
      const { lat, lng } = response.results[0].geometry.location;
      setMarker({ lat, lng });
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

  // SUPER SECRET ALGORITHM TO DETERMINE COST
  function calculateCost(distance, duration) {
    const basefare = 5.0; /*USD*/
    let minutes = 0;
    let hours = 0;
    if (duration.split(' ').length === 4) {
      hours = Number(duration.split(' ')[0]);
      minutes = Number(duration.split(' ')[2]);
    }
    if (duration.split(' ').length === 2) {
      minutes = Number(duration.split(' ')[0]);
    }
    const _duration = hours * 60 + minutes;
    const _distance = Number(distance.split(' ')[0].replace(/,/g, ''));
    const cost = basefare + (_distance * 0.96 + _duration * 0.25);
    return cost;
  }

  function calculateCurrentPosition() {
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
        user.role === 'DRIVER'
          ? setDriverLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          : null;
      },
      () => null
    );
  }

  if (loadError) return 'Error Loading Map';
  if (!isLoaded) return <SkeletonText />;

  return (
    <>
      <RideAlert setDriverToPickupLocation={setDriverToPickupLocation} />
      <Flex
        position="absolute"
        flexDirection="column"
        alignItems="center"
        h="100vh"
        w="100vw"
      >
        <Box position="absolute" left={0} top={0} h="100%" w="100%">
          <Button
            onClick={() => {
              sendTransaction(
                1,
                'KBQ79F5899bClAQPyV1qqq8Zjk72',
                '0x105836DcA641335558f633816Dfd768aa2F81E81'
              );
            }}
          >
            <Text> Test Transaction</Text>
          </Button>
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
            }}
          >
            <Marker
              position={marker}
              onClick={() => {
                setSelected(marker);
              }}
            />
            {selected ? (
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
        {user.role === 'RIDER' ? (
          <RiderMap
            pickupLocation={pickupLocation}
            setPickupLocation={setPickupLocation}
            handleRideRequest={handleRideRequest}
            calculateCost={calculateCost}
            calculateRoute={calculateRoute}
            originRef={originRef}
            destinationRef={destinationRef}
            clearRoute={clearRoute}
            isRoute={isRoute}
            distance={distance}
            duration={duration}
            marker={marker}
            calculateCurrentPosition={calculateCurrentPosition}
            map={map}
            panToHome={panToHome}
          />
        ) : (
          <DriverMap
            calculateCurrentPosition={calculateCurrentPosition}
            marker={marker}
            map={map}
            panToHome={panToHome}
            setDriverLocation={setDriverLocation}
            setDirectionsResponse={setDirectionsResponse}
          />
        )}
      </Flex>
    </>
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
