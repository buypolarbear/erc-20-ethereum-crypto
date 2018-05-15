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
        let standard = await tokenInstance.standard();

        assert.equal(name, "Coffee Token");
        assert.equal(symbol, "CFFE");
        assert.equal(standard, "Coffee Token v1.0");
    });

    // check transfer exception
    it("transfer token ownership exception", async () => {

        // exception
        try {
            await tokenInstance.transfer.call(accounts[1], 999999999, {from: accounts[0]});

            assert(false);
        }
        catch(e) {
            assert(e);
        }
    });

    // check transfer valid
    it("transfer token ownership valid", async () => {
       
        // execute transaction
        let receipt = await tokenInstance.transfer(accounts[1], 250000, {from: accounts[0]});
        let balance = await tokenInstance.balanceOf(accounts[1]);
        assert.equal(balance.toNumber(), 250000);

        // event transfer
        assert.equal(receipt.logs.length, 1);
        assert.equal(receipt.logs[0].event, 'Transfer');
        assert.equal(receipt.logs[0].args._from, accounts[0]);
        assert.equal(receipt.logs[0].args._to, accounts[1]);
        assert.equal(receipt.logs[0].args._value, 250000);

        // check return value
        let success = await tokenInstance.transfer.call(accounts[1], 250000, {from: accounts[0]});
        assert.equal(success, true);
    });


    // delegated transfer
    it('approves tokens for delegated transfer', async () => {
        let success = await tokenInstance.approve.call(accounts[1], 100);
        assert.equal(success, true);

        // event approve and allowance
        let approveEvent = await tokenInstance.approve(accounts[1], 100, {from: accounts[0]});
        assert.equal(approveEvent.logs.length, 1);
        assert.equal(approveEvent.logs[0].event, 'Approve');
        assert.equal(approveEvent.logs[0].args._owner, accounts[0]);
        assert.equal(approveEvent.logs[0].args._spender, accounts[1]);
        assert.equal(approveEvent.logs[0].args._value, 100);

        let allowance = await tokenInstance.allowance(accounts[0], accounts[1]);
        assert.equal(allowance, 100);
    });
});