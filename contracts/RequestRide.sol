// // //SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.0;


// import "@openzeppelin/contracts/access/Ownable.sol";
// import "./RDTransactions.sol";

//     // 2.) Require Contract ==> Sub Contract 
//     //                 - deploys every time a ride is requested 
//     //                 - contains information  pertaining to rider
//     //                 - has onlyOwnable/ onlyOwner to ensure 
//     //                    that only the rider can use this instance 
//     //                     of our Require Contract
//     //                 - constructor() ==> msg.sender with onlyOwner to ensure 
//     //                                     that only msg.sender can modify/
//     //                                     delete the request  
//     //                                 - constructor() {
//     //                                     unit request_owner
//     //                                     }
//     //                     -check is msg.sender is equal to request.owner to check
//     //                         who owns that request

// //Is this what Nich meant as a sub contract?
// // Extending our transaction contract?    
// //Where does onlyOwner come into play in this contract?
// //What functions will go in this contract?
// //How does this interact with our RD transactions contract?   
// //Because i need to add these values to our mapping              
// //want this contract to be ownable , ownable is requester 
// //delete function 
// contract RequestRide is RDTransactions {
    
//     address driverAddress;
//     string status = 'requested'; 

//     // constructor( address _riderAddress) {
//     //     riderAddress = msg.sender;
//     // }

//     //driver acceses request 
//     //driver picks up owner to fufill request 
//     //if the address is one of the driver s
//     function assignDriver(address _driverAddress) external {
//             //Driver is viable check 
//         // require(driverMap(_driverAddress))
//         driverAddress = _driverAddress;
//         status = 'pending';
//     }

    
//     //take rider address 
//     //initialize new request Ride contract, use msg.sender as the _riderAddress 
//     //only one person can cancel the ride, the person that requested it 

//     // new Contract Request Ride add to mapping of Request Ride 
//     //Request ride will just pair the addresses
//     function initiateRide() external {


//     }



// }

