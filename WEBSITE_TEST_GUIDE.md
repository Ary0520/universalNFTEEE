# 🌐 Website Testing Guide - Super Simple!

## 🎯 What You'll Test

Your website can:
1. **Mint NFTs** on ZetaChain
2. **Send NFTs cross-chain** to Sepolia

---

## 📋 **Step-by-Step Website Test**

### **Step 1: Open Your Website (30 seconds)**

1. **Find the file:**
   - Go to your `universal-nft` folder
   - Open the `UI` folder
   - Find `index.html`

2. **Open it:**
   - **Right-click** on `index.html`
   - Choose **"Open with"** → **Chrome** (or your browser)
   - OR just **double-click** it

3. **You should see:**
   - Dark website with "Universal NFT" title
   - "Mint Once, Launch Everywhere" subtitle
   - Two cards: "Mint NFT" and "Send Cross-Chain"

### **Step 2: Connect MetaMask (30 seconds)**

1. **MetaMask should pop up automatically**
   - If not, refresh the page

2. **In MetaMask popup:**
   - Click **"Connect"**
   - Click **"Confirm"** if asked

3. **You should see:**
   - Your wallet address appears (like 0x97BF...)
   - "Connected" status with green dot
   - Network shows "ZetaChain Athens Testnet"

### **Step 3: Test Minting NFT (1 minute)**

1. **Make sure you're on ZetaChain:**
   - Website should show "ZetaChain Athens Testnet"
   - If not, click "Switch to ZetaChain Testnet"

2. **Mint an NFT:**
   - Find the card with 🎨 icon
   - Click **"Mint NFT"** button
   - MetaMask pops up → Click **"Confirm"**
   - Wait 10-30 seconds

3. **Success looks like:**
   - "Minting NFT..." message appears
   - Then "✅ NFT minted successfully!" appears
   - You get a transaction link

### **Step 4: Test Cross-Chain Send (2 minutes)**

1. **Click "Send Cross-Chain":**
   - Find the card with 🌐 icon
   - Click **"Send Cross-Chain"** button
   - A popup form appears

2. **Fill in the form:**
   - **Token ID:** Enter `0` (your first NFT)
   - **Destination Chain ID:** Enter `11155111` (Sepolia)
   - Click **"Send NFT"**

3. **Confirm transaction:**
   - MetaMask pops up → Click **"Confirm"**
   - Wait 10-30 seconds

4. **Success looks like:**
   - "Sending cross-chain..." message
   - Then "✅ NFT sent cross-chain successfully!"
   - You get a transaction link

### **Step 5: Complete the Bridge (1 minute)**

After sending cross-chain, you need to complete the bridge:

1. **Open terminal/command prompt**
2. **Navigate to your project:**
   ```
   cd universal-nft
   ```
3. **Run the bridge completion:**
   ```
   npx hardhat run scripts/completeBridge.ts --network sepolia
   ```
4. **Wait for success message**

---

## 🎯 **What Each Button Does**

### **"Mint NFT" Button:**
- **What it does:** Creates a new NFT for you
- **Where:** On the current blockchain (ZetaChain or Sepolia)
- **Cost:** Small gas fee (few cents)
- **Result:** You own a new unique NFT

### **"Send Cross-Chain" Button:**
- **What it does:** Moves your NFT to another blockchain
- **How:** Burns NFT on current chain, sends message to destination
- **Cost:** Small gas fee
- **Result:** NFT disappears from current chain, ready to appear on destination

---

## 🔍 **How to Know It Worked**

### **Successful Mint:**
- ✅ Green success message appears
- ✅ Transaction link shows up
- ✅ MetaMask shows the transaction

### **Successful Cross-Chain Send:**
- ✅ "NFT sent cross-chain successfully!" message
- ✅ Transaction link to ZetaChain explorer
- ✅ NFT disappears from your current chain

### **Check Your NFTs:**
You can verify by running these commands:

```bash
# Check ZetaChain
npx hardhat run scripts/checkStatus.ts --network zeta_testnet

# Check Sepolia
npx hardhat run scripts/checkStatus.ts --network sepolia
```

---

## 🚨 **Common Issues & Solutions**

### **"MetaMask not found"**
→ Install MetaMask browser extension

### **"Wrong network"**
→ Click "Switch to ZetaChain Testnet" on the website

### **"Insufficient funds"**
→ You need more test ZETA tokens

### **"Transaction failed"**
→ Try again, blockchain can be busy

### **"Not your NFT"**
→ Make sure you own the Token ID you're trying to send

### **Buttons don't work**
→ Make sure MetaMask is connected (refresh page if needed)

---

## 💡 **Testing Tips**

1. **Start simple:** Just try minting first
2. **One step at a time:** Don't rush
3. **Check MetaMask:** Make sure transactions appear there
4. **Take screenshots:** Great for showing off your project!
5. **Try both networks:** Mint on ZetaChain, then switch to Sepolia and mint there too

---

## 🎮 **Fun Test Sequence**

**Quick Demo (5 minutes):**
1. Open website → Connect MetaMask
2. Mint NFT on ZetaChain → See success message
3. Send cross-chain to Sepolia → See success message
4. Run bridge completion script → NFT appears on Sepolia
5. **You just moved an NFT between blockchains!** 🎉

---

## 🏆 **What This Proves**

When you successfully test the website, you've proven:
- ✅ Your smart contracts work
- ✅ Your UI is functional
- ✅ Cross-chain messaging works
- ✅ You built a real product people can use
- ✅ You understand blockchain development

**This is hackathon-winning material!** 🌟

---

## 📝 **Quick Reference**

**Your Contract Addresses:**
- **ZetaChain:** `0x43871B2477978122Ddf1eCD225ba9f4100aee525`
- **Sepolia:** `0xc00416cbdC7268A5Cb599382F05dE9adeE5A2EC1`

**Chain IDs:**
- **ZetaChain:** `7001`
- **Sepolia:** `11155111`

**Test Values:**
- **Token ID to send:** `0` (your first NFT)
- **Destination Chain:** `11155111` (Sepolia)

---

**Ready to test? Just double-click that `index.html` file and start clicking buttons!** 🚀