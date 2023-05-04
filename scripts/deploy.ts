import { ethers, network, run } from "hardhat";
import config from "../configs";

const main = async () => {
  // Get network data from Hardhat config (see hardhat.config.ts).
  const networkName = network.name;
  // Check if the network is supported.
  if (networkName === "bscTestnet" || networkName === "bsc") {
    console.log(`Deploying to ${networkName} network...`);
    const deployer = (await ethers.getSigners())[0];
    // Compile contracts.
    await run("compile");
    console.log("Compiled contracts...");

    // Deploy contracts.
    const LSTradeToken = await ethers.getContractFactory("LSTradeToken");

    const constructorArgs: [string, string, string] = [
      "LS Coin",
      "LSC",
      config.Address.Admin[networkName],
    ];
    const contract = await LSTradeToken.connect(deployer).deploy(
      ...constructorArgs
    );

    // Wait for the contract to be deployed before exiting the script.
    await contract.deployed();
    console.log(`Deployed to ${contract.address}`);

    console.log(`Wait to verify contract`);
    await new Promise((resolve) => {
      setTimeout(resolve, 60 * 1000);
    });

    await run("verify:verify", {
      address: contract.address,
      constructorArguments: constructorArgs,
    });
  } else {
    console.log(`Deploying to ${networkName} network is not supported...`);
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
