let CoffeeTokenSale = artifacts.require("./CoffeeTokenSale");
let CoffeeToken = artifacts.require("./CoffeeToken");

contract("CoffeeTokenSale", (accounts) => {

    let tokenInstance = '';
    let tokenSaleInstance = '';
    let totalSupply = '';
    let admin = accounts[0];
    let tokenPrice = 10000000000000; // in wei i.e 0.00001 ether
    let buyer = accounts[1];
    let tokensAvailable = 750000; // 75%
    let numberOfTokens = 10;

    beforeEach(async () => {
        tokenSaleInstance = await CoffeeTokenSale.deployed();
        tokenInstance = await CoffeeToken.deployed();
    });

    // initial
    it("initial deployment deployment", async () => {
        let admin = await tokenSaleInstance.admin();
        let tokenContract = await tokenSaleInstance.tokenContract();
        let price = await tokenSaleInstance.tokenPrice();
        assert.notEqual(admin, 0x0);
        assert.notEqual(tokenContract, 0x0);
        assert.equal(price, tokenPrice);
    });

    // token buy
    it("facilitates token buying", async () => {
        let value = numberOfTokens * tokenPrice;

        // transfer 75% of tokens to token sale instance
        await tokenInstance.transfer(tokenSaleInstance.address, tokensAvailable, {from: admin});

         // buy tokens
        let receipt = await tokenSaleInstance.buyTokens(numberOfTokens, {from: buyer, value: value});
        let tokensSold = await tokenSaleInstance.tokensSold();
        assert.equal(tokensSold.toNumber(), numberOfTokens);
        let remainingTokens = await tokenInstance.balanceOf(tokenSaleInstance.address);
        assert.equal(remainingTokens.toNumber(), (tokensAvailable - numberOfTokens));

        // event trigger
        assert.equal(receipt.logs.length, 1);
        assert.equal(receipt.logs[0].event, 'Sell');
        assert.equal(receipt.logs[0].args._buyer, buyer);
        assert.equal(receipt.logs[0].args._amount, numberOfTokens);

        // buy tokens different for the ether value
        // underpay
        try {
            await tokenSaleInstance.buyTokens(numberOfTokens, {from: buyer, value: 1});
            assert(false);
        }
        catch(e){
            assert(e);
        }

        // buy more than avaible tokens
        try{
            await tokenSaleInstance.buyTokens(800000, {from: buyer, value: 800000 * tokenPrice});
            assert(false);
        }
        catch(e){
            assert(e);
        }
    });


    it("ends token sale", async () => {

        // end token sale other than admin
        try {
            await tokenSaleInstance.endSale({from: buyer});
            assert(false);
        }
        catch(e){
            assert(e);
        }

        // transfer remaining tokens to admin
        await tokenSaleInstance.buyTokens(numberOfTokens, {from: buyer, value: numberOfTokens * tokenPrice});
        await tokenSaleInstance.endSale({from: admin});
        let adminTokenBalance = await tokenInstance.balanceOf(admin);
        assert.equal(adminTokenBalance.toNumber(), 999980);
    });
});