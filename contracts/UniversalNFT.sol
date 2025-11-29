// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UniversalNFT is ERC721, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("Universal NFT", "UNFT") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function mint(address to) external onlyOwner returns (uint256) {
        uint256 newId = tokenCounter;
        _mint(to, newId);
        tokenCounter += 1;
        return newId;
    }
}
