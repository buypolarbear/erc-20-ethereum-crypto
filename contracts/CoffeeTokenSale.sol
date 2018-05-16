pragma solidity ^0.4.21;

import "./CoffeeToken.sol";

contract CoffeeTokenSale {

    // variables
    address public admin;
    CoffeeToken public tokenContract;
    uint public tokenPrice;

    constructor(CoffeeToken _tokenContract, uint _tokenPrice) public {
        admin = msg.sender; // assign admin
        tokenContract = _tokenContract; // token contract
        tokenPrice = _tokenPrice; // token price
    }
}