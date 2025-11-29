import { ethers } from "hardhat";

/**
 * Check the status of your NFT contracts on both chains
 * 
 * USAGE:
 * Update the contract addresses below, then run:
 * npx hardhat run scripts/checkStatus.ts --network zeta_testnet
 * npx hardhat run scripts/checkStatus.ts --network bsc_testnet
 */

async function main() {
  // 🔧 UPDATE THESE ADDRESSES
  const ZETA_CONTRACT = "0x994DeD1a6A74D82f35e148EE3De2558132870b27";
  const SEPOLIA_CONTRACT = "0xc00416cbdC7268A5Cb599382F05dE9adeE5A2EC1"; // Update after deployment
  
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  
  console.log("\n📊 Universal NFT Status Check");
  console.log("═══════════════════════════════════════════════════");
  console.log("👤 Your Address:", signer.address);
  console.log("🌐 Current Network:", network.name);
  console.log("🔢 Chain ID:", network.chainId.toString());
  console.log("═══════════════════════════════════════════════════\n");
  
  // Determine which contract to check
  let contractAddress: string;
  let contractType: string;
  
  if (network.chainId === 7001n) {
    contractAddress = ZETA_CONTRACT;
    contractType = "UniversalNFTCrossChain";
    console.log("📍 Checking ZetaChain Contract...");
  } else if (network.chainId === 11155111n) {
    if (SEPOLIA_CONTRACT === "YOUR_SEPOLIA_CONTRACT_ADDRESS_HERE") {
      console.log("❌ Sepolia contract not deployed yet!");
      console.log("📝 Run: npx hardhat run scripts/deploySepolia.ts --network sepolia\n");
      return;
    }
    contractAddress = SEPOLIA_CONTRACT;
    contractType = "UniversalNFTConnected";
    console.log("📍 Checking Sepolia Contract...");
  } else {
    console.log("❌ Unknown network!");
    return;
  }
  
  console.log("📄 Contract:", contractAddress);
  console.log("📦 Type:", contractType);
  console.log();
  
  try {
    // Connect to contract (works for both types since they share these functions)
    const nft = await ethers.getContractAt("UniversalNFTConnected", contractAddress);
    
    // Get contract info
    const name = await nft.name();
    const symbol = await nft.symbol();
    const tokenCounter = await nft.tokenCounter();
    
    console.log("✅ Contract is live!");
    console.log("───────────────────────────────────────────────────");
    console.log("🏷️  Name:", name);
    console.log("🔤 Symbol:", symbol);
    console.log("🔢 Total NFTs minted:", tokenCounter.toString());
    console.log();
    
    // Check your NFTs
    console.log("🎨 Your NFTs on this chain:");
    const myTokens = await nft.tokensOfOwner(signer.address);
    
    if (myTokens.length === 0) {
      console.log("   📭 You don't own any NFTs on this chain yet");
      console.log("   💡 Mint one with: npx hardhat run scripts/mint.ts --network " + 
                  (network.chainId === 7001n ? "zeta_testnet" : "sepolia"));
    } else {
      console.log(`   📦 You own ${myTokens.length} NFT(s)`);
      console.log("   🎫 Token IDs:", myTokens.map(id => id.toString()).join(", "));
    }
    
    console.log();
    console.log("═══════════════════════════════════════════════════\n");
    
  } catch (error: any) {
    console.log("❌ Error connecting to contract!");
    console.log("Error:", error.message);
    console.log("\nPossible issues:");
    console.log("- Contract not deployed to this network");
    console.log("- Wrong contract address");
    console.log("- Network connection issues\n");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
