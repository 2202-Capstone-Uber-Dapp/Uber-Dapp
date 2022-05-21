//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract RideDapp is Ownable {
    event Transfer(address from, address receiver, uint256 amount);

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

    Transaction[] transactions;

    mapping(address => uint256) public driverMapping;
    mapping(address => uint256) public riderMapping;
    //Firebase Auth user_ID is a long string
    //ex: pOty1mOnGAbj69EfYO3QB5K3EyN2
    //We can use this for our riding mapping
    //All we need is a unique identifier, might as well use that!
    //Mapped top a kev value pair containing wallet address and how much they sent to the contract to be housed
    //and then accepted by driver
    //Allows user to use multiple wallets etc. more specficity the better
    //EXAMPLE  OF MAPPING :
    // {
    //     pOty1mOnGAbj69EfYO3QB5K3EyN2: { 0xdB166aCcFdbD22De7A15DC0cCA61577279D57B06 : 150000000 wei}
    // }

    mapping(string => mapping(address => uint256)) rideRequestFares;

    uint256 public driverCount;
    uint256 public riderCount;
    uint256 transactionCounter;
    uint256 public requestCount;
    mapping(uint256 => RideRequest) public requestData;

    // functions related to driver

    function checkDriver() public view returns (bool) {
        if (driverMapping[msg.sender] > 0) return true;
        return false;
    }

    function addDriver() public {
        driverCount++;
        driverMapping[msg.sender] = driverCount;
    }

    function acceptRide(
        uint256 _requestId,
        string memory _riderId,
        address _riderWallet
    ) public {
        require(checkDriver(), "not a valid driver");
        //msg.sender is already a payable address
        //Looks at request data to find the cost of the ride to transfer from the SMART Contract to the driver
        //This should the same amount in the rideRequestFares, if both algorithms match up ==> Very important
        //If not we'll have to index the mapping the rider auth id and rider wallet to find the amount
        //Either way works for the latter will need to change arg parameters for this funciton and add riderWallet and rider auth id
        //Try former first
        // uint balance = requestData[_requestId].cost;
        uint256 balance = rideRequestFares[_riderId][_riderWallet];

        //Would make it so only on ride request request would be viable upon completion
        // payable (msg.sender).transfer(address (this).balance);
        payable(msg.sender).transfer(balance);

        transactionCounter += 1;
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

    function checkRider() public view returns (bool) {
        if (riderMapping[msg.sender] > 0) return true;
        return false;
    }

    function addRider() public {
        riderCount++;
        riderMapping[msg.sender] = riderCount;
    }

    //    mapping(string => mapping(address => uint)) rideRequestFares;
    //add Request needs the distance & duration along with id auth
    function addRequest(
        uint256 _distance,
        uint256 _rideTime,
        string memory _riderId
    ) public payable {
        require(checkRider(), "not a valid rider");

        requestCount++;
        uint256 _cost = calcCost(_distance, _rideTime);
        //Checks whether the rider sent the correct amount of money,
        //which is derived from the front end algorithm
        //We also have the backend algorithm to match, more transparency for our app
        //Not Completely Necessary but nice to have
        // require(_cost == msg.value, 'Not Correct Ride Fare' );
        rideRequestFares[_riderId][msg.sender] += msg.value;

        requestData[requestCount] = RideRequest(
            msg.sender,
            block.timestamp,
            _cost
        );

        // return requestCount;
    }

    // general functions

    function calcCost(uint256 _distance, uint256 _duration)
        public
        pure
        returns (uint256)
    {
        uint256 baseFare = 2448697131268900;
        // uint256 baseFare = 5;

        //Super Special Algorithm! Its a Bargain!
        uint256 cost = baseFare + ((_distance * 96 + _duration * 25) / 100);
        return cost;
    }
}
