
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Faucet {
    uint256 constant public tokenAmount = 100000000000000000000;
    uint256 constant public waitTime = 30 minutes;

    IERC20 public tokenInstance;
    
    mapping(address => uint256) lastAccessTime;

    constructor(IERC20 _tokenInstance) public {
        tokenInstance = _tokenInstance;
    }

    function requestTokens() public {
        require(allowedToWithdraw(msg.sender));
        tokenInstance.transfer(msg.sender, tokenAmount);
        lastAccessTime[msg.sender] = block.timestamp + waitTime;
    }

    function allowedToWithdraw(address _address) public view returns (bool) {
        if(lastAccessTime[_address] == 0) {
            return true;
        } else if(block.timestamp >= lastAccessTime[_address]) {
            return true;
        }
        return false;
    }
}