// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {
  Ownable
} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {
  EIP712
} from "../lib/openzeppelin-contracts/contracts/utils/cryptography/EIP712.sol";
import {
  ECDSA
} from "../lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol";

import {
  IERC721
} from "../lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";

import {Rescue} from "./Rescue.sol";

bytes32 constant CLAIM_TYPEHASH = keccak256(
  "Claim(address token,address claimer,uint256 tokenId)"
);

contract OpenxAINFTClaimer is Ownable, EIP712, Rescue {
  error InvalidProof();
  error RescueNotAllowed();

  event NFTClaimed(
    address indexed token,
    address indexed account,
    uint256 indexed tokenId
  );

  constructor(
    address _signer
  ) Ownable(_signer) EIP712("OpenxAINFTClaiming", "1") {}

  /// Claim your tokens with a proof from an off-chain signer.
  /// @param _v V component of the server proof signature.
  /// @param _r R component of the server proof signature.
  /// @param _s S component of the server proof signature.
  /// @param _token Which collection is sent.
  /// @param _claimer To which address the NFT is sent.
  /// @param _tokenId Which NFT of the collection is sent.
  function claim(
    uint8 _v,
    bytes32 _r,
    bytes32 _s,
    IERC721 _token,
    address _claimer,
    uint256 _tokenId
  ) external {
    address signer = ECDSA.recover(
      _hashTypedDataV4(
        keccak256(
          abi.encode(CLAIM_TYPEHASH, address(_token), _claimer, _tokenId)
        )
      ),
      _v,
      _r,
      _s
    );
    if (signer != owner()) {
      revert InvalidProof();
    }

    _token.transferFrom(address(this), _claimer, _tokenId);
    emit NFTClaimed(address(_token), _claimer, _tokenId);
  }
}
