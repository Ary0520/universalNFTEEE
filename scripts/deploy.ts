import { ethers } from "hardhat";

async function main() {
  console.log("Deploying UniversalNFTCrossChain...");

  // No need to pass gateway address - it's fetched from registry automatically
  const UniversalNFT = await ethers.getContractFactory("UniversalNFTCrossChain");
  const universalNFT = await UniversalNFT.deploy();

  await universalNFT.waitForDeployment();

  const deployedAddress = await universalNFT.getAddress();
  console.log("UniversalNFTCrossChain deployed at:", deployedAddress);
  console.log("\nGateway address:", await universalNFT.gateway());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
