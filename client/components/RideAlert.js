import React, { useEffect } from "react";
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
} from "@chakra-ui/react";
import useCountdown from "../hooks/useCountdown";

const info = {
  earning: 79,
  eth: 0.059,
  time: 20,
  miles: 9.1,
  pickupLocation: "Broadway, New York",
  dropOff: "Central Park",
};
function RideAlert() {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const { earning, eth, time, miles, pickupLocation, dropOff } = info;
  const secs = useCountdown(30);
  useEffect(() => {
    if (isOpen && secs === 0) onDecline();
  }, [secs]);
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
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent margin={5}>
          <ModalHeader>
            <Center>
              <Avatar
                size={"xl"}
                src={
                  "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                }
                alt={"Avatar Alt"}
                mt={2}
              />
            </Center>
          </ModalHeader>
          <ModalBody>
            <VStack align={"center"} justify={"center"}>
              <HStack>
                <Text fontSize={"5xl"} fontWeight={800}>
                  ${earning}
                </Text>
                <Text color="gray.500" fontSize={"2xl"} fontWeight={600}>
                  | ETH {eth}
                </Text>
              </HStack>
              <Text fontSize={"2xl"} fontWeight={600}>
                {time} min ● {miles} mi
              </Text>
              <Text fontSize={"xl"} fontWeight={300}>
                Pickup: {pickupLocation}
              </Text>
              <Text fontSize={"xl"} fontWeight={300}>
                Dropoff: {dropOff}
              </Text>
            </VStack>
          </ModalBody>
          <Progress
            colorScheme="pink"
            size="sm"
            value={secs}
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
