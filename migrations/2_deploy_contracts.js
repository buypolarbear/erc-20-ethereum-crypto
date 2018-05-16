let CoffeeToken = artifacts.require("./CoffeeToken.sol");
let CoffeeTokenSale = artifacts.require("./CoffeeTokenSale.sol");

module.exports = function(deployer) {
  // set initial supply to 1 million
  deployer
    .deploy(CoffeeToken, 1000000)
    .then(function() {
             // deploy sale contract
             let tokenPrice = 10000000000000; // 0.00001 ether
             return deployer.deploy(CoffeeTokenSale, CoffeeToken.address, tokenPrice);
          });

  
};
