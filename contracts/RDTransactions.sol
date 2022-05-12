// //SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.0;

// import "./Ownable.sol";

import "@openzeppelin/contracts/access/Ownable.sol";


//Do we need a cosntructor?
// //USED TO TRANSFER THE AMOUNT AND STORE THE TRANSACTION GOING THROUGH IT 
//Why would we add onlyOwner if we want everyone to be able to call these functions ? 
//not just the contract author 
//do we need to make sure the msg.sender is the current signed in wallet?
//how do we do this? with a require? 
//Ask Nicholas 
//Do we need a constructor ?
contract Transactions is Ownable{
    //Initialize transactionCounter variable
    uint256 transactionCounter;
    uint256 rideCounter;
    //Parameters that are required for our transaction event
    event Transfer(
        address from,
        address receiver,
        uint256 amount,
        uint256 distanceTraveled,
        uint256 timestamp
    );

    //Properties our transaction needs to have
    struct TransactionStruct {
        address sender;
        address receiver;
        uint256 amount;
    }

    struct RideStruct {
        uint rideId;
        uint distanceTraveled;
        uint256 tripCompleteTime;
    }

    //The key would be the transactionId and the value would be the rideId
    mapping (uint => uint) transactionToRide;
    //Define an array of transactions, to store all of them, Housed in the transferStruct Array,
    //transactions will be an array of TransferStruct, thus an array of objects
    TransactionStruct[] transactions;

    //might need a payable function 
    //Public ==> everyone can access this function
    function addToBlockchain(address payable reciever, uint amount, uint distanceTraveled) public {
        //Increment counter 
        transactionCounter += 1;
            //Pushing a specific transaction into our transaction array 
            //Event is a way for us to send info to front end 
        transactions.push(TransferStruct(msg.sender, reciever, amount, distanceTraveled, block.timestamp));
        emit Transfer(msg.sender, reciever, amount, distanceTraveled, block.timestamp);

    }

    //Returns a TransferStruct array 
    function getAllTransactions()
        public
        view 
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

        //returns our variable storing amount of transactions 
    function getTransactionCount() public view returns (uint256) {
        return transactionCounter;
    }
}
