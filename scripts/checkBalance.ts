import { ethers } from "hardhat";

/**
 * Check your wallet balance on any network
 * 
 * USAGE:
 * npx hardhat run scripts/checkBalance.ts --network bsc_testnet
 * npx hardhat run scripts/checkBalance.ts --network zeta_testnet
 */

async function main() {
  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  
  console.log("\n💰 Wallet Balance Check");
  console.log("═══════════════════════════════════════════════════");
  console.log("👤 Address:", signer.address);
  console.log("🌐 Network:", network.name);
  console.log("🔢 Chain ID:", network.chainId.toString());
  
  const balance = await ethers.provider.getBalance(signer.address);
  const formattedBalance = ethers.formatEther(balance);
  
  console.log("💵 Balance:", formattedBalance);
  
  // Determine currency based on chain
  let currency = "ETH";
  if (network.chainId === 97n) currency = "BNB";
  if (network.chainId === 7001n) currency = "ZETA";
  if (network.chainId === 11155111n) currency = "ETH";
  
  console.log("═══════════════════════════════════════════════════\n");
  
  // Check if balance is too low
  const minBalance = ethers.parseEther("0.01");
  if (balance < minBalance) {
    console.log("⚠️  WARNING: Balance is low!");
    console.log(`You have ${formattedBalance} ${currency}`);
    console.log(`Recommended: At least 0.01 ${currency}\n`);
    
    if (network.chainId === 97n) {
      console.log("🔗 Get testnet BNB: https://testnet.bnbchain.org/faucet-smart");
    } else if (network.chainId === 7001n) {
      console.log("🔗 Get testnet ZETA: https://labs.zetachain.com/get-zeta");
    } else if (network.chainId === 11155111n) {
      console.log("🔗 Get testnet ETH: https://www.alchemy.com/faucets/ethereum-sepolia");
    }
  } else {
    console.log(`✅ Balance looks good! You have ${formattedBalance} ${currency}`);
  }
  
  console.log();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
