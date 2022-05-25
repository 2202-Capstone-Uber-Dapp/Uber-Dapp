/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { TransactionContext } from "../src/ether/TransactionContext";
import { shortenAddress } from "../src/utils/shortenAddress";

import {
  Avatar,
  Box,
  Flex,
  useColorModeValue,
  Text,
  Button,
} from "@chakra-ui/react";

import { Heading, Center, Image, Stack } from "@chakra-ui/react";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
  />
);

const Wallet = (props) => {
  const { connectWallet, currentAccount } = useContext(TransactionContext);

  return (
    <Center py={6}>
      <Box
        maxW={"270px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"120px"}
          w={"full"}
          src={
            "https://www.ibm.com/blogs/blockchain/wp-content/uploads/2019/12/Retina_Display-758591537.jpg"
          }
          objectFit={"cover"}
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={
              "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/v1476103033/xfu7exy5y6rkscsm1kns.png"
            }
            alt={"Author"}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {shortenAddress(currentAccount)}{" "}
            </Heading>
            <Text color={"gray.500"}>View Transactions</Text>
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>23k</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Total Rides
              </Text>
            </Stack>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>23k</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Money Spent
              </Text>
            </Stack>
          </Stack>
          {!currentAccount && (
            <Button
              w={"full"}
              mt={8}
              bg={useColorModeValue("#151f21", "gray.900")}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              onClick={connectWallet}
            >
              Connect Wallet
            </Button>
          )}
        </Box>
      </Box>
      {/* <Box>
        {" "}
        <Transactions />
      </Box> */}
    </Center>
  );
};

export default Wallet;
