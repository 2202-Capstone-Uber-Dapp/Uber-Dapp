import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import Loader from "./Loader";
import { TransactionContext } from "../src/context/TransactionContext";
import Transactions from "./Transactions";
import { shortenAddress } from '../src/utils/shortenAddress'

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Button,
} from "@chakra-ui/react";

import {
  Heading,
  Center,
  Image,


  Stack,

} from '@chakra-ui/react';



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
  const {
    connectWallet,
    currentAccount,
    formData,
    sendTransaction,
    handleChange,
  } = useContext(TransactionContext);
  // const connectWallet = () => { };

  const handleSubmit = (e) => {
    //Destructure properties form form data
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    //if any fields empty break
    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  console.log("CURRENT ACC", currentAccount);

  return (
    //   <Box>
    //     <Box>
    //       <h1>
    //         {!currentAccount && (
    //           <Box>
    //             <Button type="button" onClick={connectWallet}>
    //               <AiFillPlayCircle />
    //               <Text>Connect Wallet</Text>
    //             </Button>
    //             <Text> Wallet Address Link Abbreviated</Text>
    //           </Box>
    //         )}
    //       </h1>
    //     </Box>
    //     <div>
    //       <div />
    //       <Button type="button" onClick={handleSubmit}>
    //         Transact now
    //       </Button>
    //     </div>
    //     <div>
    //       <Transactions />
    //     </div>
    //   </Box>
    // );
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

//   Button,
//   useColorModeValue,
// } from '@chakra-ui/react';

// export default function SocialProfileWithImage() {
//   return (
//     <Center py={6}>
//       <Box
//         maxW={'270px'}
//         w={'full'}
//         bg={useColorModeValue('white', 'gray.800')}
//         boxShadow={'2xl'}
//         rounded={'md'}
//         overflow={'hidden'}>
//         <Image
//           h={'120px'}
//           w={'full'}
//           src={
//             'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
//           }
//           objectFit={'cover'}
//         />
//         <Flex justify={'center'} mt={-12}>
//           <Avatar
//             size={'xl'}
//             src={
//               'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
//             }
//             alt={'Author'}
//             css={{
//               border: '2px solid white',
//             }}
//           />
//         </Flex>

//         <Box p={6}>
//           <Stack spacing={0} align={'center'} mb={5}>
//             <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
//               John Doe
//             </Heading>
//             <Text color={'gray.500'}>Frontend Developer</Text>
//           </Stack>

//           <Stack direction={'row'} justify={'center'} spacing={6}>
//             <Stack spacing={0} align={'center'}>
//               <Text fontWeight={600}>23k</Text>
//               <Text fontSize={'sm'} color={'gray.500'}>
//                 Followers
//               </Text>
//             </Stack>
//             <Stack spacing={0} align={'center'}>
//               <Text fontWeight={600}>23k</Text>
//               <Text fontSize={'sm'} color={'gray.500'}>
//                 Followers
//               </Text>
//             </Stack>
//           </Stack>

//           <Button
//             w={'full'}
//             mt={8}
//             bg={useColorModeValue('#151f21', 'gray.900')}
//             color={'white'}
//             rounded={'md'}
//             _hover={{
//               transform: 'translateY(-2px)',
//               boxShadow: 'lg',
//             }}>
//             Follow
//           </Button>
//         </Box>
//       </Box>
//     </Center>
//   );
// }
















//Infura is a service that maintains a set of Ethereum nodes with a caching layer for fast reads, which you can access for free through their API. Using Infura as a provider,
//you can reliably send and receive messages to / from the Ethereum blockchain without needing to set up and maintain your own node.

// You can set up Web3 to use Infura as your web3 provider as follows:
// var web3 = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws"));

// window.addEventListener("load", function () {
//   // Checking if Web3 has been injected by the browser (Mist/MetaMask)
//   if (typeof web3 !== "undefined") {
//     // Use Mist/MetaMask's provider
//     web3js = new Web3(web3.currentProvider);
//   } else {
//     // Handle the case where the user doesn't have web3. Probably
//     // show them a message telling them to install Metamask in
//     // order to use our app.
//   }

//   // Now you can start your app & access web3js freely:
//   startApp();
// });

// Once you have your contract's address and ABI, you can instantiate it in Web3 as follows:

// // Instantiate myContract
// var myContract = new web3js.eth.Contract(myABI, myContractAddress);

//send example
// myContract.methods.myMethod(123).send();

//call example
// myContract.methods.myMethod(123).call();

// We can see which account is currently active on the injected web3 variable via:

// var userAccount = web3.eth.accounts[0]

// Because the user can switch the active account at any time in MetaMask,
// our app needs to monitor this variable to see if it has changed and update the UI accordingly.
// var accountInterval = setInterval(function () {
//   // Check if account has changed
//   if (web3.eth.accounts[0] !== userAccount) {
//     userAccount = web3.eth.accounts[0];
//     // Call some function to update the UI with the new account
//     updateInterface();
//   }
// }, 100);

//TASKS
//Create a button that takes an input value, in dollars
//on submit meta mask chrome extension will kick in and present the estimated gas fee for the transaction
//and sends that amount from one test wallet to another via smart contract
//this should simulate the logic that our app will need to send eth from one user to another
//maybe add a request refund feature
//look into truffle/ganache ==> truffle suite, development environment to deploy smart contract to the ropsten test network
//when we request a ride will it go on the blockchain? probably not since that would cost gas, only on acceptance/ride completion
//sends  info through socket io
//drive accepts session and they are connected
//once ride is over
//ride id
//user id
