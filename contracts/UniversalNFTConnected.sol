// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title UniversalNFTConnected
 * @dev This is the "connected chain" version (for BSC, Ethereum, etc.)
 * It's simpler than the ZetaChain version - it just receives NFTs from ZetaChain
 * 
 * KEY CONCEPTS:
 * - This contract lives on BSC Testnet
 * - It can mint/burn NFTs when instructed by the ZetaChain contract
 * - Only the ZetaChain connector address can trigger cross-chain mints
 */
contract UniversalNFTConnected is ERC721, Ownable {
    uint256 public tokenCounter;
    
    // This is the ZetaChain connector contract address that can trigger mints
    address public zetaConnector;
    
    // Events for tracking
    event ReceivedFromZeta(address indexed to, uint256 tokenId);
    event SentToZeta(address indexed from, uint256 tokenId);
    event BridgedFromZetaChain(address indexed to, uint256 tokenId, bytes32 zetaChainTxHash);
    
    constructor(address _zetaConnector) 
        ERC721("Universal NFT", "UNFT") 
        Ownable(msg.sender) 
    {
        tokenCounter = 0;
        zetaConnector = _zetaConnector;
    }
    
    /**
     * @dev Update the ZetaChain connector address (in case it changes)
     */
    function setZetaConnector(address _zetaConnector) external onlyOwner {
        zetaConnector = _zetaConnector;
    }
    
    /**
     * @dev PUBLIC mint function - anyone can mint on this chain too!
     */
    function mint(address to) external returns (uint256) {
        uint256 newId = tokenCounter;
        _mint(to, newId);
        tokenCounter += 1;
        return newId;
    }
    
    /**
     * @dev This is called when an NFT arrives from ZetaChain
     * For now, this is a manual bridge - in production it would be called by ZetaChain's connector
     * Only the owner or ZetaChain connector can call this
     */
    function mintFromZeta(address to, uint256 tokenId) external {
        require(msg.sender == owner() || msg.sender == zetaConnector, "Only owner or ZetaChain connector");
        
        // Mint the NFT to the recipient
        _mint(to, tokenId);
        
        // Update counter if this tokenId is higher
        if (tokenId >= tokenCounter) {
            tokenCounter = tokenId + 1;
        }
        
        emit ReceivedFromZeta(to, tokenId);
    }
    
    /**
     * @dev Manual bridge function - allows owner to mint NFT when they verify it was burned on ZetaChain
     * This simulates what ZetaChain's connector would do automatically
     */
    function bridgeFromZetaChain(address to, uint256 tokenId, bytes32 zetaChainTxHash) external onlyOwner {
        // In production, this would verify the ZetaChain transaction
        // For demo purposes, we trust the owner to verify the burn transaction
        
        _mint(to, tokenId);
        
        // Update counter if this tokenId is higher
        if (tokenId >= tokenCounter) {
            tokenCounter = tokenId + 1;
        }
        
        emit ReceivedFromZeta(to, tokenId);
        
        // Emit additional event with transaction proof
        emit BridgedFromZetaChain(to, tokenId, zetaChainTxHash);
    }
    
    /**
     * @dev Send NFT back to ZetaChain (or to another connected chain via ZetaChain)
     * This burns the NFT here and tells ZetaChain to mint it elsewhere
     */
    function sendToZeta(uint256 tokenId) external payable {
        require(ownerOf(tokenId) == msg.sender, "Not your NFT");
        
        // Burn the NFT on this chain
        _burn(tokenId);
        
        // In a full implementation, this would call ZetaChain's connector
        // For now, we emit an event that can be picked up by a relayer
        emit SentToZeta(msg.sender, tokenId);
        
        // TODO: Implement actual ZetaChain connector call
        // This requires ZetaChain's connector contract on BSC
    }
    
    /**
     * @dev Helper function to get all NFTs owned by an address
     */
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
