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
        uint256 balance = rideRequestFares[_riderId][_riderWallet];
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

    function addRequest(string memory _riderId)
        public
        payable
        returns (uint256)
    {
        require(checkRider(), "not a valid rider");

        requestCount++;
        rideRequestFares[_riderId][msg.sender] += msg.value;

        requestData[requestCount] = RideRequest(
            msg.sender,
            block.timestamp,
            msg.value
        );

        return requestCount;
    }
}
