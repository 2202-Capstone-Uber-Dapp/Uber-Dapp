import React, { useEffect, useState, useContext } from 'react';
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
  useToast,
} from '@chakra-ui/react';
import useCountdown from '../hooks/useCountdown';
import { useSocket } from '../context/SocketContext';
import { TransactionContext } from '../src/ether/TransactionContext';

const toastRideAcceptConfig = {
  title: 'Successfully matched to rider',
  position: 'top',
  description: 'Go Pickup Rider!',
  status: 'success',
};

function RideAlert({ setDriverToPickupLocation }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { socket, rideInfo, setRideMsg } = useSocket();
  const [seconds, startTimer] = useCountdown();
  const { sendTransaction } = useContext(TransactionContext);
  const toast = useToast();

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
  async function onAccept() {
    // try {
      await sendTransaction(
        0,
        rideInfo.wallet.riderId,
        rideInfo.wallet.riderWalletId
      );
    // } catch (e) {
      // console.error(e);
    // } finally {
      setDriverToPickupLocation();
      toast(toastRideAcceptConfig);
      onClose();
    // }
  }
  function onDecline() {
    socket.emit('DECLINE_RIDE', rideInfo);
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
