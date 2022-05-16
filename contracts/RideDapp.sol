//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract RideDapp is Ownable {
    event Transfer(address from, address receiver, uint256 amount);

    //lower uint if possile

    struct RideRequest {
        address requesterAddress;
        uint256 timestamp;
        uint256 cost;
    }

    struct Transaction {
        address requesterAddress;
        address driverAddress;
        uint256 timestamp;
        uint256 cost;
    }

    //Define an array of transactions, to store all of them, Housed in the transferStruct Array,
    //transactions will be an array of TransferStruct, thus an array of objects
    Transaction[] transactions;

    //Dictionary containing all the drivers
    mapping(address => uint256) public driverMapping;
    //Dictionary containing all the riders
    mapping(address => uint256) public riderMapping;

    //Count of all the drivers
    uint256 public driverCount;
    //Count of all the riders
    uint256 public riderCount;
    //Count all of the transactions
    uint256 transactionCounter;
    //Count of all the requests
    uint256 public requestCount;
    //Dictionary Containing all of the rides
    mapping(uint256 => RideRequest) public requestData;

    // functions related to driver

    //Checks to see if it is a valid driver
    function checkDriver() public view returns (bool) {
        if (driverMapping[msg.sender] > 0) return true;
        return false;
    }

    function addDriver() public {
        //Increments totalDriver
        driverCount++;
        //Adds Driver to the Driver Dictionary mapping wallet address to the count in driverCount
        driverMapping[msg.sender] = driverCount;
    }

    //Function to allow Driver to accept a Ride and receve the money
    //Transfer eth from rider wallet to drive wallet
    function acceptRide(uint256 _requestId) public {
        //See if the person invoking this function exists as a viable driver in our driver dictionary
        require(checkDriver(), 'not a valid driver');

        //Increment counter
        transactionCounter += 1;

        //Add a Transaction Struct to our transactions array
        //This is to provide a history of our transactions
        transactions.push(
            Transaction(
                requestData[_requestId].requesterAddress,
                msg.sender,
                block.timestamp,
                requestData[_requestId].cost
            )
        );
        emit Transfer(
            requestData[_requestId].requesterAddress,
            msg.sender,
            requestData[_requestId].cost
        );
    }

    // functions related to rider
    //Checks to see if it is a valid rider
    function checkRider() public view returns (bool) {
        if (riderMapping[msg.sender] > 0) return true;
        return false;
    }

    function addRider() public {
        //Increments totalDriver
        riderCount++;
        //Adds Driver to the Driver Dictionary mapping wallet address to the count in driverCount
        riderMapping[msg.sender] = riderCount;
    }

    function addRequest(uint256 _distance, uint256 _rideTime) public {
        //See if the person invoking this function exists as a viable rider in our rider dictionary
        require(checkRider(), 'not a valid rider');

        //Increments totalRequests
        requestCount++;
        //Gets the cost of the Ride
        uint256 _cost = calcCost(_distance, _rideTime);
        //Adds the request to the Request Dictionary
        requestData[requestCount] = RideRequest(
            msg.sender,
            block.timestamp,
            _cost
        );
    }

    // general functions

    // RideCost
    // $5 in wei is 2,448,697,131,268,900.0000 Wei
    //I want the base fare to be
    //Do all smart contracts operate in wei? is that the correct way to denote $5?
    function calcCost(uint256 _distance, uint256 _rideTime)
        public
        pure
        returns (uint256)
    {
        uint256 baseFare = 2448697131268900;
        // uint256 baseFare = 5;

        //Super Special Algorithm! Its a Bargain!
        uint256 cost = (baseFare *
            ((_distance * _rideTime) / (_distance + _rideTime))) / 3;
        return cost;
    }
}

// pragma solidity ^0.8.0;
// import "@openzeppelin/contracts/access/Ownable.sol";

// contract RideDapp is Ownable {
//     event Transfer(address from, address receiver, uint256 amount);

//     //lower uint if possile

//     struct RideRequest {
//         address requesterAddress;
//         uint256 timestamp;
//         uint256 cost;
//     }

//     struct Transaction {
//         address requesterAddress;
//         address driverAddress;
//         uint256 timestamp;
//         uint256 cost;
//     }

//     // struct Driver {
//     //     address driverAddress;
//     // }

//     // struct Rider {
//     //     address driverAddress;
//     // }

//     //  Ride[] public rides;
//     //  ride.push(msg)

//     //    Riders[] public riders;
//     // Drivers[] public drivers ;

//     //Define an array of transactions, to store all of them, Housed in the transferStruct Array,
//     //transactions will be an array of TransferStruct, thus an array of objects
//     Transaction[] transactions;

//     //Dictionary containing all the drivers
//     mapping(address => uint256) public driverMapping;
//     //Dictionary containing all the riders
//     mapping(address => uint256) public riderMapping;

//     //Dictionary containing all the drivers data, which is redundant here since theres only one entry in the struct
//     //maps an integer to the Driver Struct
//     // mapping(uint256 => Driver) public driverData;

//     //Dictionary containing all the riders data, maps an integer to the Rider struct
//     // mapping(uint256 => Rider) public riderData;

//     //Count of all the drivers
//     uint256 public driverCount;
//     //Count of all the riders
//     uint256 public riderCount;
//     //Count all of the transactions
//     uint256 transactionCounter;
//     //Dictionary Containing all of the rides
//     mapping(uint256 => RideRequest) public requestData;
//     //Count of all the requests
//     uint256 public requestCount;

//     // functions related to driver

//     //Checks to see if it is a valid driver
//     function checkDriver() public view returns (bool) {
//         if (driverMapping[msg.sender] > 0) return true;
//         return false;
//     }

//     function addDriver() public {
//         //Increments totalDriver
//         driverCount++;
//         //Adds Driver to the Driver Dictionary mapping wallet address to the count in driverCount
//         driverMapping[msg.sender] = driverCount;

//         //Adds Driver to the DriverData Dictionary mapping the running driver count to the driver wallet address
//         // driverData[driverCount] = Driver(msg.sender);
//     }

//     //Function to allow Driver to accept a Ride and receve the money
//     //Transfer eth from rider wallet to drive wallet
//     function acceptRide(uint256 _requestId) public {

//         //Increment counter
//         transactionCounter += 1;

//         //Add a Transaction Struct to our transactions array
//         //This is to provide a history of our transactions
//         transactions.push(
//             Transaction(
//                 requestData[_requestId].requesterAddress,
//                 msg.sender,
//                 block.timestamp,
//                 requestData[_requestId].cost
//             )
//         );
//         emit Transfer(
//             requestData[_requestId].requesterAddress,
//             msg.sender,
//             requestData[_requestId].cost
//         );
//     }

//     // functions related to rider
//     //Checks to see if it is a valid rider
//     function checkRider() public view returns (bool) {
//         if (riderMapping[msg.sender] > 0) return true;
//         return false;
//     }

//     function addRider() public {
//         //Increments totalDriver
//         riderCount++;
//         //Adds Driver to the Driver Dictionary mapping wallet address to the count in driverCount
//         riderMapping[msg.sender] = riderCount;
//         //Adds Driver to the DriverData Dictionary mapping the running driver count to the driver wallet address
//         // riderData[driverCount] = Rider(msg.sender);
//     }

//     function addRequest(uint256 _distance, uint256 _rideTime) public {
//         //Increments totalRequests
//         requestCount++;
//         //Gets the cost of the Ride
//         uint256 _cost = calcCost(_distance, _rideTime);
//         //Adds the request to the Request Dictionary
//         requestData[requestCount] = RideRequest(
//             msg.sender,
//             block.timestamp,
//             _cost
//         );
//     }

//     // general functions

//     // RideCost
//     // $5 in wei is 2,448,697,131,268,900.0000 Wei
//     //I want the base fare to be
//     //Do all smart contracts operate in wei? is that the correct way to denote $5?
//     function calcCost(uint256 _distance, uint256 _rideTime)
//         public
//         pure
//         returns (uint256)
//     {
//         // uint256 baseFare = 2448697131268900;
//          uint256 baseFare = 5;

//         //Super Special Algorithm! Its a Bargain!
//         uint256 cost = (baseFare *
//             ((_distance * _rideTime) / (_distance + _rideTime))) / 3;
//         return cost;
//     }
// }
