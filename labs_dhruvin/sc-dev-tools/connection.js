require("dotenv").config();

const Web3 = require("web3");
const fs = require('fs');

const abiFile = fs.readFileSync('./mainContract_sol_MainContract.abi');
const bytecodeFile = fs.readFileSync('./mainContract_sol_MainContract.bin');

const abi = JSON.parse(abiFile.toString());
const bytecode = bytecodeFile.toString();

// Ran in ganache-cli
const web3 = new Web3(process.env.URI);
const accountObj = web3.eth.accounts.privateKeyToAccount(
    process.env.PRIVATE_KEY
);

exports.connection = { web3, accountObj, abi, bytecode }