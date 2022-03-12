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
  // mumbai -- USDC address:  0x00f845150ac545C6c4185621553C1A74BB0e64dD
  // mumbai -- BountyMaker address:  0x1E0d0f87D3EbC2F4E928FbD629cEf92f2619a202
  console.log("BountyMaker address: ", bountymaker.address);

  const bountyId = "VVS";
  const uri = "ipfs://QmadNLJKXgonAQxJxfHg9fd5PhRwTYvCfPBjEL7oYPNbHo/";
  const tokenLimit = 5;
  const rewards = [300, 200, 100];

  const bounty1 = await bountymaker.createBounty(
    bountyId,
    uri,
    tokenLimit,
    rewards,
    "1645776468"
  );

  await bounty1.wait();

  const bountyId1 = "DVS";
  const uri1 = "ipfs://QmadNLJKXgonAQxJxfHg9fd5PhRwTYvCfPBjEL7oYPNbHo/";
  const tokenLimit1 = 5;
  const rewards1 = [1200, 500, 300, 200, 100];

  const bounty2 = await bountymaker.createBounty(
    bountyId1,
    uri1,
    tokenLimit1,
    rewards1,
    "1645776468"
  );

  await bounty2.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
