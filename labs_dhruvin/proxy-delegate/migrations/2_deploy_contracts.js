const ProxyDelegate = artifacts.require('ProxyDelegate');
const ProxyContract = artifacts.require('ProxyContract');
const SomeLibrary = artifacts.require('SomeLibrary');

module.exports = function(deployer) {
    deployer.deploy(SomeLibrary)
    .then(async () => {
        await deployer.deploy(ProxyDelegate, SomeLibrary.address);
        await deployer.deploy(ProxyContract, SomeLibrary.address);
    });
};