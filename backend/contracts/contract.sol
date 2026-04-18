// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract YuminCoin {
    // Storage variables
    address public owner;
    mapping(address => uint256) public balances;
    mapping(bytes32 => bytes32) public keyValueStore;

    // Events
    event YuminMinted(address indexed minter);
    event KeyValueStored(bytes32 indexed key, bytes32 value);

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    // Functions
    function mint() public {
        balances[msg.sender] += 1;
        emit YuminMinted(msg.sender);
    }

    function storeKeyValue(bytes32 key, bytes32 value) public {
        keyValueStore[key] = value;
        emit KeyValueStored(key, value);
    }
}