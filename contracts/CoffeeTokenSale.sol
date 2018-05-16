pragma solidity ^0.4.21;

import "./CoffeeToken.sol";

contract CoffeeTokenSale {

    // variables
    address public admin;
    CoffeeToken public tokenContract;
    uint public tokenPrice;
    uint public tokensSold;

    event Sell(
        address _buyer,
        uint _amount
    );

    constructor(CoffeeToken _tokenContract, uint _tokenPrice) public {
        admin = msg.sender; // assign admin
        tokenContract = _tokenContract; // token contract
        tokenPrice = _tokenPrice; // token price
    }

    // buy tokens
    function buyTokens(uint _numberOfTokens) public payable {

        // require that value is equal to tokens
        require(msg.value == multiply(_numberOfTokens, tokenPrice));

        // contract has enough tokens
        require(tokenContract.balanceOf(this) >= _numberOfTokens);

        // a transfer is successful
        tokenContract.transfer(msg.sender, _numberOfTokens);

        // Keep track of number of tokens sold
        tokensSold += _numberOfTokens;

        // Sell Event
        emit Sell(msg.sender, _numberOfTokens);
    }

    // multiply
    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
        return x * y;
    }
}