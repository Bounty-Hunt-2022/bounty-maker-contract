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

  const bountyId = "VVS";
  const uri = "ipfs://QmadNLJKXgonAQxJxfHg9fd5PhRwTYvCfPBjEL7oYPNbHo/";
  const tokenLimit = 3;
  const rewards = [300];
  const metadata =
    "bafyreicozsptpehkqt6cdz5kweewnfqmakav3tvyonad5wgdzt6mnzkfaa";

  const bounty1 = await bountymaker.createBounty(
    bountyId,
    uri,
    metadata,
    tokenLimit,
    rewards,
    "1679706514"
  );

  await bounty1.wait();

  const setWinnersTx1 = await bountymaker.setBountyWinners(bountyId, [
    "0x40d5250D1ce81fdD1F0E0FB4F471E57AA0c1FaD3",
    "0xD253eDAF1B53a2E0e5E1B8021ba4937D21806dd3",
    "0xfe6f2a79b3Ae6b9FeC15d340Bfe23E6e3Ac4Cf3c",
  ]);

  await setWinnersTx1.wait();

  const bountyId1 = "DVS";
  const uri1 = "ipfs://QmadNLJKXgonAQxJxfHg9fd5PhRwTYvCfPBjEL7oYPNbHo/";
  const tokenLimit1 = 3;
  const rewards1 = [1200, 500, 300];

  const bounty2 = await bountymaker.createBounty(
    bountyId1,
    uri1,
    metadata,
    tokenLimit1,
    rewards1,
    "1679706514"
  );

  await bounty2.wait();

  const setWinnersTx2 = await bountymaker.setBountyWinners(bountyId1, [
    "0x40d5250D1ce81fdD1F0E0FB4F471E57AA0c1FaD3",
    "0xD253eDAF1B53a2E0e5E1B8021ba4937D21806dd3",
    "0xfe6f2a79b3Ae6b9FeC15d340Bfe23E6e3Ac4Cf3c",
  ]);

  await setWinnersTx2.wait();

  const winnerClaim1 = await bountymaker.adminClaimToken(
    bountyId1,
    "0x40d5250D1ce81fdD1F0E0FB4F471E57AA0c1FaD3"
  );
  await winnerClaim1.wait();
  const winnerClaim2 = await bountymaker.adminClaimToken(
    bountyId,
    "0xD253eDAF1B53a2E0e5E1B8021ba4937D21806dd3"
  );
  await winnerClaim2.wait();

  console.log(
    "Balance of 0x40d5250D1ce81fdD1F0E0FB4F471E57AA0c1FaD3: ",
    await bountymaker.balanceOf("0x40d5250D1ce81fdD1F0E0FB4F471E57AA0c1FaD3")
  );
  console.log(
    "Balance of 0xD253eDAF1B53a2E0e5E1B8021ba4937D21806dd3: ",
    await bountymaker.balanceOf("0xD253eDAF1B53a2E0e5E1B8021ba4937D21806dd3")
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
