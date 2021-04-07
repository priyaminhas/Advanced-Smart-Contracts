pragma solidity ^0.5.0;

contract Voting {
    bytes32 eligibleVotersMerkleRoot;
    mapping(address => bool) voted;
    uint256 yesVotes;
    uint256 noVotes;
    //0x7ec333951322fcd85ac911ca13e61b9feb833d591a8cca6466daae0af8ea8ebe
    constructor(bytes32 eligibleVotersMerkleRoot_) public {
        eligibleVotersMerkleRoot = eligibleVotersMerkleRoot_;
    }

    function leafHash(address leaf) private pure returns(bytes32) {
        return keccak256(abi.encodePacked(uint8(0x00), leaf));
    }

    function nodeHash(bytes32 left, bytes32 right) private pure returns(bytes32) {
        return keccak256(abi.encodePacked(uint8(0x01), left, right));
    }

    function vote(uint256 path, bytes32[] memory witnesses, bool myVote) public {
        require(!voted[msg.sender], "already voted");
        
        bytes32 nodeCreated = keccak256(abi.encodePacked(uint8(0x00), msg.sender));
        for (uint16 i = 0; i < witnesses.length; i++) {
            if ((path & 0x01) == 1) {
                nodeCreated = keccak256(
                    abi.encodePacked(uint8(0x01), witnesses[i], nodeCreated)
                );
            } else {
                nodeCreated = keccak256(
                    abi.encodePacked(uint8(0x01), nodeCreated, witnesses[i])
                );
            }
            path /= 2;
        }

        require(nodeCreated == eligibleVotersMerkleRoot, "Not an eligible voter");
        voted[msg.sender] = true;

        if (myVote) yesVotes++;
        else noVotes++;

        // EDIT ME: validate the proof!
    }
}
