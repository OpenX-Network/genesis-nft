import { Deployer } from "../web3webdeploy/types";

import { OpenxAIGenesisNFTContract } from "../export/GenesisNFT_Base/OpenxAIGenesisNFT";
import { OpenxAINFTClaimerContract } from "../export/NFTClaimer_Base/OpenxAINFTClaimer";

export async function deploy(deployer: Deployer) {
  await deployer.execute({
    id: "MiniAppFactoryGenesisNFTMinterRole",
    abi: "OpenxAIGenesisNFT",
    to: OpenxAIGenesisNFTContract.address,
    function: "grantRole",
    args: [
      deployer.viem.keccak256(deployer.viem.toBytes("MINT")),
      "0x27f7E4e1e10b163FcB20Cb2f3803c556bC7E0EBC",
    ],
    from: "0x3e166454c7781d3fD4ceaB18055cad87136970Ea",
  });

  await deployer.deploy({
    id: "MiniAppFactoryGenesisNFTMinter",
    contract: "MiniAppFactoryGenesisNFTMinter",
    args: [
      OpenxAIGenesisNFTContract.address,
      OpenxAINFTClaimerContract.address,
    ],
  });
}
