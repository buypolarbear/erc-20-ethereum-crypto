var CoffeeToken = artifacts.require("./CoffeeToken.sol");

module.exports = function(deployer) {
  // set initial supply to 1 million
  deployer.deploy(CoffeeToken, 1000000);
};
