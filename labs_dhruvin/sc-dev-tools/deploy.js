// Inject environemnt variable in this file
require("dotenv").config("./env");

// Import Web3
const Web3 = require("web3");

// Import BigNumber
const BigNumber = require("bignumber.js");

// Import ABI - use Remix
const abi = require("./abi.json");

// import compiled bytecode of contract - use Remix
const { bytecode } = require("./bytecode");

// create web3 instance
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.URI));

// add account to wallet
web3.eth.accounts.wallet.add("0x" + process.env.PRIVATE_KEY);

const _number = new BigNumber(2);

// get contract instance
const simplestorageContract = new web3.eth.Contract(abi);

// estimateGas and deploy contract
simplestorageContract
  .deploy({
    data: `0x${bytecode}`,
    arguments: [_number],
  })
  .estimateGas()
  .then((gas) => {
    simplestorageContract
      .deploy({
        data: `0x${bytecode}`,
        arguments: [_number],
      })
      .send(
        {
          from: web3.eth.accounts.wallet[0].address,
          gas,
        },
        function (error, transactionHash) {}
      )
      .on("error", function (error) {
        console.log("error", error);
      })
      .on("transactionHash", function (transactionHash) {
        console.log("transactionHash", transactionHash);
      })
      .on("receipt", function (receipt) {
        console.log("receipt", receipt.contractAddress);
      })
      .on("confirmation", function (confirmationNumber, receipt) { // fired till 12th block is mined
        console.log("confirmation", confirmationNumber);
      })
      .on("error", console.error);
  })
  .catch((e) => {
    console.error(e);
  });
