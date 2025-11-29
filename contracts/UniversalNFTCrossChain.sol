// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@zetachain/protocol-contracts/contracts/zevm/interfaces/UniversalContract.sol";
import "@zetachain/protocol-contracts/contracts/zevm/interfaces/IGatewayZEVM.sol";
import "@zetachain/protocol-contracts/contracts/Revert.sol";

contract UniversalNFTCrossChain is ERC721, Ownable, UniversalContract, Revertable, Abortable {
    uint256 public tokenCounter;

    // Events for tracking cross-chain actions
    event SentCrossChain(address indexed from, uint256 tokenId, uint256 destChain);
    event ReceivedCrossChain(address indexed to, uint256 tokenId, uint256 fromChain);
    event CrossChainReverted(uint256 tokenId, address owner, string reason);

    constructor() ERC721("Universal NFT", "UNFT") Ownable(msg.sender) UniversalContract() {
        tokenCounter = 0;
    }

    // PUBLIC mint function - anyone can mint!
    function mint(address to) external returns (uint256) {
        uint256 newId = tokenCounter;
        _mint(to, newId);
        tokenCounter += 1;
        return newId;
    }

    // Cross-chain send function
    function sendCrossChain(uint256 tokenId, uint256 destChainId) external payable {
        require(ownerOf(tokenId) == msg.sender, "Not your NFT");
        require(destChainId == 11155111, "Only Sepolia supported");
        
        address owner = msg.sender;
        
        // Burn the NFT on this chain
        _burn(tokenId);
        
        // Emit event for cross-chain tracking
        emit SentCrossChain(owner, tokenId, destChainId);
        
        // In a full production implementation, this would call ZetaChain's gateway
        // For this demo, the burning works and the bridge is completed manually
    }

    // ============================================
    // UNIVERSAL APP FUNCTIONS (Required by hackathon)
    // ============================================

    /**
     * @dev Called when receiving a cross-chain message
     * This is where NFTs are minted on the destination chain
     */
    function onCall(
        MessageContext calldata context,
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external override onlyGateway {
        // Decode the message to get tokenId and recipient
        (uint256 tokenId, address recipient) = abi.decode(message, (uint256, address));
        
        // Mint the NFT to the recipient on this chain
        _mint(recipient, tokenId);
        
        // Update counter if this tokenId is higher
        if (tokenId >= tokenCounter) {
            tokenCounter = tokenId + 1;
        }
        
        emit ReceivedCrossChain(recipient, tokenId, context.chainID);
    }

    /**
     * @dev Called when a cross-chain transaction fails and needs to be reverted
     * This re-mints the NFT back to the original owner
     * REQUIRED by Revertable interface for hackathon
     */
    function onRevert(RevertContext calldata revertContext) external onlyGateway {
        // Decode the original message to get tokenId and owner
        (uint256 tokenId, address originalOwner) = abi.decode(
            revertContext.revertMessage, 
            (uint256, address)
        );
        
        // Re-mint the NFT back to the original owner
        _mint(originalOwner, tokenId);
        
        emit CrossChainReverted(tokenId, originalOwner, "Transaction reverted");
    }

    /**
     * @dev Called when a cross-chain transaction is aborted
     * This handles emergency situations where the transaction cannot complete
     * REQUIRED by Abortable interface for hackathon
     */
    function onAbort(AbortContext calldata abortContext) external onlyGateway {
        // Decode the original message to get tokenId and owner
        (uint256 tokenId, address originalOwner) = abi.decode(
            abortContext.revertMessage, 
            (uint256, address)
        );
        
        // Re-mint the NFT back to the original owner since transaction was aborted
        _mint(originalOwner, tokenId);
        
        emit CrossChainReverted(tokenId, originalOwner, "Transaction aborted");
    }



    // Helper function to check if user owns any NFTs
    function tokensOfOwner(address owner) external view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory tokens = new uint256[](balance);
        uint256 index = 0;
        
        for (uint256 i = 0; i < tokenCounter; i++) {
            if (_ownerOf(i) == owner) {
                tokens[index] = i;
                index++;
            }
        }
        
        return tokens;
    }
}
