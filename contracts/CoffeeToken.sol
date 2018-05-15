pragma solidity ^0.4.21;


contract CoffeeToken {

    // variables
    uint public totalSupply;
    mapping(address => uint) public balanceOf;

    string public name = "Coffee Token";
    string public symbol = "CFFE";
    string public standard = "Coffee Token v1.0";

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value
    );

    // constructor
    constructor (uint _initialSupply) public {
        totalSupply = _initialSupply; // total tokens supply
        balanceOf[msg.sender] = totalSupply; // allocate the initial supply to an address
    }

    // transfer
    function transfer(address _to, uint _value) public returns (bool success) {
        
        // exception if insufficient balance
        require(balanceOf[msg.sender] >= _value);

        // transfer tokens
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        // transfer event
        emit Transfer(msg.sender, _to, _value);

        // return boolean value
        return true;
    }
}