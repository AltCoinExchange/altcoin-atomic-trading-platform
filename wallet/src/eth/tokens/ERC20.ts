import "reflect-metadata";
import {AbiUtil, AbiType, abiParams} from "../../config/abi/util/abiutil";
import {EthEngine, EthConfirmation} from "../eth-engine";

export class ERC20 extends EthEngine {

  className: string;
  contractAddress: string;

  public constructor(className: string, contractAddress: string, private config) {
    super(null, config, null);
    this.className = className;
    this.contractAddress = contractAddress;
  }

  @abiParams("Augur", {"": AbiType.UINT256})
  public totalSupply(): number {
    return 0;
  }

  @abiParams("Augur", {"balance": AbiType.UINT256})
  public async balanceOf(owner: string): Promise<number> {

    const abi = AbiUtil.getAbiParams(this, "balanceOf");

    const params = {
      from: this.config.defaultWallet
    };

    const result: any = await this.callFunction("balanceOf", [], params, EthConfirmation.STATIC, abi, this.contractAddress);
    return parseInt(result);
  }

  @abiParams("Augur", {"": AbiType.BOOL}, {"_to": AbiType.ADDRESS}, {"_value": AbiType.UINT256})
  public transfer(to: string, value: number): boolean {
    return true;
  }

  @abiParams("Augur", {"": AbiType.BOOL},
    {"_from": AbiType.UINT256}, {"_to": AbiType.ADDRESS}, {"_value": AbiType.UINT256})
  public transferFrom(from: string, to: string, value: number): boolean {
    return true;
  }

  @abiParams("Augur", {"": AbiType.BOOL}, {"_spender": AbiType.ADDRESS}, {"_value": AbiType.UINT256})
  public approve(spender: string, value: number): boolean {
    return true;
  }

  @abiParams("Augur", {"": AbiType.UINT256}, {"_owner": AbiType.ADDRESS}, {"_spender": AbiType.ADDRESS})
  public allowance(owner: string, spender: string): number {
    return 0;
  }

  // TODO: Add events
  // event Transfer(address indexed _from, address indexed _to, uint _value);
  // event Approval(address indexed _owner, address indexed _spender, uint _value);
}