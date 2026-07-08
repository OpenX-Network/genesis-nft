export const MiniAppFactoryGenesisNFTMinterContract = {
  address: "0x27f7E4e1e10b163FcB20Cb2f3803c556bC7E0EBC",
  abi: [
    {
      type: "constructor",
      inputs: [
        {
          name: "collection",
          type: "address",
          internalType: "contract OpenxAIGenesisNFT",
        },
        { name: "to", type: "address", internalType: "address" },
      ],
      stateMutability: "nonpayable",
    },
  ],
} as const;
