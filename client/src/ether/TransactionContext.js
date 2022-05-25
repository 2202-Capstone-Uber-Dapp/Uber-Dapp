/* eslint-disable no-unused-vars */
//Purpose of this file is to wrap all of our components with a context & connect them to the blockchain
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import { fetchConversion } from "../../redux/conversions";
import { contractABI, contractAddress } from "../utils/constants";
export const TransactionContext = React.createContext();

const { ethereum } = window;

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
  const dispatch = useDispatch();
  const conversionRate = useSelector((state) => state.conversionRate);
  const [currentAccount, setCurrentAccount] = useState("");
  const [riderId, setRiderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //So we can always keep track of current transaction count
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );

  const [transactions, setTransactions] = useState([]);

  //If there is no ethereum in window.ethereum then the user doesnt have metamask installed
  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      // window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  //Entire Logic for sending and storing ride Requests
  const sendRideRequest = async (rideData) => {
    try {
      if (ethereum) {
        const RideDappContract = createEthereumContract();

        let minutes = 0;
        let hours = 0;
        if (rideData.duration.split(" ").length === 4) {
          hours = parseInt(rideData.duration.split(" ")[0]);
          minutes = parseInt(rideData.duration.split(" ")[2]);
        }
        if (rideData.duration.split(" ").length === 2) {
          minutes = parseInt(rideData.duration.split(" ")[0]);
        }

        const _duration = hours * 60 + minutes;

        const _distance = parseInt(
          rideData.distance.split(" ")[0].replace(/,/g, "")
        );
        let rideFareInEth = rideData.cost / conversionRate;
        const parsedAmount = ethers.utils.parseEther(rideFareInEth.toString());
        const options = { value: parsedAmount._hex };

        const blockchainHash = await RideDappContract.addRequest(
          rideData.riderId,
          options
        );

        // Add a loading feature to add transparency of transaction process
        setIsLoading(true);
        console.log(
          `Loading Adding Ride Request to Blockchain - ${blockchainHash.hash}`
        );
        //This will wait for the transaction to finish
        await blockchainHash.wait();
        //Notify user for success
        console.log(
          `Success, Ride Request added to Blockchain - ${blockchainHash.hash}`
        );
        setIsLoading(false);
        // window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const setRider = async () => {
    try {
      if (ethereum) {
        const RideDappContract = createEthereumContract();
        const blockchainHash = await RideDappContract.addRider();
        //Add a loading feature to add transparency of transaction process
        setIsLoading(true);
        console.log(
          `Loading, trying to add Rider to block - ${blockchainHash.hash}`
        );
        //This will wait for the transaction to finish
        await blockchainHash.wait();
        //Notify user for success
        console.log(`Success, added Rider to Block - ${blockchainHash.hash}`);
        setIsLoading(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const setDriver = async () => {
    try {
      if (ethereum) {
        const RideDappContract = createEthereumContract();
        const blockchainHash = await RideDappContract.addDriver();
        //Add a loading feature to add transparency of transaction process
        setIsLoading(true);
        console.log(
          `Loading, trying to add Driver to block - ${blockchainHash.hash}`
        );
        //This will wait for the transaction to finish
        await blockchainHash.wait();
        //Notify user for success
        console.log(`Success, added Driver to Block - ${blockchainHash.hash}`);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  //RideId must match the rideId thats in the blockchain
  const sendTransaction = async (rideId, riderId, riderWalletAddress) => {
    try {
      if (!ethereum) return alert("Please install metamask");
      if (ethereum) {
        const RideDappContract = createEthereumContract();
        const transactionHash = await RideDappContract.acceptRide(
          rideId,
          riderId,
          riderWalletAddress,
          { gasLimit: 6000000 }
        );
        setIsLoading(true);
        console.log(
          `Loading, ....adding reciept to Blockchain - ${transactionHash.hash}`
        );
        await transactionHash.wait();
        console.log(
          `Success, recipt added to Blockchain! - ${transactionHash.hash}`
        );
        setIsLoading(false);
        // window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    dispatch(fetchConversion());
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        checkIfWalletIsConnect,
        setIsLoading,
        sendRideRequest,
        setRider,
        setDriver,
        riderId,
        setRiderId,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
