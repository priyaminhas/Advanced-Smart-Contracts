// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <=0.8.1;

contract SomeLibrary {
    uint public version = 1;

    function setVersion(uint newVersion) public {
        version = newVersion;
    }

    function getMsgSender() public view returns(address){
        return msg.sender;
    }
}