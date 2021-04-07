// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.0;
contract MyUniswap {
    uint public reserveA = 10 * 1e18;
    uint public reserveB = 4 * 1e18;
    
    function getPriceOfA() external view returns (uint) {
        return reserveB * 1e18 / reserveA;
    }
    
    event AmountBRequired(uint amountB);
    
    function swapTokenBForExactTokenA(uint amountA) external {
        // Your code goes here
        uint mulNum = reserveA * reserveB;
        reserveA = reserveA - (amountA * 1e18);
        reserveB = mulNum / reserveA;
    }
}