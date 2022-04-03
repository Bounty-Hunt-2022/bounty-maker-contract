// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  USDC = await ethers.getContractFactory("USDC");
  usdc = await USDC.deploy();
  await usdc.deployed();

  BountyMaker = await ethers.getContractFactory("BountyMaker");
  bountymaker = await BountyMaker.deploy(usdc.address);
  await bountymaker.deployed();

  const tokenApproval = await usdc.approve(
    bountymaker.address,
    "100000000000000000000000000"
  );
  // wait until the transaction is mined
  await tokenApproval.wait();

  console.log("USDC address: ", usdc.address);
  // mumbai -- USDC address:  0xf940746486Da186aE584f60cF87bA1dd2880A2db
  // mumbai -- BountyMaker address:  0x0418dFcE00faDE89CAbD7B5C970642f026888E48
  console.log("BountyMaker address: ", bountymaker.address);

  const bountyId =
    "bafybeighqebtphpfruehch2emzmvzifqfhj2sqzr2aihs2vwhix6iuilkq";
  const uri =
    "ipfs://bafybeiei2c656ir7t5h3qba6vuigvcwzicq73jie74dykkgrkqnjw2l4ve/";
  const tokenLimit = 1;
  const rewards = [300];
  // const metadata =
  //   "bafyreicozsptpehkqt6cdz5kweewnfqmakav3tvyonad5wgdzt6mnzkfaa";

  const bounty1 = await bountymaker.createBounty(
    bountyId,
    uri,
    // metadata,
    tokenLimit,
    rewards,
    "1651289625"
  );

  await bounty1.wait();

  const setWinnersTx1 = await bountymaker.setBountyWinners(bountyId, [
    "0x40d5250D1ce81fdD1F0E0FB4F471E57AA0c1FaD3",
  ]);

  await setWinnersTx1.wait();

  const winnerClaim1 = await bountymaker.adminClaimToken(
    bountyId,
    "0x40d5250D1ce81fdD1F0E0FB4F471E57AA0c1FaD3"
  );
  await winnerClaim1.wait();

  console.log(
    "Balance of 0x40d5250D1ce81fdD1F0E0FB4F471E57AA0c1FaD3: ",
    await bountymaker.balanceOf("0x40d5250D1ce81fdD1F0E0FB4F471E57AA0c1FaD3")
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
