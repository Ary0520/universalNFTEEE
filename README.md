# 🌐 UniversalNFTEEE - Cross-Chain NFT Platform

A production-ready cross-chain NFT platform built on ZetaChain that enables seamless minting and transfers of NFTs across multiple blockchains. **"Mint Once, Launch Everywhere"** - your NFTs can travel between different blockchains while maintaining their unique identity.

## 🎯 Overview

UniversalNFTEEE leverages ZetaChain's omnichain infrastructure to create a truly interoperable NFT ecosystem. Users can mint NFTs on one blockchain and transfer them to any supported chain without traditional bridges or wrapped tokens.

### ✨ Key Features

- **🔄 True Cross-Chain Transfers**: Send NFTs between ZetaChain and Sepolia seamlessly
- **🎨 Public Minting**: Anyone can mint NFTs on both chains
- **🛡️ Automatic Error Recovery**: Built-in revert and abort handling
- **⚡ Universal Contract Implementation**: Full ZetaChain Universal App standard
- **🎮 User-Friendly Interface**: Professional web UI with NFT selection
- **🔐 ERC-721 Compliant**: Standard NFT implementation with full compatibility

## 🏗️ Architecture

### Smart Contracts

**ZetaChain Hub Contract** (`UniversalNFTCrossChain.sol`):
- **`onCall`**: Receives cross-chain messages and mints NFTs
- **`onRevert`**: Restores NFTs if transactions fail
- **`onAbort`**: Handles emergency transaction aborts
- **`sendCrossChain`**: Burns NFT and sends cross-chain message

**Sepolia Connected Contract** (`UniversalNFTConnected.sol`):
- **`mintFromZeta`**: Receives NFTs from ZetaChain
- **`bridgeFromZetaChain`**: Manual bridge completion
- Standard ERC-721 functionality

## 🚀 Live Deployment

### Contract Addresses
- **ZetaChain Athens Testnet**: `0x994DeD1a6A74D82f35e148EE3De2558132870b27`
- **Sepolia Testnet**: `0xc00416cbdC7268A5Cb599382F05dE9adeE5A2EC1`

### Block Explorer Links
- **ZetaChain**: [View on Athens Explorer](https://athens.explorer.zetachain.com/address/0x994DeD1a6A74D82f35e148EE3De2558132870b27)
- **Sepolia**: [View on Etherscan](https://sepolia.etherscan.io/address/0xc00416cbdC7268A5Cb599382F05dE9adeE5A2EC1)

## 🎮 Quick Start

### Prerequisites
- Node.js v16+ and npm
- MetaMask wallet
- Test tokens (ZETA and Sepolia ETH)

### Installation
```bash
git clone https://github.com/Ary0520/universalNFTEEE.git
cd universal-nft
npm install
```

### Environment Setup
Create `.env` file:
```env
PRIVATE_KEY=your_private_key_here
ZETA_RPC=https://zetachain-athens-evm.blockpi.network/v1/rpc/public
```

### Get Test Tokens
- **ZetaChain ZETA**: [ZetaChain Faucet](https://labs.zetachain.com/get-zeta)
- **Sepolia ETH**: [Alchemy Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)

## 🌐 Using the Web Interface

### Step 1: Open the Website
1. Navigate to `UI/index.html`
2. Double-click to open in your browser
3. Connect your MetaMask wallet

### Step 2: Mint NFTs
1. Ensure you're on ZetaChain network
2. Click **"Mint NFT"**
3. Confirm transaction in MetaMask
4. Your NFT appears automatically in the interface!

### Step 3: Cross-Chain Transfer
1. Click **"Send Cross-Chain"**
2. **Select your NFT** from the dropdown (shows all your NFTs!)
3. **Destination** is pre-selected (Sepolia)
4. Click **"Send NFT"** and confirm
5. Complete the bridge: `npx hardhat run scripts/completeBridge.ts --network sepolia`

## 💻 Command Line Usage

### Deploy Contracts
```bash
# Deploy to ZetaChain
npx hardhat run scripts/deploy.ts --network zeta_testnet

# Deploy to Sepolia
npx hardhat run scripts/deploySepolia.ts --network sepolia
```

### Mint NFTs
```bash
# Mint on ZetaChain
npx hardhat run scripts/mint.ts --network zeta_testnet

# Mint on Sepolia
npx hardhat run scripts/mintSepolia.ts --network sepolia
```

### Cross-Chain Demo
```bash
# Complete cross-chain transfer demo
npx hardhat run scripts/bridgeDemo.ts --network zeta_testnet
npx hardhat run scripts/completeBridge.ts --network sepolia
```

### Check Status
```bash
# Check your NFTs on ZetaChain
npx hardhat run scripts/checkStatus.ts --network zeta_testnet

# Check your NFTs on Sepolia
npx hardhat run scripts/checkStatus.ts --network sepolia
```

## 🔧 Project Structure

```
universal-nft/
├── 📁 contracts/
│   ├── UniversalNFTCrossChain.sol     # ZetaChain hub contract
│   └── UniversalNFTConnected.sol      # Sepolia connected contract
├── 📁 scripts/
│   ├── deploy.ts                      # Deploy to ZetaChain
│   ├── deploySepolia.ts               # Deploy to Sepolia
│   ├── mint.ts                        # Mint on ZetaChain
│   ├── mintSepolia.ts                 # Mint on Sepolia
│   ├── bridgeDemo.ts                  # Cross-chain demo
│   ├── completeBridge.ts              # Complete bridge
│   ├── checkStatus.ts                 # Check NFT ownership
│   └── checkBalance.ts                # Check wallet balance
├── 📁 UI/
│   └── index.html                     # Professional web interface
├── 📄 README.md                       # This file
├── 📄 HACKATHON_SUBMISSION.md         # Hackathon documentation
├── 📄 QUICK_REFERENCE.md              # Command reference
└── ⚙️ Configuration files
```

## 🌉 How Cross-Chain Works

### The Journey of an NFT
1. **Mint** NFT on ZetaChain (Token ID: 1)
2. **Send Cross-Chain** → NFT burns on ZetaChain
3. **Cross-Chain Message** sent via ZetaChain Gateway
4. **Bridge Completion** → Same NFT (Token ID: 1) mints on Sepolia
5. **Result**: Same NFT, same owner, different blockchain!

### Technical Flow
```
ZetaChain                    Sepolia
┌─────────────┐             ┌─────────────┐
│ NFT #1      │   Burn &    │             │
│ (You own)   │   Send  ──► │   Mint      │
│             │             │   NFT #1    │
│ [Empty]     │             │ (You own)   │
└─────────────┘             └─────────────┘
```

## 🔐 Security Features

- **Ownership Verification**: Only NFT owners can initiate transfers
- **Burn-and-Mint**: Ensures NFT uniqueness across chains
- **Automatic Recovery**: Failed transactions restore NFTs to original owner
- **Gateway Protection**: Only ZetaChain gateway can execute cross-chain functions
- **Error Handling**: Complete revert and abort mechanisms

## 📊 Smart Contract Events

```solidity
event SentCrossChain(address indexed from, uint256 tokenId, uint256 destChain)
event ReceivedCrossChain(address indexed to, uint256 tokenId, uint256 fromChain)
event CrossChainReverted(uint256 tokenId, address owner, string reason)
```

## 🎯 Supported Networks

- **ZetaChain Athens Testnet** (Hub)
- **Sepolia Testnet** (Connected)
- **Extensible** to any EVM-compatible chain

## 🏆 Hackathon Features

### ZetaChain Universal Contract Compliance
- ✅ **`onCall`** implementation
- ✅ **`onRevert`** implementation  
- ✅ **`onAbort`** implementation
- ✅ **Gateway integration**
- ✅ **Cross-chain messaging**

### Production Quality
- ✅ **Professional UI** with NFT selection
- ✅ **Real-time NFT display**
- ✅ **Error handling and recovery**
- ✅ **Comprehensive documentation**
- ✅ **Live deployment and testing**

## 🧪 Testing

### Automated Testing
```bash
npx hardhat compile
npx hardhat test
```

### Manual Testing
1. **Web Interface**: Open `UI/index.html` and test all features
2. **Cross-Chain Flow**: Use `bridgeDemo.ts` and `completeBridge.ts`
3. **Status Verification**: Use `checkStatus.ts` on both networks

## 📚 Documentation

- **Main Guide**: `README.md` (this file)
- **Hackathon Submission**: `HACKATHON_SUBMISSION.md`
- **Quick Reference**: `QUICK_REFERENCE.md`
- **UI Guide**: `IMPROVED_UI_GUIDE.md`
- **Testing Guide**: `WEBSITE_TEST_GUIDE.md`

## 🔗 Links

- **GitHub**: [https://github.com/Ary0520/universalNFTEEE](https://github.com/Ary0520/universalNFTEEE)
- **ZetaChain Explorer**: [Contract on Athens](https://athens.explorer.zetachain.com/address/0x994DeD1a6A74D82f35e148EE3De2558132870b27)
- **Sepolia Explorer**: [Contract on Etherscan](https://sepolia.etherscan.io/address/0xc00416cbdC7268A5Cb599382F05dE9adeE5A2EC1)

## 💡 Innovation Highlights

### Technical Innovation
- **True Cross-Chain NFTs**: Not wrapped tokens, but actual NFT migration
- **Universal Contract Implementation**: Full ZetaChain standard compliance
- **Automatic Error Recovery**: Built-in revert and abort handling
- **Professional UI**: Real-time NFT display and selection

### User Experience Innovation
- **"Mint Once, Launch Everywhere"**: Simple concept, powerful execution
- **Visual NFT Management**: See all your NFTs and choose which to send
- **Seamless Cross-Chain**: Complex blockchain interactions made simple
- **Real-Time Updates**: UI updates automatically as you mint and transfer

## 🚀 Future Roadmap

- [ ] **IPFS Metadata Integration**: Rich NFT metadata and images
- [ ] **Multi-Chain Expansion**: Add more supported blockchains
- [ ] **NFT Marketplace**: Built-in trading functionality
- [ ] **Batch Operations**: Mint and transfer multiple NFTs at once
- [ ] **Mobile App**: Native mobile interface
- [ ] **Governance Token**: Community-driven development

## 👥 Team

**Developer**: Ary0520  
**Built for**: ZetaChain Universal Apps Hackathon  
**Tech Stack**: Solidity, Hardhat, TypeScript, ZetaChain, Ethereum

## 📄 License

MIT License - see LICENSE file for details

---

## 🎉 Try It Now!

1. **Get test tokens** from the faucets above
2. **Open `UI/index.html`** in your browser
3. **Connect MetaMask** and start minting
4. **Send your NFT cross-chain** and watch the magic happen!

**Experience the future of NFTs - truly universal, truly interoperable.** 🌟

---

**Built with ❤️ on ZetaChain | "Mint Once, Launch Everywhere"**
