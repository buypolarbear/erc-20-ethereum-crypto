let CoffeeTokenSale = artifacts.require("./CoffeeTokenSale");

contract("CoffeeTokenSale", (accounts) => {

    let tokenInstance = '';
    let totalSupply = '';
    let tokenPrice = 1000000000000000; // in wei i.e 0.001 ether

    beforeEach(async () => {
        tokenInstance = await CoffeeTokenSale.deployed();
    });

    // initial
    it("initial deployment deployment", async () => {
        let admin = await tokenInstance.admin();
        let tokenContract = await tokenInstance.tokenContract();
        let price = await tokenInstance.tokenPrice();
        assert.notEqual(admin, 0x0);
        assert.notEqual(tokenContract, 0x0);
        assert.equal(price, tokenPrice);
    });
});