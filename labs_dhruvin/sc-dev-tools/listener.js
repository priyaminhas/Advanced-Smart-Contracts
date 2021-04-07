// Inject environemnt variable in this file
require("dotenv").config("./env");

// Import Web3
const Web3 = require("web3");

// Import abi
const abi = require("./abi.json");

const { address } = require('./contractAddress.json');

// create web3 instance
const web3 = new Web3(
  new Web3.providers.WebsocketProvider(process.env.WEBSOCKET_URI)
);
  
  // add account to wallet
  web3.eth.accounts.wallet.add("0x" + process.env.PRIVATE_KEY);
  
  // get contract instance
  const mainContract = new web3.eth.Contract(
    abi,
    address
  );

  mainContract.events
  .ChangeData((error, event) => {
    console.log(event);
  })
  .on("data", function (event) {
    console.log(event); // same results as the optional callback above
  })
  .on("changed", function (event) {
    // remove event from local database
  })
  .on("error", console.error);