import {ERC20} from "./ERC20";
import {AbiUtil} from "../../config/abi/util/abiutil";
import abiParams = AbiUtil.abiParams;
import AbiType = AbiUtil.AbiType;
import getAbiParams = AbiUtil.getAbiParams;

export class TokenAtomicSwap extends ERC20 {

    @abiParams({"": AbiType.uint256})
    public participate(): number {
        return 0;
    }
}