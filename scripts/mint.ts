const hre = require("hardhat");

async function main() {
  const contractAddress = "0x994DeD1a6A74D82f35e148EE3De2558132870b27";

  const [signer] = await hre.ethers.getSigners();
  const walletAddress = await signer.getAddress();

  console.log("Minting NFT to:", walletAddress);

  const UniversalNFT = await hre.ethers.getContractAt(
    "UniversalNFTCrossChain",
    contractAddress
  );

  const tx = await UniversalNFT.mint(walletAddress);
  await tx.wait();

  console.log("NFT minted successfully!");
}

main().catch(console.error);
