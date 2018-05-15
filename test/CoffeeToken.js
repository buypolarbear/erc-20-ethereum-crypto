let CoffeeToken = artifacts.require("./CoffeeToken");

contract("CoffeeToken", (accounts) => {

    let tokenInstance = '';
    let totalSupply = '';
    beforeEach(async () => {
        tokenInstance = await CoffeeToken.deployed();
        totalSupply = await tokenInstance.totalSupply();
    });

    // check for total supply on deploy
    it("sets the total supply upon deployment", async () => {

        assert.equal(totalSupply.toNumber(), 1000000);

        let adminBalance = await tokenInstance.balanceOf(accounts[0]);

        assert.equal(adminBalance.toNumber(), 1000000);
    });

    // check for symbol and name
    it("initializes the contract with correct values", async () => {
        let name = await tokenInstance.name();
        let symbol = await tokenInstance.symbol();

        assert.equal(name, "Coffee Token");
        assert.equal(symbol, "CFFE");
    });
});