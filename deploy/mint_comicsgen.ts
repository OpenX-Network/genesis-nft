import { Deployer } from "../web3webdeploy/types";

import { OpenxAIGenesisNFTContract } from "../export/GenesisNFT_Base/OpenxAIGenesisNFT";
import { OpenxAINFTClaimerContract } from "../export/NFTClaimer_Base/OpenxAINFTClaimer";

export async function deploy(deployer: Deployer) {
  await deployer.execute({
    id: "ComicsgenGenesisNFTMint",
    to: OpenxAIGenesisNFTContract.address,
    abi: [...OpenxAIGenesisNFTContract.abi],
    function: "mint",
    args: [OpenxAINFTClaimerContract.address, BigInt(133)],
    from: "0x3e166454c7781d3fD4ceaB18055cad87136970Ea",
  });
}
