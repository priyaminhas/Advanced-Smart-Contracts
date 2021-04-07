// SPDX-License-Identifier: MIT

pragma solidity ^0.4.15;

contract stackTest {
    function f(int a, int b) public pure returns (int output) {
        assembly {
          
           
            // YOUR CODE GOES HERE:
             3  a b add exp 2 a sub mul
             
            =: output
        }
    } 
}