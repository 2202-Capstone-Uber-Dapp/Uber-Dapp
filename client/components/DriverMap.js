import React, { useContext, useEffect } from "react";
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

const DriverMap = (props) => {
  const {
    panToHome,
    marker,
    calculateCurrentPosition,
    map,
    setDriverLocation,
    setDirectionsResponse,
  } = props;

  function clearDriverRoute() {
    setDirectionsResponse(null);
    setDriverLocation("");
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
      <HStack spacing={4} mt={4} justifyContent="space-between">
        <IconButton
          aria-label="center back"
          icon={<FaHome />}
          isRound
          onClick={() => panToHome()}
        />
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
        {/* <Button colorScheme="pink" type="submit" onClick={clearDriverRoute}>clear</Button> */}
      </HStack>
      <HStack spacing={4} mt={4} justifyContent="space-between">
        {/* {isRouteToRider === true? (
                  <Text>GO PICKUP RIDER</Text>
                ): <></>} */}
      </HStack>
    </Box>
  );
};

export default DriverMap;
