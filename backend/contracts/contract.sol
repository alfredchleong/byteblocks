// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract KnotAPI {
    // Storage variables
    address public owner;
    uint256 public ethTokenBalance;
    
    // Events
    event EthTokenMinted(address indexed to, uint256 amount);
    event KnotAPIAuthenticated(address indexed user);
    event ProductAddedToCart(address indexed user, string productId);
    event CheckoutCompleted(address indexed user);

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    // Functions
    function mintEthToken() public {
        ethTokenBalance += 1 ether;
        emit EthTokenMinted(msg.sender, 1 ether);
    }

    function authenticate() public {
        emit KnotAPIAuthenticated(msg.sender);
    }

    function addProductToCart() public {
        string memory productId = "B0B6WWVLP9";
        emit ProductAddedToCart(msg.sender, productId);
    }

    function checkout() public {
        emit CheckoutCompleted(msg.sender);
    }

    // Fallback function to handle incoming transactions
    receive() external payable {
        mintEthToken();
        authenticate();
        addProductToCart();
        checkout();
    }
}