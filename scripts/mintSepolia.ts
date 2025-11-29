import { ethers } from "hardhat";

/**
 * Mint an NFT on Sepolia Testnet
 * 
 * USAGE:
 * 1. Update CONTRACT_ADDRESS with your deployed Sepolia contract
 * 2. Run: npx hardhat run scripts/mintSepolia.ts --network sepolia
 */

async function main() {
  // 🔧 UPDATE THIS with your Sepolia contract address after deployment
  const CONTRACT_ADDRESS = "0xc00416cbdC7268A5Cb599382F05dE9adeE5A2EC1";
  
  if (CONTRACT_ADDRESS === "YOUR_SEPOLIA_CONTRACT_ADDRESS_HERE") {
    console.log("❌ ERROR: Please update CONTRACT_ADDRESS in this script first!");
    console.log("📝 Deploy to Sepolia first using: npx hardhat run scripts/deploySepolia.ts --network sepolia");
    process.exit(1);
  }

  console.log("🎨 Minting NFT on Sepolia Testnet...\n");

  const [signer] = await ethers.getSigners();
  console.log("👤 Minting to:", signer.address);
  
  // Check balance
  const balance = await ethers.provider.getBalance(signer.address);
  console.log("💰 Balance:", ethers.formatEther(balance), "ETH\n");

  // Connect to the deployed contract
  const nft = await ethers.getContractAt("UniversalNFTConnected", CONTRACT_ADDRESS);
  
  console.log("📝 Sending mint transaction...");
  const tx = await nft.mint(signer.address);
  
  console.log("⏳ Waiting for confirmation...");
  const receipt = await tx.wait();
  
  console.log("\n✅ NFT Minted Successfully!");
  console.log("═══════════════════════════════════════════════════");
  console.log("📍 Transaction:", receipt?.hash);
  console.log("🔗 View on Etherscan:", `https://sepolia.etherscan.io/tx/${receipt?.hash}`);
  console.log("═══════════════════════════════════════════════════\n");
  
  // Get the token ID (it's the current counter - 1)
  const tokenCounter = await nft.tokenCounter();
  const newTokenId = tokenCounter - 1n;
  
  console.log("🎫 Your new NFT ID:", newTokenId.toString());
  
  // Check how many NFTs you own
  const myTokens = await nft.tokensOfOwner(signer.address);
  console.log("📦 Total NFTs you own:", myTokens.length);
  console.log("🎨 Your NFT IDs:", myTokens.map(id => id.toString()).join(", "));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});