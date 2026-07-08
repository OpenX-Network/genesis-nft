import { Address, Deployer } from "../web3webdeploy/types";

export interface DeploymentSettings {
  forceRedeploy?: boolean;
}

export interface Deployment {
  genesisNFT: Address;
}

export async function deploy(
  deployer: Deployer,
  settings?: DeploymentSettings
): Promise<Deployment> {
  if (settings?.forceRedeploy !== undefined && !settings.forceRedeploy) {
    const existingDeployment = await deployer.loadDeployment({
      deploymentName: "GenesisNFT.json",
    });
    if (existingDeployment !== undefined) {
      return existingDeployment;
    }
  }

  const genesisNFT = await deployer
    .deploy({
      id: "OpenxAIGenesisNFT",
      contract: "OpenxAIGenesisNFT",
    })
    .then((deployment) => deployment.address);

  const minter = "0x3e166454c7781d3fD4ceaB18055cad87136970Ea";
  await deployer.execute({
    id: "OpenxAIGenesisNFTMinter",
    abi: "OpenxAIGenesisNFT",
    to: genesisNFT,
    function: "grantRole",
    args: [deployer.viem.keccak256(deployer.viem.toBytes("MINT")), minter],
    from: "0x3e166454c7781d3fD4ceaB18055cad87136970Ea",
  });

  const deployment = {
    genesisNFT: genesisNFT,
  };
  await deployer.saveDeployment({
    deploymentName: "GenesisNFT.json",
    deployment: deployment,
  });
  return deployment;
}
