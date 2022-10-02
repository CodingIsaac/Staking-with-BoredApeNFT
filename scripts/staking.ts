import { ethers } from "hardhat";

const main =async () => {
    const stakingContract = await ethers.getContractFactory("Staking");
    const stake = await stakingContract.deploy("0x27205FeCF3D371d4A9587B4fa72C2480Ef6B961a", "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D");
    await stake.deployed();
    console.log("Staking Contract deployed here: ", stake.address);

    

//     Staking Contract deployed here:  0x3402EC02B0D81d1a10207B2Bb5fA948f4eD764a8
// The admin is 0xAA5AC6134633183C81436499fb38748D128e039b
// Staking Contract deployed here:  0xA0c0624bdCa25871d01883f88Fb4dB51E4B5421E
// The admin is 0xAA5AC6134633183C81436499fb38748D128e039b
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
