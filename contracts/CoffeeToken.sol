pragma solidity ^0.4.21;


contract CoffeeToken {

    // variables
    uint public totalSupply;
    mapping(address => uint) public balanceOf;

    string public name = "Coffee Token";
    string public symbol = "CFFE";
    string public standard = "Coffee Token v1.0";

    // constructor
    constructor (uint _initialSupply) public {
        totalSupply = _initialSupply; // total tokens supply
        balanceOf[msg.sender] = totalSupply; // allocate the initial supply to an address
    }

    // set total number of tokens

    // get total number of tokens
}