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

/*

Keji Token successfully deployed here:  0x10e38eE9dd4C549b61400Fc19347D00eD3edAfC4
Token Owner 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Here is the Owner's Balance BigNumber { value: "2000000000000000000000000" }
Signer address 0xBe13cdaD7Df8Bd3C7f481b78DdB09314313c33e3
Mint Transaction {
  to: '0x10e38eE9dd4C549b61400Fc19347D00eD3edAfC4',
  from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  contractAddress: null,
  transactionIndex: 0,
  gasUsed: BigNumber { value: "52339" },
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000102100000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000200000000000000000000000002000000000000000004000000000000000000008000000000000000004000000000000000000000000000000',
  blockHash: '0x278cac3369a0748e8a07e0d8bdb8d85d18e0093b0b1ff628bf1ab02345dd491e',
  transactionHash: '0x4ad043ad8a8a324a266c5fc2100a7a6df550b459159a2a712b23c3ae4f17204c',
  logs: [
    {
      transactionIndex: 0,
      blockNumber: 15662185,
      transactionHash: '0x4ad043ad8a8a324a266c5fc2100a7a6df550b459159a2a712b23c3ae4f17204c',
      address: '0x10e38eE9dd4C549b61400Fc19347D00eD3edAfC4',
      topics: [Array],
      data: '0x00000000000000000000000000000000000000000000003635c9adc5dea00000',
      logIndex: 0,
      blockHash: '0x278cac3369a0748e8a07e0d8bdb8d85d18e0093b0b1ff628bf1ab02345dd491e'
    }
  ],
  blockNumber: 15662185,
  confirmations: 1,
  cumulativeGasUsed: BigNumber { value: "52339" },
  effectiveGasPrice: BigNumber { value: "4034237906" },
  status: 1,
  type: 2,
  byzantium: true,
  events: [
    {
      transactionIndex: 0,
      blockNumber: 15662185,
      transactionHash: '0x4ad043ad8a8a324a266c5fc2100a7a6df550b459159a2a712b23c3ae4f17204c',
      address: '0x10e38eE9dd4C549b61400Fc19347D00eD3edAfC4',
      topics: [Array],
      data: '0x00000000000000000000000000000000000000000000003635c9adc5dea00000',
      logIndex: 0,
      blockHash: '0x278cac3369a0748e8a07e0d8bdb8d85d18e0093b0b1ff628bf1ab02345dd491e',
      args: [Array],
      decode: [Function (anonymous)],
      event: 'Transfer',
      eventSignature: 'Transfer(address,address,uint256)',
      removeListener: [Function (anonymous)],
      getBlock: [Function (anonymous)],
      getTransaction: [Function (anonymous)],
      getTransactionReceipt: [Function (anonymous)]
    }
  ]
}
Signer Bal BigNumber { value: "1000000000000000000000" }

*/
