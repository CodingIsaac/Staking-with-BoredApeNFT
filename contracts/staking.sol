// SPDX-License-Identifier:MIT
pragma solidity ^0.8.4;

import "./IERC20.sol";
import "./IERC721.sol";

contract Staking {
    // Write a staking smart contract that gives 10% apy
    // Allow only boredape owners to stake

    address kejiToken;
    address boredApe;

    address public stakeOwner;

    struct Info {
        uint256 amount;
        uint256 noOfdays;
    }

    mapping(address => Info) stakes;

    address owner;

    constructor(address _kejiToken, address _boredApe) {
        stakeOwner = msg.sender;
        kejiToken = _kejiToken;
        boredApe = _boredApe;
    }

    // modifier stakingValue() {
    //     require(msg.value > 0, "You can't stake zero TOkens");
    //     _;
    // }

    function stakeTokens(uint256 _amount) external {
        require(_amount > 0, "Zero Token can't be staked");
        require(
            IERC20(kejiToken).balanceOf(msg.sender) >= _amount,
            "Insufficient Balance"
        );
        require(
            IERC721(boredApe).balanceOf(msg.sender) > 0,
            "You must own a Bored Ape before you can stake"
        );

        IERC20(kejiToken).transferFrom(msg.sender, address(this), _amount);
        Info storage stakingData = stakes[msg.sender];
        stakingData.amount = _amount;
        stakingData.noOfdays = block.timestamp;
    }

    function safeWithdrawal() external {
        uint userStake = stakes[msg.sender].amount;
        require(userStake > 0, "Insufficient Balance");
        require(IERC20(kejiToken).balanceOf(address(this)) > userStake, "Insufficient Balance");
        stakes[msg.sender].amount = 0;
        IERC20(kejiToken).transfer(msg.sender, userStake);

    }

    

    function stakingCommission() public view {
        Info memory stakingData = stakes[msg.sender];
        uint balance = stakingData.amount;
        require(balance > 0, "Insufficient Balance");
        require(IERC20(kejiToken).balanceOf(address(this)) >= balance, "Insufficient Balance");
        uint lockedTime = block.timestamp - stakingData.noOfdays;
        uint cumulativeProfit = ((balance / 42000000) * lockedTime);
        cumulativeProfit + balance;
        stakingData.amount = 0;
        // IERC20(kejiToken).transfer(msg.sender, withdrawal);

    }
}
