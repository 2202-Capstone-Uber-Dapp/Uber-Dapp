import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import Loader from "./Loader";
import { TransactionContext } from "../src/context/TransactionContext";
import Transactions from "./Transactions";

const companyCommonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";


 const Input = ({ placeholder, name, type, value, handleChange }) => (
      <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
      />
    );
  


const Blockchain = (props) => {
  const { connectWallet, currentAccount, formData, sendTransaction, handleChange } = useContext(TransactionContext);
  // const connectWallet = () => { };

  const handleSubmit = (e) => {
    //Destructure properties form form data 
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    //if any fields empty break 
    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };
   
  
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crypto <br /> across the world
            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
              Explore the crypto world. Buy and sell cryptocurrencies easily
            </p>
            {!currentAccount && (
              <button
                type="button"
                onClick={connectWallet}
                className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
              >
                <AiFillPlayCircle className="text-white mr-2" />
                <p className="text-white text-base font-semibold">
                  Connect Wallet
                </p>
              </button>
            )}
            <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
              <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
                Reliability
              </div>
              <div className={companyCommonStyles}>Security</div>
              <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
                Ethereum
              </div>
              <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
                Web 3.0
              </div>
              <div className={companyCommonStyles}>Low Fees</div>
              <div className={`rounded-br-2xl ${companyCommonStyles}`}>
                Blockchain
              </div>
            </div>
          </h1>
        </div>
      </div>
      <div>
        <Input
          placeholder="Address To"
          name="addressTo"
          type="text"
          handleChange={handleChange}
        />
        <Input
          placeholder="Amount (ETH)"
          name="amount"
          type="number"
          handleChange={handleChange}
        />
        <Input
          placeholder="Keyword (Gif)"
          name="keyword"
          type="text"
          handleChange={handleChange}
        />
        <Input
          placeholder="Enter Message"
          name="message"
          type="text"
          handleChange={handleChange}
        />
        <div className="h-[1px] w-full bg-gray-400 my-2" />
        {/* {true ? (
          <false />
        ) : ( */}
        <button
          type="button"
          onClick={handleSubmit}
          className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
        >
          Send now
        </button>
        {/* )} */}
      </div>
      <div>
        <Transactions/>
      </div>
    </div>
  );
};

export default Blockchain;

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

// import React, { useContext } from "react";
// import { AiFillPlayCircle } from "react-icons/ai";
// import { SiEthereum } from "react-icons/si";
// import { BsInfoCircle } from "react-icons/bs";

// import { TransactionContext } from "../context/TransactionContext";
// import { shortenAddress } from "../utils/shortenAddress";
// import { Loader } from ".";

// const companyCommonStyles =
//   "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

// const Input = ({ placeholder, name, type, value, handleChange }) => (
//   <input
//     placeholder={placeholder}
//     type={type}
//     step="0.0001"
//     value={value}
//     onChange={(e) => handleChange(e, name)}
//     className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
//   />
// );

// const Welcome = () => {
//   const {
//     currentAccount,
//     connectWallet,
//     handleChange,
//     sendTransaction,
//     formData,
//     isLoading,
//   } = useContext(TransactionContext);

//   const handleSubmit = (e) => {
//     const { addressTo, amount, keyword, message } = formData;

//     e.preventDefault();

//     if (!addressTo || !amount || !keyword || !message) return;

//     sendTransaction();
//   };

//   return (
//     <div className="flex w-full justify-center items-center">
//       <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
//         <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
//           <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
//             Send Crypto <br /> across the world
//           </h1>
//           <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
//             Explore the crypto world. Buy and sell cryptocurrencies easily on
//             Krypto.
//           </p>
//           {!currentAccount && (
//             <button
//               type="button"
//               onClick={connectWallet}
//               className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
//             >
//               <AiFillPlayCircle className="text-white mr-2" />
//               <p className="text-white text-base font-semibold">
//                 Connect Wallet
//               </p>
//             </button>
//           )}

//           <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
//             <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
//               Reliability
//             </div>
//             <div className={companyCommonStyles}>Security</div>
//             <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
//               Ethereum
//             </div>
//             <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
//               Web 3.0
//             </div>
//             <div className={companyCommonStyles}>Low Fees</div>
//             <div className={`rounded-br-2xl ${companyCommonStyles}`}>
//               Blockchain
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
//           <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
//             <div className="flex justify-between flex-col w-full h-full">
//               <div className="flex justify-between items-start">
//                 <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
//                   <SiEthereum fontSize={21} color="#fff" />
//                 </div>
//                 <BsInfoCircle fontSize={17} color="#fff" />
//               </div>
//               <div>
//                 <p className="text-white font-light text-sm">
//                   {shortenAddress(currentAccount)}
//                 </p>
//                 <p className="text-white font-semibold text-lg mt-1">
//                   Ethereum
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
//             <Input
//               placeholder="Address To"
//               name="addressTo"
//               type="text"
//               handleChange={handleChange}
//             />
//             <Input
//               placeholder="Amount (ETH)"
//               name="amount"
//               type="number"
//               handleChange={handleChange}
//             />
//             <Input
//               placeholder="Keyword (Gif)"
//               name="keyword"
//               type="text"
//               handleChange={handleChange}
//             />
//             <Input
//               placeholder="Enter Message"
//               name="message"
//               type="text"
//               handleChange={handleChange}
//             />

//             <div className="h-[1px] w-full bg-gray-400 my-2" />

//             {isLoading ? (
//               <Loader />
//             ) : (
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
//               >
//                 Send now
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Welcome;
