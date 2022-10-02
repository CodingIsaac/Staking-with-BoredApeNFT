Description 
<hr>

Staking Contract for Bored Ape Holders
<hr>
The contract is a basic staking smart contract where only users who own Bored Ape Token can stake tokens into the contract.

The functions are specifically divided into stake, withdraw and specific withdrawal. This is to allow users interact seemlessly with our smart contract

<hr>

Steps to Interact with the contract 
<hr>
1. Create an ERC20 token. <hr>
2. Get a bored ape holder from the mainet. <hr>
3. Fork the mainnet localhost using the command line below. <hr>

 ### npx hardhat node --fork https://eth-mainnet.alchemyapi.io/v2/<key> 

<hr>

Interacting with the smart contract.
<hr>
## deploy.ts 
1. Deploy your smart contract using the necessary ethers.js scripts <hr>
2. To make the deploying complete, get a Bored Ape NFT holder on Mainnet <hr>
3. Impersonate the Bored Ape Account.
4. You can equally check the balance of the smart contract. <hr>

## staking.ts

Freely deploy the staking smart contract. 
<hr>

Bear in mind that all of these interactions is done on local network.