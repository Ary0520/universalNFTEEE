# 🚀 Quick Reference Guide

## 📝 Essential Commands

### Check Your Balance
```bash
# On Sepolia Testnet
npx hardhat run scripts/checkBalance.ts --network sepolia

# On ZetaChain
npx hardhat run scripts/checkBalance.ts --network zeta_testnet
```

### Deploy Contracts
```bash
# Deploy to Sepolia Testnet
npx hardhat run scripts/deploySepolia.ts --network sepolia

# Deploy to ZetaChain (already done)
npx hardhat run scripts/deploy.ts --network zeta_testnet
```

### Mint NFTs
```bash
# Mint on Sepolia (update contract address in script first!)
npx hardhat run scripts/mintSepolia.ts --network sepolia

# Mint on ZetaChain
npx hardhat run scripts/mint.ts --network zeta_testnet
```

### Check Status
```bash
# Check Sepolia contract status
npx hardhat run scripts/checkStatus.ts --network sepolia

# Check ZetaChain contract status
npx hardhat run scripts/checkStatus.ts --network zeta_testnet
```

### Compile Contracts
```bash
npx hardhat compile
```

---

## 🔗 Important Links

### Faucets (Get Free Test Tokens)
- **Sepolia ETH**: https://www.alchemy.com/faucets/ethereum-sepolia
- **ZetaChain ZETA**: https://labs.zetachain.com/get-zeta

### Block Explorers (View Transactions)
- **Sepolia**: https://sepolia.etherscan.io
- **ZetaChain Athens**: https://athens.explorer.zetachain.com

### Documentation
- **ZetaChain Docs**: https://www.zetachain.com/docs/
- **Hardhat Docs**: https://hardhat.org/docs
- **OpenZeppelin**: https://docs.openzeppelin.com/

---

## 📍 Your Contract Addresses

```
ZetaChain: 0xA52079EE2000c801A1d355d51f276b0A03F86D39
BSC:       [Update after deployment]
```

---

## 🌐 Network Details

### ZetaChain Athens Testnet
```
Network Name: ZetaChain Athens Testnet
RPC URL: https://zetachain-athens-evm.blockpi.network/v1/rpc/public
Chain ID: 7001
Currency: ZETA
Explorer: https://athens.explorer.zetachain.com
```

### Sepolia Testnet
```
Network Name: Sepolia Testnet
RPC URL: https://rpc.sepolia.org
Chain ID: 11155111
Currency: ETH
Explorer: https://sepolia.etherscan.io
```

---

## 🎯 Project Structure

```
universal-nft/
├── contracts/
│   ├── UniversalNFTCrossChain.sol    ← ZetaChain version (hub)
│   └── UniversalNFTConnected.sol     ← BSC version (connected)
│
├── scripts/
│   ├── deploy.ts                      ← Deploy to ZetaChain
│   ├── deployBSC.ts                   ← Deploy to BSC
│   ├── mint.ts                        ← Mint on ZetaChain
│   ├── mintBSC.ts                     ← Mint on BSC
│   ├── checkBalance.ts                ← Check wallet balance
│   └── checkStatus.ts                 ← Check contract status
│
├── UI/
│   └── index.html                     ← Web interface
│
└── hardhat.config.ts                  ← Network configuration
```

---

## 🔑 Key Concepts

### Smart Contract Terms
- **Deploy**: Put your contract on blockchain
- **Mint**: Create a new NFT
- **Burn**: Destroy an NFT
- **Token ID**: Unique number for each NFT
- **Owner**: Who owns the NFT
- **Gas**: Fee to do transactions

### Network Terms
- **Testnet**: Practice blockchain (fake money)
- **Mainnet**: Real blockchain (real money)
- **RPC**: How your computer talks to blockchain
- **Chain ID**: Unique number for each blockchain
- **Block Explorer**: Website to view transactions

### Cross-Chain Terms
- **Hub**: Main chain (ZetaChain)
- **Connected Chain**: Other chains (BSC, Ethereum)
- **Bridge**: System to move assets between chains
- **Cross-Chain Message**: Data sent between chains

---

## 🚨 Troubleshooting

### "Insufficient funds"
→ Get more testnet tokens from faucets

### "Network not found"
→ Check you're using the right `--network` flag

### "Contract not deployed"
→ Run the deployment script first

### "Transaction failed"
→ Check: enough gas? right network? correct address?

### "Cannot find module"
→ Run `npm install` in the universal-nft folder

---

## ✅ Deployment Checklist

- [ ] Got testnet BNB from faucet
- [ ] Added BSC Testnet to MetaMask
- [ ] Deployed contract to BSC
- [ ] Updated contract address in scripts
- [ ] Tested minting on BSC
- [ ] Tested minting on ZetaChain
- [ ] Both contracts working

---

## 📊 Current Status

**Phase 1: Single Chain** ✅
- ZetaChain contract deployed
- Can mint NFTs on ZetaChain

**Phase 2: Multi-Chain** 🔄 (You are here!)
- BSC contract ready to deploy
- Need to deploy and test

**Phase 3: Cross-Chain Bridge** ⏳ (Next)
- Set up messaging between chains
- Enable actual cross-chain transfers

---

## 💡 Pro Tips

1. **Always check your balance first** before deploying or minting
2. **Save all contract addresses** - you'll need them
3. **Test on testnet first** - never go straight to mainnet
4. **Keep your private key secret** - never share it
5. **Use block explorers** to verify transactions

---

## 🎓 Learning Resources

**Beginner:**
- What is a blockchain? → Think of it as a shared spreadsheet everyone can see
- What is an NFT? → A unique digital item with proof of ownership
- What is a smart contract? → Code that runs automatically on blockchain

**Intermediate:**
- How does cross-chain work? → Messages sent between blockchains
- What is gas? → Fee paid to miners/validators for processing
- What is an ABI? → Instructions for talking to a contract

**Advanced:**
- ERC-721 standard
- Cross-chain messaging protocols
- Smart contract security

---

## 📞 Need Help?

If you're stuck:
1. Read the error message carefully
2. Check this guide's troubleshooting section
3. Verify you completed all previous steps
4. Ask for help - explain what you tried and what error you got
