// //SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/access/Ownable.sol";
import "./RDTransactions.sol";


contract RideShare is Ownable {

    struct Ride{
        address requesterAddress;
        uint256 timestamp;
        uint8   status;      
    }

    //split off driver and //split off driver 

    Ride[] public rides;
    Drivers[] public drivers ;
    mapping(address => uint) driverToRide;
    mapping(uint => uint) fareToRide;

    //Internal & private function 
    //1 == requested


    function _createRide () internal {
        rides.push(Ride(msg.sender,block.timestamp,1));
    }

    function acceptRide() external {


    }

    function addDriver() external {
        drivers.push()
    }


}