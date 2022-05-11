//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

//USED TO TRANSFER THE AMOUNT AND STORE THE TRANSACTION GOING THROUGH IT 
contract Transacttions {
    //Initialize transactionCounter variable
    uint256 transactionCounter;

    //Parameters that are required for our transaction event
    event Transfer(
        address from,
        address receiver,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    //Properties our transaction needs to have
    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    //Define an array of transactions, to store all of them, Housed in the transferStruct Array,
    //transactions will be an array of TransferStruct, thus an array of objects
    TransferStruct[] transactions;

    //might need a payable function 
    //Public ==> everyone can access this function
    function addToBlockchain(address payable reciever, uint amount, string memory message, string memory keyword) public {
        //Increment counter 
        transactionCounter++;
            //Pushing a specific transaction into our transaction array 
            //Event is a way for us to send info to front end 
        transactions.push(TransferStruct(msg.sender, reciever, amount, message, block.timestamp, keyword));
        emit Transfer(msg.sender, reciever, amount, message, block.timestamp, keyword);

    }

    //Returns a TransferStruct array 
    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        //return transactions;
    }

        //returns our variable storing amount of transactions 
    function getTransactionCount() public view returns (uint256) {
        //return transactionCounter
    }
}
