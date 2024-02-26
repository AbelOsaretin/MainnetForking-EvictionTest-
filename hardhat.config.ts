// import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";

// const config: HardhatUserConfig = {
//   solidity: "0.8.24",
//   networks: {
//     hardhat: {
//       //chainId: 31337,
//       forking: {
//         url: "https://eth-mainnet.g.alchemy.com/v2/gVrsysD5dqxf_hIaQVZM1h_Ff_465vVp",
//         blockNumber: 19203595,
//       },
//       gas: "auto",
//       //gasPrice: 25023148180,
//     },
//   },
// };

// export default config;

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL;

module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      //chainId: 31337,
      forking: {
        url: MAINNET_RPC_URL,
        blockNumber: 19203595,
      },
      gas: "auto",
      //gasPrice: 25023148180,
    },
  },
};
