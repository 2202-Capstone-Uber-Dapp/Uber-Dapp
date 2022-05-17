//Purpose of this file is to wrap all of our components with a context & connect them to the blockchain
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

//Can get the ethereum object, destructruing from window.ethereum
const { ethereum } = window;

//Function that fetches our eth contract
//uses utils contrants contractAddress & contractABI
const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionsContract;
};

//Every context provider recieves children as props
export const TransactionsProvider = ({ children }) => {
  //Set form data to our local state
  //Pass this to our form on another component via context provider
  //this is how we will gain access to these values
  const [formData, setformData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //We store in local storage so the count doesnt get wiped every time we re load our browser
  //So we can always keep track of current transaction count
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    e.persist();
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  //Here we have created a function getAllTransactions on our front end
  //That grabs our contract through our ether.js library
  //And allows us to use methods that we declared on our smartcontract such as getallTransactions
  //A couple confusinng this
  //1.) createEthereumContract ==> appropriate nomenclature is getEthereumContract
  //2.) getAllTransactions is not recursive! it just happens to have the same name as our function declared in our smart contract
  const getAllTransactions = async () => {
    try {
      //Check if MetaMask is installed
      if (ethereum) {
        //Grab the contract
        const transactionsContract = createEthereumContract();
        console.log("THE ESCROW", transactionsContract);
        //this async method call will return all the transactions associated with a user
        const availableTransactions =
          await transactionsContract.getAllTransactions();

        //Fixing formatting returned by availableTransactions
        //Formats all transactions into a new object that is more digestable
        //Also includes converting time and date represent as ==> ex.) 12/21/2021 4:33:21PM
        //Converts the amount out of wei to decimal   10^18 wei = 1 eth
        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount._hex) / 10 ** 18,
          })
        );

        console.log("ALL TRANSACTIONS FORMATTED", structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //If there is no ethereum in window.ethereum then the user doesnt have metamask installed
  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        //Grab the Contract
        const transactionsContract = createEthereumContract();
        //Get the number of transactions
        const currentTransactionCount =
          await transactionsContract.getTransactionCount();

        //Stores the current transaction count inside of our local storage
        window.localStorage.setItem(
          "transactionCount",
          currentTransactionCount
        );
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  //Once again checks if metamask is installed
  //
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      //Request metamask account, get all the account, user chooses which one
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      //account saved in local state
      //in this case we chose the first account
      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  //Entire Logic for sending and storing ride Requests 
   const sendRideRequest = async () => {
     try {
       if (ethereum) {
         //First we need to grab all the necessary data before we send any eth
         //Get form data
          //GET DISTANCE AND TIME 
        //  const { addressTo, amount, keyword, message } = formData;
         //Gets ours contract
         const RideDappContract = createEthereumContract();
        //  console.log("FORM DATA", formData);
         console.log("Contract", RideDappContract);

         //Send Eth thru the blockchain !
         //All values used in the eth network are im hexadecimal ex: 0x5208 ==> 21,000 Gwei ==> 0.000021 eth


         //Since we executed the transaciton now we want to add the transaction to the Blockchain
         //Immutable history receipt
         //Remember that our function requires address, amount, message, and a keyword
         //transactionHash is a specific transaction ID
         //asynchronous transation & definitley takes time for it to go through
         //Is this hash necessary IDK, might be handy to check functionality thru the console logs 
         const blockchainHash = await RideDappContract.addRequest(
           distance,
           time,
         );

         //Add a loading feature to add transparency of transaction process
         setIsLoading(true);
         console.log(`Loading - ${blockchainHash.hash}`);
         //This will wait for the transaction to finish
         await blockchainHash.wait();
         //Notify user for success
         console.log(`Success - ${blockchainHash.hash}`);
         setIsLoading(false);
         window.location.reload();
       } else {
         console.log("No ethereum object");
       }
     } catch (error) {
       console.log(error);

       throw new Error("No ethereum object");
     }
   };


  //Entire logic for sending and storing transactions
  const sendTransaction = async () => {
    try {
      if (ethereum) {
        //First we need to grab all the necessary data before we send any eth
        //Get form data
        const { addressTo, amount, keyword, message } = formData;
        //Gets ours contract
        const transactionsContract = createEthereumContract();
        //Convert input decimal to wei/ hexadecimal, use method provided by ethers package, utlility functions
        const parsedAmount = ethers.utils.parseEther(amount);
        console.log("FORM DATA", formData);
        console.log("Contract", transactionsContract);

        //Send Eth thru the blockchain !
        //All values used in the eth network are im hexadecimal ex: 0x5208 ==> 21,000 Gwei ==> 0.000021 eth
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: addressTo,
              gas: "0x5208",
              value: parsedAmount._hex,
            },
          ],
        });

        //Since we executed the transaciton now we want to add the transaction to the Blockchain
        //Immutable history receipt
        //Remember that our function requires address, amount, message, and a keyword
        //transactionHash is a specific transaction ID
        //asynchronous transation & definitley takes time for it to go through
        const transactionHash = await transactionsContract.addToBlockchain(
          addressTo,
          parsedAmount,
          message,
          keyword
        );

        //Add a loading feature to add transparency of transaction process
        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        //This will wait for the transaction to finish
        await transactionHash.wait();
        //Notify user for success
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        //Grab the transaction count & store in local storage
        const transactionsCount =
          await transactionsContract.getTransactionCount();

        //Increment the count
        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  //ComponentDidUpdate
  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
        sendRideRequest,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
