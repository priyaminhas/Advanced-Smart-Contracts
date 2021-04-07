# security-audit
This project is used for practicing security audit on a contract intentionally coded with security vunerabilities.

## BadKickback
The purpose of the contract, BadKickback, is used to encourage higher event turnout rate. The rule is to charge everyone a small fee when they sign up for the event. The fee will be refunded after the event check-in. No-shows will lose their fee, which will be split amongst the attendees.

## Task
- Perform a security audit on the contract. Document in a report all the issues/vulnerabilities, classify their severities and provide recommendations.
- Submit the document to BB.

## Sample

For your references consider a sample question and answer below.

### Question

**CrowdFund_vulnerable.sol**
```js
// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

contract CrowdFund {
  address[] public refundAddresses;
  mapping(address => uint256) public refundAmount;

  function refundDos() public payable {
    for(uint i; i < refundAddresses.length; i++) {
      payable(refundAddresses[i]).transfer(refundAmount[refundAddresses[i]]);
    }
  }
}
```
### Solution
#### Vulnerability
**Denial Of Service**
* A malicious contract can permanently stall another contract by failing in a strategic way. 
* In particular, contracts that do batch transfers or updates using a `for` loop can be DoS'd if a call to another contract or `transfer` fails during the loop

#### Severity 
High

### Issues
* Contract iterates through through an array to pay back its users. if one `transfer` fails in the middle of a `for` loop, all reimbursements fails.

* Attacker spams contract, causing some array to become large. Then `for` loops iterating thorugh the array might run out of gas and revert.

### Recommendations
* Favor pull over push for external calls
* If iterating over a dynamically sized data structure, be able to handle the case where the function takes multiple blocks to execute. One strategy for this is storing iterator in a private variable and using while loop that exists when gas drops below certain threshold.

**CrowdFund_Pull.sol**
```js
// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

contract CrowdFund {
  address[] private refundAddresses;
  mapping(address => uint) public refundAmount;

  function withdraw() external {
    uint refund = refundAmount[msg.sender];
    refundAmount[msg.sender] = 0;
    msg.sender.transfer(refund);
  }
}
```

**CrowdFund_Safe.sol**
```js
// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

//This is safe against the list length causing out of gas issues
//but is not safe against the payee causing the execution to revert
contract CrowdFund {
  address[] private refundAddresses;
  mapping(address => uint256) public refundAmount;
  uint256 nextIdx;
  
  function refundSafe() public payable{
    uint256 i = nextIdx;
    while(i < refundAddresses.length && gasleft() > 200000) {
      payable(refundAddresses[i]).transfer(refundAmount[refundAddresses[i]]);
      i++;
    }
    nextIdx = i;
  }
}
```

### References
* [Governmental 1100 eth jackpot payout is stuck](https://www.reddit.com/r/ethereum/comments/4ghzhv/governmentals_1100_eth_jackpot_payout_is_stuck/)
* [DoS via unbounded operations](https://consensys.github.io/smart-contract-best-practices/known_attacks/#gas-limit-dos-on-a-contract-via-unbounded-operations)