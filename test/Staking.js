const MoonTokenV2 = artifacts.require('MoonTokenV2.sol');
const MoonStaking = artifacts.require('MoonStaking.sol');


const { increaseTimeTo, duration } = require('openzeppelin-solidity/test/helpers/increaseTime');
const { latestTime } = require('openzeppelin-solidity/test/helpers/latestTime');

var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var Web3Utils = require('web3-utils');

contract('Moon Contract', async (accounts) => {


    it('Should correctly initialize constructor of MoonTokenV2 token Contract', async () => {

        this.tokenhold = await MoonTokenV2.new({ gas: 600000000 });

    });

    it('Should correctly initialize constructor of Moon Staking Contract', async () => {

        this.stakehold = await MoonStaking.new({ gas: 600000000 });

    });

    it('Should initialize moontokenv2', async () => {

        await this.tokenhold.initialize("MoonCoin", "Moon", 18, 100, 100, 100, 100, accounts[0],this.stakehold.address );


    });

    it('Should check a name of a token', async () => {

        let name = await this.tokenhold.name.call();
        assert.equal(name,"MoonCoin" );

    });

    it('Should check a symbol of a token', async () => {

        let symbol = await this.tokenhold.symbol.call();
        assert.equal(symbol,"Moon" );

    });

    it('Should check a decimal of a token', async () => {

        let decimals = await this.tokenhold.decimals.call();
        assert.equal(decimals,18 );

    });

    it('Should check a owner of a token', async () => {

        let owner = await this.tokenhold.owner.call();
        assert.equal(owner,accounts[0] );

    });

    it('Should check is owner of a token', async () => {

        let owner = await this.tokenhold.isOwner.call();
        assert.equal(owner,true );

    });

    it('Should check if Air drop complete', async () => {

        let isAirdropComplete = await this.tokenhold.isAirdropComplete.call();
        assert.equal(isAirdropComplete,false );

    });

    it('Should check Tax basic points', async () => {

        let taxBP = await this.tokenhold.taxBP.call();
        assert.equal(taxBP,100 );

    });

    it('Should check refferal basic points', async () => {

        let refBP = await this.tokenhold.refBP.call();
        assert.equal(refBP,100 );

    });

    it('Should check burn basic points', async () => {

        let burnBP = await this.tokenhold.burnBP.call();
        assert.equal(burnBP,100 );

    });

    it('Should check bonus basic points', async () => {

        let bonusBP = await this.tokenhold.bonusBP.call();
        assert.equal(bonusBP,100 );

    });

    it('Should check total supply initially', async () => {

        let totalSupply = await this.tokenhold.totalSupply.call();
        assert.equal(totalSupply,0 );

    });

    it('Should check total supply initially', async () => {

        let totalSupply = await this.tokenhold.totalSupply.call();
        assert.equal(totalSupply,0 );

    });

    it('Should check taxAmount', async () => {

        let taxAmount = await this.tokenhold.taxAmount.call(100000);
        assert.equal(taxAmount[0],1000 );
        assert.equal(taxAmount[1],1000 );
        assert.equal(taxAmount[2],1000 );
    });

    it('Should initialize moon stacking', async () => {

        await this.stakehold.initialize(1593918000,100,100,100,100, accounts[0],[accounts[1],accounts[2]], this.tokenhold.address);


    });

    it('Should check Tax basic points of stacking contracts', async () => {

        let taxBP = await this.stakehold.taxBP.call();
        assert.equal(taxBP,100 );

    });

    it('Should check refferal basic points of stacking contracts', async () => {

        let refBP = await this.stakehold.refBP.call();
        assert.equal(refBP,100 );

    });

    it('Should check burn basic points of stacking contracts', async () => {

        let burnBP = await this.stakehold.burnBP.call();
        assert.equal(burnBP,100 );

    });

    it('Should check divodends of investor before staking', async () => {

        let dividendsOf = await this.stakehold.dividendsOf.call(accounts[1]);
        assert.equal(dividendsOf,0 );

    });

    it('Should check a owner of a staking', async () => {

        let owner = await this.stakehold.owner.call();
        assert.equal(owner,accounts[0] );

    });

    it('Should check is owner of a stacking', async () => {

        let owner = await this.stakehold.isOwner.call();
        assert.equal(owner,true );

    });

    it('Should check if a address is a pool manager ', async () => {

        let isPoolManager = await this.stakehold.isPoolManager.call(accounts[1]);
        assert.equal(isPoolManager,true );

    });


})

