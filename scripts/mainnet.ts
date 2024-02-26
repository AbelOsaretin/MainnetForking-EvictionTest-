import { ethers } from "hardhat";
// import "../contracts/IUniswap.sol";
// import "../contracts/IERC20.sol";

async function main() {
  //   const impersonatedSigner = await ethers.getImpersonatedSigner(
  //     "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621"
  //   );

  const helpers = require("@nomicfoundation/hardhat-toolbox/network-helpers");

  const address = "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621";
  await helpers.impersonateAccount(address);
  const impersonatedSigner = await ethers.getSigner(address);

  const showBalance = await impersonatedSigner.provider.getBalance(
    impersonatedSigner
  );
  console.log("User Ether Balance Before Transaction:", showBalance);

  const UNIRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const wethAdress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

  const USDC = await ethers.getContractAt("IERC20", USDCAddress);
  const DAI = await ethers.getContractAt("IERC20", DAIAddress);
  const WETH = await ethers.getContractAt("IERC20", wethAdress);

  const ROUTER = await ethers.getContractAt("IUniswap", UNIRouter);

  const deadline = Math.floor(Date.now() / 1000) + 60 * 10;

  const USDCAmount = ethers.parseUnits("272304");

  const approveTX = await USDC.connect(impersonatedSigner).approve(
    UNIRouter,
    USDCAmount
  );
  await approveTX.wait();

  const DAIAmount = ethers.parseUnits("272304");

  const approveDaiTX = await DAI.connect(impersonatedSigner).approve(
    UNIRouter,
    DAIAmount
  );

  await approveDaiTX.wait();

  const ethBal = await impersonatedSigner.provider.getBalance(
    impersonatedSigner
  );
  const wethBal = await WETH.balanceOf(impersonatedSigner.address);

  const usdcBal = await USDC.balanceOf(impersonatedSigner.address);
  const daiBal = await DAI.balanceOf(impersonatedSigner.address);

  // console.log("WETH Balance:", ethers.formatUnits(wethBal, 18));
  // console.log("ETH Balance:", ethers.formatUnits(ethBal, 18));
  console.log(
    "USDC Balance Before Transaction:",
    ethers.formatUnits(usdcBal, 6)
  );
  console.log(
    "DAI Balance Before Transaction:",
    ethers.formatUnits(daiBal, 18)
  );

  console.log(
    "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );

  console.log(
    "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );
  console.log(
    "---------------------------------Adding Token to Token Liquidity-------------------------------------------"
  );

  const addLiqudityTX = await ROUTER.connect(impersonatedSigner).addLiquidity(
    USDCAddress,
    DAIAddress,
    USDCAmount,
    DAIAmount,
    0,
    0,
    impersonatedSigner,
    deadline,
    {
      gasPrice: ethers.parseEther("0.000000023858208971"),
      gasLimit: ethers.parseEther("0.00000000003"),
    }
  );

  await addLiqudityTX.wait();
  //console.log(addLiqudityTX);
  console.log(
    "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );
  console.log(
    "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );

  console.log(
    "---------------------------------Token to Token Liquidity Added-------------------------------------------"
  );

  const usdcBalAfter = await USDC.balanceOf(impersonatedSigner.address);
  const daiBalfter = await DAI.balanceOf(impersonatedSigner.address);

  const showBalanceafter = await impersonatedSigner.provider.getBalance(
    impersonatedSigner
  );

  console.log(
    "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );

  console.log(
    "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );
  console.log(
    "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );

  console.log("User New Ether Balance is:", showBalanceafter);

  console.log("New USDC Balance:", ethers.formatUnits(usdcBalAfter, 6));
  console.log("New DAI Balance:", ethers.formatUnits(daiBalfter, 18));

  console.log(
    "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );

  console.log(
    "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );
  console.log(
    "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );

  console.log(
    "---------------------------------Adding Ethers to Token Liquidity-------------------------------------------"
  );

  console.log(
    "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );

  console.log(
    "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );
  console.log(
    "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );

  const showEthersBalanceBefore = await impersonatedSigner.provider.getBalance(
    impersonatedSigner
  );

  console.log(
    "Ethers Balance Before Adding Liquidity",
    showEthersBalanceBefore
  );

  const usdcEthersBalBefore = await USDC.balanceOf(impersonatedSigner.address);
  console.log("USDC Balance Before Adding Liquidity", usdcEthersBalBefore);

  const USDCEthersAmount = ethers.parseUnits("33905427907481");

  const approveUSDCEthersTX = await USDC.connect(impersonatedSigner).approve(
    UNIRouter,
    USDCEthersAmount
  );
  await approveUSDCEthersTX.wait();

  const ethersAmount = await ethers.parseEther("10");

  const addEthersLiquidityTX = await ROUTER.connect(
    impersonatedSigner
  ).addLiquidityETH(
    USDCAddress,
    3390542790,
    ethersAmount,
    0,
    impersonatedSigner,
    deadline,
    { value: ethers.parseEther("100") }
  );

  await addEthersLiquidityTX.wait();
  console.log(
    "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );

  console.log(
    "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );
  console.log(
    "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );

  console.log(
    "---------------------------------Ethers to Token Liquidity Added-------------------------------------------"
  );

  console.log(
    "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );

  console.log(
    "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );
  console.log(
    "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );

  const showEthersBalanceAfter = await impersonatedSigner.provider.getBalance(
    impersonatedSigner
  );

  console.log(
    "Ethers Balance After Succefully Adding Liquidity",
    showEthersBalanceAfter
  );
  const usdcEthersBalAfter = await USDC.balanceOf(impersonatedSigner.address);
  console.log(
    "USDC Balance After Succefully Adding Liquidity",
    usdcEthersBalAfter
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
