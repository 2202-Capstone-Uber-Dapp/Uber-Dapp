import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Center,
  Text,
  useDisclosure,
  Button,
  Avatar,
  VStack,
  HStack,
  Progress,
} from '@chakra-ui/react';
import useCountdown from '../hooks/useCountdown';
import { useSocket } from '../context/SocketContext';

function RideAlert() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { socket } = useSocket();
  const [ride, setRideMsg] = useState({});
  const [seconds, startTimer] = useCountdown();
  useEffect(() => {
    socket.on('CAN_ACCEPT_RIDE', (message) => {
      setRideMsg(message);
      startTimer();
      onOpen();
    });

    if (isOpen && seconds === 0) onDecline();
    return () => {
      socket.off('CAN_ACCEPT_RIDE');
    };
  }, [seconds]);
  function onAccept() {
    //TODO: write logic for driver acceptance of ride
    onClose();
  }
  function onDecline() {
    //TODO: write logic for driver declination of ride
    onClose();
  }

  return (
    <>
      <Modal
        isCentered
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        trapFocus={false}
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent margin={5}>
          <ModalHeader>
            <Center>
              <Avatar
                size={'xl'}
                src={ride.imageUrl}
                alt={'Avatar Alt'}
                mt={2}
              />
            </Center>
          </ModalHeader>
          <ModalBody>
            <VStack align={'center'} justify={'center'}>
              <HStack>
                <Text fontSize={'5xl'} fontWeight={800}>
                  ${ride.earning}
                </Text>
                <Text color="gray.500" fontSize={'2xl'} fontWeight={600}>
                  | ETH {ride.eth}
                </Text>
              </HStack>
              <Text fontSize={'2xl'} fontWeight={600}>
                {ride.time} min ● {ride.miles} mi
              </Text>
              <Text fontSize={'xl'} fontWeight={300}>
                Pickup: {ride.pickupLocation}
              </Text>
              <Text fontSize={'xl'} fontWeight={300}>
                Dropoff: {ride.dropOff}
              </Text>
            </VStack>
          </ModalBody>
          <Progress
            colorScheme="pink"
            size="sm"
            value={seconds}
            margin={5}
            min="0"
            max="30"
          />
          <ModalFooter
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button colorScheme="red" variant="ghost" onClick={onAccept}>
              Decline
            </Button>
            <Button colorScheme="green" variant="ghost" onClick={onDecline}>
              Accept
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RideAlert;
