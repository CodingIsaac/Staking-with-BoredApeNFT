const hre = require("hardhat");
import { ethers } from "hardhat";

async function main() {
  const KejiToken = await ethers.getContractFactory("KejiToken");
  const token = await KejiToken.deploy();
  await token.deployed();

  console.log("Keji Token successfully deployed here: ", token.address);

  const tokenOwner = await token.controller();
  console.log("Token Owner", tokenOwner);

  const ownerBalance = await token.balanceOf(tokenOwner);
  console.log("Here is the Owner's Balance", ownerBalance);

  const boredApeHolder = "0xbe13cdad7df8bd3c7f481b78ddb09314313c33e3";

  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [boredApeHolder],
});

  const signer = await ethers.getSigner(boredApeHolder);
  const amount = ethers.utils.parseUnits("1000");

  console.log("Signer address",signer.address);

  const transferToken = await token.transfer(signer.address, amount);
  const transferWaited = await transferToken.wait();

  console.log("Mint Transaction", transferWaited);

  const signerBal = await token.balanceOf(signer.address);
  console.log("Signer Bal", signerBal);
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// Keji Token successfully deployed here:  0x403ba57CFf41d26C874e62796CEC5F68fC632C6E
// Token Owner 0xAA5AC6134633183C81436499fb38748D128e039b
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


