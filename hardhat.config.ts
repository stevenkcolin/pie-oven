import { task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";

require('dotenv').config()
const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const MAINNET_PRIVATE_KEY = process.env.MAINNET_PRIVATE_KEY || "";
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY || "";
const ETHERSCAN_API = process.env.ETHERSCAN_API || "";
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID || "";
const ROPSTEN_PRIVATE_KEY = process.env.ROPSTEN_PRIVATE_KEY || "";
const ROPSTEN_PRIVATE_KEY_SECONDARY = process.env.ROPSTEN_PRIVATE_KEY_SECONDARY || "";


// This is a sample Buidler task. To learn how to create your own go to
// https://buidler.dev/guides/create-task.html
task("accounts", "Prints the list of accounts")
.setAction(async(taskArgs, { ethers, run }) =>  {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.getAddress());
  }
});

task("env", "Prints env keys")
.setAction(async(taskArgs, { ethers, run }) =>  {
    console.log("Infura:", INFURA_API_KEY)
    console.log("mainnet:", MAINNET_PRIVATE_KEY)
    console.log("goerli:", GOERLI_PRIVATE_KEY)
    console.log("etherscan:", ETHERSCAN_API)
});
// You have to export an object to set up your config
// This object can have the following optional entries:
// defaultNetwork, networks, solc, and paths.
// Go to https://buidler.dev/config/ to learn more
export default {
  // This is a sample solc configuration that specifies which version of solc to use
  solidity: {
    compilers: [
      {
        version: "0.6.4"
      },
      {
        version: "0.7.1"
      }
    ]
  },
  networks: {
    fork : {
      url: `http://127.0.0.1:8545/`,
      timeout: 2147483647
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
      gasPrice: 42000000000,
      accounts: [
        MAINNET_PRIVATE_KEY,
      ].filter((item) => item !== "")
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
      gasPrice: 20000000000,
      accounts: [
        GOERLI_PRIVATE_KEY,
      ].filter((item) => item !== "")
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
      blockGasLimit: 7612388,
      gas: 7612388,
      gasPrice: 20000000000,
      // accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
      accounts: [
        ROPSTEN_PRIVATE_KEY,
        ROPSTEN_PRIVATE_KEY_SECONDARY
      ].filter((item) => item !== "")
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API
  }
};
