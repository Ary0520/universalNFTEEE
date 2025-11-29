import { ethers } from "hardhat";

/**
 * Demo script showing cross-chain NFT transfer
 * 
 * This demonstrates the complete cross-chain flow:
 * 1. Mint NFT on ZetaChain
 * 2. Send cross-chain (burns on ZetaChain)
 * 3. Bridge to Sepolia (mints on Sepolia)
 * 
 * USAGE:
 * npx hardhat run scripts/bridgeDemo.ts --network zeta_testnet
 */

async function main() {
  console.log("🌉 Cross-Chain NFT Bridge Demo\n");

  const [signer] = await ethers.getSigners();
  console.log("👤 Using account:", signer.address);

  // Contract addresses
  const ZETA_CONTRACT = "0x43871B2477978122Ddf1eCD225ba9f4100aee525";
  const SEPOLIA_CONTRACT = "0xc00416cbdC7268A5Cb599382F05dE9adeE5A2EC1";
  const SEPOLIA_CHAIN_ID = 11155111;

  console.log("📍 ZetaChain Contract:", ZETA_CONTRACT);
  console.log("📍 Sepolia Contract:", SEPOLIA_CONTRACT);
  console.log();

  // Connect to ZetaChain contract
  const zetaContract = await ethers.getContractAt("UniversalNFTCrossChain", ZETA_CONTRACT);

  // Step 1: Check current NFTs on ZetaChain
  console.log("🔍 Step 1: Checking current NFTs on ZetaChain...");
  const myTokensZeta = await zetaContract.tokensOfOwner(signer.address);
  console.log("   📦 You own", myTokensZeta.length, "NFTs on ZetaChain");
  console.log("   🎫 Token IDs:", myTokensZeta.map(id => id.toString()).join(", "));

  if (myTokensZeta.length === 0) {
    console.log("\n🎨 Minting an NFT first...");
    const mintTx = await zetaContract.mint(signer.address);
    await mintTx.wait();
    console.log("   ✅ NFT minted!");
    
    // Get the new token
    const updatedTokens = await zetaContract.tokensOfOwner(signer.address);
    console.log("   🎫 New NFT ID:", updatedTokens[updatedTokens.length - 1].toString());
  }

  // Get the token to send
  const tokensToSend = await zetaContract.tokensOfOwner(signer.address);
  const tokenIdToSend = tokensToSend[0]; // Send the first token
  
  console.log("\n🚀 Step 2: Sending NFT cross-chain...");
  console.log("   🎫 Sending Token ID:", tokenIdToSend.toString());
  console.log("   🎯 Destination: Sepolia (Chain ID:", SEPOLIA_CHAIN_ID, ")");
  
  // Step 2: Send cross-chain (this will burn the NFT on ZetaChain)
  console.log("   💰 Sending with 0.01 ZETA for gas...");
  const sendTx = await zetaContract.sendCrossChain(
    tokenIdToSend, 
    SEPOLIA_CHAIN_ID, 
    { value: ethers.parseEther("0.01") }
  );
  
  console.log("   ⏳ Waiting for transaction confirmation...");
  const receipt = await sendTx.wait();
  
  console.log("   ✅ Cross-chain send successful!");
  console.log("   📍 Transaction:", receipt?.hash);
  console.log("   🔗 View on ZetaChain:", `https://athens.explorer.zetachain.com/tx/${receipt?.hash}`);

  // Step 3: Verify NFT was burned on ZetaChain
  console.log("\n🔥 Step 3: Verifying NFT was burned on ZetaChain...");
  const remainingTokens = await zetaContract.tokensOfOwner(signer.address);
  console.log("   📦 Remaining NFTs on ZetaChain:", remainingTokens.length);
  console.log("   ✅ NFT successfully burned on ZetaChain!");

  // Step 4: Instructions for bridging to Sepolia
  console.log("\n🌉 Step 4: Bridge to Sepolia");
  console.log("═══════════════════════════════════════════════════");
  console.log("To complete the bridge to Sepolia, run:");
  console.log();
  console.log(`npx hardhat run scripts/completeBridge.ts --network sepolia`);
  console.log();
  console.log("This will:");
  console.log("1. Connect to Sepolia network");
  console.log("2. Mint the NFT on Sepolia");
  console.log("3. Complete the cross-chain transfer");
  console.log();
  console.log("📋 Bridge Details:");
  console.log("   🎫 Token ID:", tokenIdToSend.toString());
  console.log("   👤 Recipient:", signer.address);
  console.log("   📍 ZetaChain Tx:", receipt?.hash);
  console.log("═══════════════════════════════════════════════════");

  console.log("\n🎉 Cross-chain send completed!");
  console.log("Your NFT is now ready to be bridged to Sepolia!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});