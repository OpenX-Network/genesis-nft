// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {OpenxAIGenesisNFT} from "./OpenxAIGenesisNFT.sol";

import {Rescue} from "./Rescue.sol";

contract MiniAppFactoryGenesisNFTMinter {
  constructor(OpenxAIGenesisNFT collection, address to) {
    for (uint i = 0; i < 131; i++) {
      collection.mint(to, i);
    }
  }
}
