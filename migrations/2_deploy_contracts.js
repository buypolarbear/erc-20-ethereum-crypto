var CoffeeToken = artifacts.require("./CoffeeToken.sol");
var CoffeeTokenSale = artifacts.require("./CoffeeTokenSale.sol");

module.exports = function(deployer) {
  // set initial supply to 1 million
  deployer
    .deploy(CoffeeToken, 1000000)
    .then(function() {
             // deploy sale contract
             let tokenPrice = 1000000000000000; // 0.01 ether
             return deployer.deploy(CoffeeTokenSale, CoffeeToken.address, tokenPrice);
          });

  
};
