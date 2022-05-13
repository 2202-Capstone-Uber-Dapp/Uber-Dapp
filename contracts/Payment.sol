// //SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/access/Ownable.sol";
//_ ==> private to this lexical environment 
// private inbetween the function scope 
contract Payment is Ownable {
    
    address riderAddress;
    constructor(address _riderAddress) {
    riderAddress = _riderAddress;
    }


}

