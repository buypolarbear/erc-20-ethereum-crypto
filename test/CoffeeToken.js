let CoffeeToken = artifacts.require("./CoffeeToken");

contract("CoffeeToken", function(accounts){

    it("sets the total supply upon deployment", async () => {
        let tokenInstance = await CoffeeToken.deployed();
        let totalSupply = await tokenInstance.totalSupply();

        assert.equal(totalSupply.toNumber(), 1000000);
    })
});