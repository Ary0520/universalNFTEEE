import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.26",

  networks: {
    zeta_testnet: {
      url: process.env.ZETA_RPC || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 7001,
    },
    bsc_testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 97,
    },
    sepolia: {
      url: "https://ethereum-sepolia-rpc.publicnode.com",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111,
      timeout: 60000,
    },
  },

  etherscan: {
    apiKey: {
      zeta_testnet: "no-api-key-needed",
    },
    customChains: [
      {
        network: "zeta_testnet",
        chainId: 7001,
        urls: {
          apiURL: "https://athens.explorer.zetachain.com/api",
          browserURL: "https://athens.explorer.zetachain.com",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
};

export default config;

