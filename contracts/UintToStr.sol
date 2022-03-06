

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


library UintToStr {
 
function uint2str(uint128 _i) internal pure returns (string memory str) {
        if (_i == 0) return "0";

        uint128 j = _i;
        uint128 length;
        while (j != 0) {
            length++;
            j /= 10;
        }

        bytes memory bstr = new bytes(length);
        uint128 k = length;
        j = _i;
        while (j != 0) {
            bstr[--k] = bytes1(uint8(48 + (j % 10)));
            j /= 10;
        }
        str = string(bstr);
        return str;
    }
}