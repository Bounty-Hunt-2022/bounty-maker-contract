// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const usdc = "0xf940746486Da186aE584f60cF87bA1dd2880A2db";
  BountyMaker = await ethers.getContractFactory("BountyMaker");
  bountymaker = await BountyMaker.deploy(usdc);
  await bountymaker.deployed();

  console.log("USDC address: ", usdc);
  console.log("BountyMaker address: ", bountymaker.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// USDC address:  0xf940746486Da186aE584f60cF87bA1dd2880A2db
// BountyMaker address:  0x0EAFa91212c277014BC446EcB872CA4cecD88663
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
