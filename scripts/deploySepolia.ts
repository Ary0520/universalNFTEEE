import { ethers } from "hardhat";

/**
 * Deploy script for Sepolia Testnet (and other connected chains)
 * 
 * EXPLANATION:
 * - This deploys the simpler "connected" version of the contract
 * - We need to provide a "zetaConnector" address
 * - For now, we'll use a placeholder that we can update later
 */
async function main() {
  console.log("🚀 Deploying UniversalNFTConnected to Sepolia Testnet...\n");

  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying with account:", deployer.address);
  
  // Check balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "ETH\n");

  if (balance === 0n) {
    console.log("❌ ERROR: No ETH in account!");
    console.log("🔗 Get testnet ETH from: https://www.alchemy.com/faucets/ethereum-sepolia");
    process.exit(1);
  }

  // For now, use deployer address as connector (we'll update this later)
  // In production, this would be ZetaChain's official connector contract on Sepolia
  const zetaConnectorAddress = deployer.address;
  
  console.log("⚙️  ZetaChain Connector:", zetaConnectorAddress);
  console.log("    (Using deployer address as placeholder)\n");

  const UniversalNFT = await ethers.getContractFactory("UniversalNFTConnected");
  console.log("📦 Deploying contract...");
  
  const universalNFT = await UniversalNFT.deploy(zetaConnectorAddress);
  await universalNFT.waitForDeployment();

  const deployedAddress = await universalNFT.getAddress();
  
  console.log("\n✅ SUCCESS!");
  console.log("═══════════════════════════════════════════════════");
  console.log("📍 Contract deployed at:", deployedAddress);
  console.log("🔗 View on Etherscan:", `https://sepolia.etherscan.io/address/${deployedAddress}`);
  console.log("═══════════════════════════════════════════════════\n");
  
  console.log("📋 NEXT STEPS:");
  console.log("1. Save this contract address");
  console.log("2. Update your UI to include Sepolia network");
  console.log("3. Test minting an NFT on Sepolia");
  console.log("4. Configure cross-chain messaging between ZetaChain and Sepolia\n");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});