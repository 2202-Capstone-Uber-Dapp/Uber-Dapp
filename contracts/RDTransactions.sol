// // //SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.0;

// // import "./Ownable.sol";

// import "@openzeppelin/contracts/access/Ownable.sol";
// import "./RequestRide.sol";


// //Do we need a cosntructor?
// // //USED TO TRANSFER THE AMOUNT AND STORE THE TRANSACTION GOING THROUGH IT 
// //Why would we add onlyOwner if we want everyone to be able to call these functions ? 
// //not just the contract author 
// //do we need to make sure the msg.sender is the current signed in wallet?
// //how do we do this? with a require? 
// //Ask Nicholas 
// //Do we need a constructor ?
// contract RDTransactions is Ownable{
//     //Initialize transactionCounter variable
//     uint256 transactionCounter;
//     uint256 rideCounter;
//     uint256 distanceTraveled;
//     uint256 expectedTime;
//     //Parameters that are required for our transaction event
//     event Transfer(
//         address from,
//         address receiver,
//         uint256 amount
//     );
//        // uint256 timestamp

//     //Properties our transaction needs to have
//     struct TransactionStruct {
//         address sender;
//         address receiver;
//         uint256 amount;
//     }

    
//      struct RequestStruct {
//          address driver;
//     }


//     // struct RideStruct {
//     //     uint rideId;
//     //     uint distanceTraveled;
//     //     uint256 tripCompleteTime;
//     // }



//     //need a mapping of verified drivers, drivers ready to go 


//     //The key would be the transactionId and the value would be the rideId
//     // mapping (uint => uint) transactionToRide;
//     //Map the wallet address of the requester to the Wallet address of the provider?
//     //The key would be the requester wallet address and the value would be the provider wallet address?
//     //where does the fare come into play?
//     mapping (uint => TransactionStruct) public requestToProvider;

//     //Look up persons request, map to ride request 
//     mapping (address => RequestRide) public userToRequest;
//     //Define an array of transactions, to store all of them, Housed in the transferStruct Array,
//     //transactions will be an array of TransferStruct, thus an array of objects
//     TransactionStruct[] transactions;

//     //might need a payable function 
//     //Public ==> everyone can access this function
//     function completeTransaction(uint _id, address _from, address payable _reciever, uint _amount) public  {
//         //Increment counter 
//         transactionCounter += 1;
//             //Pushing a specific transaction into our transaction array 
//             //Event is a way for us to send info to front end 
//         transactions.push(TransactionStruct(_from, msg.sender, _amount));
//         requestToProvider[_id] = TransactionStruct(_from, msg.sender, _amount);
//         emit Transfer(_from, msg.sender, _amount);

//     }


//     //Returns a TransferStruct array 
//     function getAllTransactions()
//         public
//         view 
//         returns (TransactionStruct[] memory)
//     {
//         return transactions;
//     }

//         //returns our variable storing amount of transactions 
//     function getTransactionCount() public view returns (uint256) {
//         return transactionCounter;
//     }

//     function calculateFare(uint _distanceTraveled, uint _expectedTime) public view returns (uint256) {
//                 //totalCost Calculations here.
//     }


// }
