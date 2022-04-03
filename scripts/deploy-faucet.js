const hre = require("hardhat");

async function main() {
  const usdc = "0xf940746486Da186aE584f60cF87bA1dd2880A2db";
  Faucet = await ethers.getContractFactory("Faucet");
  Faucet = await Faucet.deploy(usdc);
  await Faucet.deployed();

  console.log("USDC address: ", usdc);
  console.log("Faucet address: ", Faucet.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
// https://mumbai.polygonscan.com/address/0xB1c1F484eaf1Cbd34b82989ea8338360Bb7bC93D#code
