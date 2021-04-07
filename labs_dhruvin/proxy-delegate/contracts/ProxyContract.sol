// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <=0.8.1;

contract ProxyContract {
    //state variable for version added
    uint256 public version;
    address public owner;
    address public delegate;  // contract to delegate calls to

    event LogResult(bytes result);

    constructor(address delegateAddress) {
        owner = msg.sender;
        delegate = delegateAddress;
    }

    fallback() external {
        (bool success, bytes memory returnData) = delegate.call(msg.data);
        require(success, "external call failed");
        emit LogResult(returnData);
    }
}