const { connection } = require('./connection');
const { web3, abi } = connection;
const { address } = require('./contractAddress.json');

web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

const mainContract = new web3.eth.Contract(
    abi,
    address
);

mainContract.methods.get().call().then((result) => {
        console.log("Current number is ", result);
    });
mainContract.methods.set(5)
    .estimateGas()
    .then((gas) => {
        mainContract.methods
            .set(7)
            .send({ from: web3.eth.accounts.wallet[0].address, gas })
            .then(() => {
                console.log("New storedData is set");
            });
    });
mainContract.methods.increment(1)
    .estimateGas()
    .then((gas) => {
        mainContract.methods
            .increment(1)
            .send({ from: web3.eth.accounts.wallet[0].address, gas })
            .then((result) => {
                console.log("New storedData is set"+result);
            });
    });