// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract MainContract{
    event ChangeData(uint newNum);
    uint storedData;

    constructor(uint256 seed)  {
        storedData = random(seed);
    }

    function set(uint x) public {
        storedData = x;
        emit ChangeData(storedData);
    }

    function get() view public returns (uint) {
        return storedData;
    }
    
    function increment (uint n) public {
        storedData = storedData + n;
        emit ChangeData(storedData);
        return;
    }
    
    function decrement (uint n) public {
        storedData = storedData - n;
        emit ChangeData(storedData);
        return;
    }
    function random(uint256 seed) private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, seed))) % 251;
    }
}
