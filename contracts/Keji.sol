// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KejiToken is ERC20, Ownable {
    uint256 public constant maxTotalSupply = 2000000 * 10**18;
    address public controller;

    constructor() ERC20("Keji Token", "KEJ") {
        controller = msg.sender;
        _mint(address(this), maxTotalSupply);
        _mint(controller, 2000000 * 10**18);
    }

    function mint(uint256 _amount, address _addr) internal {
        _mint(_addr, _amount);
    }
}
