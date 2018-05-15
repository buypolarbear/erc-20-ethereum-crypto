var CoffeeTokenMigrations = artifacts.require("./CoffeeToken.sol");

module.exports = function(deployer) {
  deployer.deploy(CoffeeTokenMigrations);
};
