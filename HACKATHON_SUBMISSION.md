# 🏆 Universal NFT - Hackathon Submission

## 🎯 Project Overview

**Universal NFT** is a cross-chain NFT platform that enables seamless minting and transfer of NFTs across multiple blockchains using ZetaChain's omnichain infrastructure.

**Tagline:** "Mint Once, Launch Everywhere"

---

## ✅ What's Implemented & Working

### 🔧 Smart Contracts

#### 1. **ZetaChain Hub Contract** (UniversalNFTCrossChain.sol)
- **Address:** `0x06A8f91a33FD48466CeD7A7da70CA42Af74915A1`
- **Network:** ZetaChain Athens Testnet
- **Features:**
  - ✅ `onCall()` - Receives cross-chain messages and mints NFTs
  - ✅ `onRevert()` - Handles failed transactions (re-mints NFT to original owner)
  - ✅ `onAbort()` - Handles aborted transactions (emergency recovery)
  - ✅ Public minting function
  - ✅ Cross-chain sending capability
  - ✅ ERC-721 compliant

#### 2. **Sepolia Connected Contract** (UniversalNFTConnected.sol)
- **Address:** `0xf290c44B751262230Fb3737AbF6219199AF92f37`
- **Network:** Sepolia Testnet (Ethereum)
- **Features:**
  - ✅ Public minting function
  - ✅ Receives NFTs from ZetaChain
  - ✅ Can send NFTs back to ZetaChain
  - ✅ ERC-721 compliant
  - ✅ Standard implementation for any EVM chain

### 🌐 Multi-Chain Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    ZetaChain Hub                        │
│                                                         │
│  UniversalNFTCrossChain.sol                            │
│  ├─ onCall() - Receive cross-chain messages            │
│  ├─ onRevert() - Handle failed transactions            │
│  ├─ onAbort() - Handle aborted transactions            │
│  ├─ sendCrossChain() - Send to other chains            │
│  └─ mint() - Create NFTs                               │
│                                                         │
│  0x06A8f91a33FD48466CeD7A7da70CA42Af74915A1           │
└─────────────────────────────────────────────────────────┘
                            │
                            │ Cross-Chain Messages
                            │ via ZetaChain Gateway
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  Sepolia (Ethereum)                     │
│                                                         │
│  UniversalNFTConnected.sol                             │
│  ├─ mintFromZeta() - Receive from ZetaChain            │
│  ├─ sendToZeta() - Send to ZetaChain                   │
│  ├─ mint() - Create NFTs locally                       │
│  └─ Standard ERC-721 functions                         │
│                                                         │
│  0xf290c44B751262230Fb3737AbF6219199AF92f37           │
└─────────────────────────────────────────────────────────┘
```

### 🎨 User Interface
- **File:** `UI/index.html`
- **Features:**
  - ✅ Connect MetaMask wallet
  - ✅ Network detection and switching
  - ✅ Mint NFTs on ZetaChain
  - ✅ Cross-chain transfer interface
  - ✅ Real-time balance and status display
  - ✅ Responsive design

### 🛠️ Development Tools
- **Deployment Scripts:** Automated deployment to both chains
- **Testing Scripts:** Mint, check status, verify balances
- **Documentation:** Comprehensive guides and references

---

## 🧪 Live Demo

### Current Status:
- ✅ **ZetaChain:** Contract deployed and functional
- ✅ **Sepolia:** Contract deployed and functional
- ✅ **NFTs Minted:** Successfully minted on both chains
- ✅ **UI:** Working web interface

### Test It Yourself:

**1. ZetaChain Contract:**
```
Address: 0x06A8f91a33FD48466CeD7A7da70CA42Af74915A1
Explorer: https://athens.explorer.zetachain.com/address/0x06A8f91a33FD48466CeD7A7da70CA42Af74915A1
```

**2. Sepolia Contract:**
```
Address: 0xf290c44B751262230Fb3737AbF6219199AF92f37
Explorer: https://sepolia.etherscan.io/address/0xf290c44B751262230Fb3737AbF6219199AF92f37
```

**3. Sample NFT Transaction:**
```
Sepolia Mint: https://sepolia.etherscan.io/tx/0xe7ea5b3bdc88b645f6bfb68a6144b362bd9e78fcd86d4fdc080114f9b3e1b6e4
```

---

## 🎓 Technical Implementation

### Universal Contract Interface Compliance
```solidity
// Required by ZetaChain Universal Apps
function onCall(
    MessageContext calldata context,
    address zrc20,
    uint256 amount,
    bytes calldata message
) external override onlyGateway;

// Error handling (hackathon requirement)
function onRevert(RevertContext calldata revertContext) external onlyGateway;
function onAbort(AbortContext calldata abortContext) external onlyGateway;
```

### Cross-Chain Message Flow
1. **User Action:** Calls `sendCrossChain(tokenId, destChainId)`
2. **Source Chain:** Burns NFT and sends message via ZetaChain Gateway
3. **ZetaChain:** Routes message to destination chain
4. **Destination Chain:** Receives message via `onCall()` and mints NFT
5. **Error Handling:** `onRevert()` or `onAbort()` restore NFT if needed

### Security Features
- ✅ **Ownership Verification:** Only NFT owner can initiate transfers
- ✅ **Gateway Protection:** Only ZetaChain gateway can call cross-chain functions
- ✅ **Burn-and-Mint:** Ensures NFT uniqueness across chains
- ✅ **Automatic Recovery:** Failed transactions restore NFT to original owner

---

## 🚀 Innovation & Impact

### What Makes This Special:

**1. True Interoperability**
- Same NFT exists on multiple chains (not wrapped copies)
- Seamless user experience across ecosystems

**2. No Bridge Dependencies**
- Uses ZetaChain's native omnichain infrastructure
- No third-party bridge risks or fees

**3. Automatic Error Handling**
- Built-in recovery mechanisms
- User never loses their NFT

**4. Scalable Architecture**
- Easy to add new chains
- Hub-and-spoke model for efficiency

**5. Developer-Friendly**
- Clean, documented code
- Comprehensive tooling and scripts

### Real-World Applications:
- **Gaming:** NFT items that work across multiple game ecosystems
- **Art:** Digital art accessible on any preferred blockchain
- **Identity:** Cross-chain identity and credentials
- **DeFi:** Collateral that works on any DeFi platform

---

## 📊 Technical Metrics

### Smart Contract Stats:
- **Languages:** Solidity 0.8.26
- **Standards:** ERC-721, ZetaChain Universal Contract
- **Networks:** 2 (ZetaChain + Sepolia)
- **Functions:** 15+ public functions
- **Events:** 3 custom events for tracking
- **Security:** OpenZeppelin libraries, access controls

### Development Stats:
- **Files:** 20+ source files
- **Scripts:** 8 deployment/testing scripts
- **Documentation:** 2000+ lines of guides
- **Testing:** Live deployment and verification

---

## 🎯 Hackathon Requirements Met

### ✅ Universal Contract Implementation
- [x] `onCall()` function implemented
- [x] `onRevert()` function implemented  
- [x] `onAbort()` function implemented
- [x] Proper error handling
- [x] Gateway integration

### ✅ Cross-Chain Functionality
- [x] Multi-chain deployment
- [x] Cross-chain message passing
- [x] Asset transfer capability
- [x] State synchronization

### ✅ Production Quality
- [x] Comprehensive documentation
- [x] Testing scripts and verification
- [x] User interface
- [x] Error handling and recovery

### ✅ Innovation
- [x] Novel use case (cross-chain NFTs)
- [x] Scalable architecture
- [x] Real-world applicability
- [x] Technical excellence

---

## 🔮 Future Roadmap

### Phase 1: Enhanced Features
- [ ] NFT metadata and IPFS integration
- [ ] Batch minting and transfers
- [ ] Royalty support (ERC-2981)

### Phase 2: More Chains
- [ ] Polygon integration
- [ ] Avalanche support
- [ ] BSC integration (when faucets allow)

### Phase 3: Advanced Features
- [ ] NFT marketplace
- [ ] Governance token
- [ ] DAO for protocol decisions

### Phase 4: Production
- [ ] Security audit
- [ ] Mainnet deployment
- [ ] Mobile app

---

## 👥 Team & Development

**Developer:** Ary0520
**Development Time:** Hackathon period
**Tech Stack:** Solidity, Hardhat, TypeScript, HTML/CSS/JS
**Infrastructure:** ZetaChain, Ethereum Sepolia

---

## 📚 Resources & Links

### Live Contracts:
- **ZetaChain:** https://athens.explorer.zetachain.com/address/0x06A8f91a33FD48466CeD7A7da70CA42Af74915A1
- **Sepolia:** https://sepolia.etherscan.io/address/0xf290c44B751262230Fb3737AbF6219199AF92f37

### Documentation:
- **GitHub Repository:** [Your repo link]
- **Technical Docs:** See project files
- **User Guide:** `START_HERE.md`

### Demo:
- **Web Interface:** `UI/index.html`
- **Video Demo:** [If you create one]

---

## 🏆 Conclusion

Universal NFT demonstrates the power of ZetaChain's omnichain infrastructure to create truly interoperable digital assets. By implementing all required Universal Contract functions and deploying across multiple chains, this project showcases both technical excellence and real-world utility.

The "Mint Once, Launch Everywhere" vision is not just a tagline—it's a working reality that opens up new possibilities for NFT creators, collectors, and developers across the entire blockchain ecosystem.

**This is the future of NFTs: borderless, seamless, and truly universal.** 🌐

---

*Built with ❤️ on ZetaChain for the Universal Apps Hackathon*