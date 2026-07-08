import { Address, Deployer } from "../web3webdeploy/types";

export interface DeploymentSettings {
  forceRedeploy?: boolean;
}

export interface Deployment {
  nftClaimer: Address;
}

export async function deploy(
  deployer: Deployer,
  settings?: DeploymentSettings
): Promise<Deployment> {
  if (settings?.forceRedeploy !== undefined && !settings.forceRedeploy) {
    const existingDeployment = await deployer.loadDeployment({
      deploymentName: "NFTClaimer.json",
    });
    if (existingDeployment !== undefined) {
      return existingDeployment;
    }
  }

  const nftClaimer = await deployer
    .deploy({
      id: "OpenxAINFTClaimer",
      contract: "OpenxAINFTClaimer",
      args: ["0xB2834b9001F9E24226172731f34Dc0A6B0940c41"],
    })
    .then((deployment) => deployment.address);

  const deployment = {
    nftClaimer: nftClaimer,
  };
  await deployer.saveDeployment({
    deploymentName: "NFTClaimer.json",
    deployment: deployment,
  });
  return deployment;
}
