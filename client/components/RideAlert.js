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
  useToast
} from '@chakra-ui/react';
import useCountdown from '../hooks/useCountdown';
import { useSocket } from '../context/SocketContext';

function RideAlert({ setDriverToPickupLocation }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { socket, rideInfo, setRideMsg } = useSocket();
  const [seconds, startTimer] = useCountdown();
  const toast = useToast()

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
    console.log(setDriverToPickupLocation);
    setDriverToPickupLocation();
    onClose();
    toast({
      title: 'Successfully matched to rider',
      position: 'top',
      size: '32rem',
      description: "Go Pickup Rider!",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
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
                src={rideInfo.imageUrl}
                alt={'Avatar Alt'}
                mt={2}
              />
            </Center>
          </ModalHeader>
          <ModalBody>
            <VStack align={'center'} justify={'center'}>
              <HStack>
                <Text fontSize={'5xl'} fontWeight={800}>
                  {rideInfo.earning}
                </Text>
                <Text color="gray.500" fontSize={'2xl'} fontWeight={600}>
                  | ETH {rideInfo.eth}
                </Text>
              </HStack>
              <Text fontSize={'2xl'} fontWeight={600}>
                {rideInfo.time} ● {rideInfo.miles} 
              </Text>
              <Text fontSize={'xl'} fontWeight={300}>
                Pickup: {rideInfo.pickupLocation}
              </Text>
              <Text fontSize={'xl'} fontWeight={300}>
                Dropoff: {rideInfo.dropOff}
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
            <Button colorScheme="red" variant="ghost" onClick={onDecline}>
              Decline
            </Button>
            <Button colorScheme="green" variant="ghost" onClick={onAccept}>
              Accept
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RideAlert;
