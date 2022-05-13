// //SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/access/Ownable.sol";
import "./RDTransactions.sol";


            //   3.) Provider Contract ==> Sub Contract 
            //            -deploys every time a driver accepts a ride 

contract Provider is RDTransactions {
    uint public provider_owner;
    address public providerAddress;


    constructor(uint _provider_owner, address _providerAddress) {
        provider_owner = _provider_owner;
        providerAddress = msg.sender;
    }

}

