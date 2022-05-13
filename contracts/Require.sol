// //SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/access/Ownable.sol";
import "./RDTransactions.sol";

    // 2.) Require Contract ==> Sub Contract 
    //                 - deploys every time a ride is requested 
    //                 - contains information  pertaining to rider
    //                 - has onlyOwnable/ onlyOwner to ensure 
    //                    that only the rider can use this instance 
    //                     of our Require Contract
    //                 - constructor() ==> msg.sender with onlyOwner to ensure 
    //                                     that only msg.sender can modify/
    //                                     delete the request  
    //                                 - constructor() {
    //                                     unit request_owner
    //                                     }
    //                     -check is msg.sender is equal to request.owner to check
    //                         who owns that request

//Is this what Nich meant as a sub contract?
// Extending our transaction contract?    
//Where does onlyOwner come into play in this contract?
//What functions will go in this contract?
//How does this interact with our RD transactions contract?                
contract Require is RDTransactions {
    uint public request_owner;
    address public riderAddress;


    constructor(uint _request_owner, address _riderAddress) {
        request_owner = _request_owner;
        riderAddress = msg.sender;
    }

}

