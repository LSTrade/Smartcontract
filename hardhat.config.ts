import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import * as dotenv from "dotenv";
import "hardhat-abi-exporter";
import "hardhat-contract-sizer";
import "hardhat-docgen";
import "hardhat-spdx-license-identifier";
import "hardhat-tracer";
import { HardhatUserConfig } from "hardhat/config";
dotenv.config();

const config: HardhatUserConfig = {
  contractSizer: {
    runOnCompile: false,
    strict: true,
  },
  spdxLicenseIdentifier: {
    runOnCompile: false,
  },
  gasReporter: {
    enabled:
      process.env.REPORT_GAS !== undefined
        ? process.env.REPORT_GAS.toLowerCase() === "true"
        : false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY || "",
    gasPriceApi: process.env.GAS_PRICE_API || "",
    token: "ETH",
    currency: "USD",
  },
  abiExporter: {
    runOnCompile: false,
    path: "./abi",
    clear: true,
    pretty: true,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.13",
        settings: {
          optimizer: {
            enabled: true,
            runs: 4000,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize:
        (process.env.ALLOW_UNLIMITED_CONTRACT_SIZE &&
          "true" === process.env.ALLOW_UNLIMITED_CONTRACT_SIZE.toLowerCase()) ||
        false,
    },
    testnet: {
      allowUnlimitedContractSize:
        (process.env.ALLOW_UNLIMITED_CONTRACT_SIZE &&
          "true" === process.env.ALLOW_UNLIMITED_CONTRACT_SIZE.toLowerCase()) ||
        false,
      url: "http://localhost:8545",
    },
    bsc: {
      accounts: [(process.env.DEPLOYER_WALLET_PRIVATE_KEY as string) || ""],
      url: "https://bsc-dataseed1.binance.org/",
    },
    bscTestnet: {
      accounts: [(process.env.DEPLOYER_WALLET_PRIVATE_KEY as string) || ""],
      url: "https://nodes.3swallet.io/testnet/bnb",
    },
  },
  etherscan: {
    apiKey: {
      bscTestnet: process.env.BSCSCAN_API_KEY || "",
      bsc: process.env.BSCSCAN_API_KEY || "",
    },
  },
};

export default config;
