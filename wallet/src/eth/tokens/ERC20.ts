import "reflect-metadata";
import "../util/abiutil";
import {EthEngine} from "../eth-engine";

// TODO: Extends engine to invoke contract functions
export class ERC20 extends EthEngine {

  className: string;
  contractAddress: string;

  public constructor(className: string, contractAddress: string, private config) {
    super(null, config, null);
    this.className = className;
    this.contractAddress = contractAddress;
  }

  /**
   * Assemble contract ABI with specific class name
   * @param {string} className
   * @returns {any}
   */
  public getContractAbi(className: string): any {

  }

  @abiParams("Augur", "totalSupply", {"": AbiType.UINT256}, "")
  public totalSupply(): number {
    return 0;
  }

  @abiParams("Augur", "balanceOf", {"balance": AbiType.UINT256}, "")
  public async balanceOf(owner: string): Promise<number> {
    const abi = getAbiParams(this, "balanceOf");
    this.createContract(this.contractAddress, abi);

    const params = {
      from: this.config.defaultWallet
    };

    const result: any = await this.callFunction("balanceOf", [], params);
    return parseInt(result.balance);
  }

  @abiParams("Augur", "transfer", {"": AbiType.BOOL}, {"_to": AbiType.ADDRESS}, {"_value": AbiType.UINT256})
  public transfer(to: string, value: number): boolean {
    return true;
  }

  @abiParams("Augur", "transferFrom", {"": AbiType.BOOL},
    {"_from": AbiType.UINT256}, {"_to": AbiType.ADDRESS}, {"_value": AbiType.UINT256})
  public transferFrom(from: string, to: string, value: number): boolean {
    return true;
  }

  @abiParams("Augur", "approve", {"": AbiType.BOOL}, {"_spender": AbiType.ADDRESS}, {"_value": AbiType.UINT256})
  public approve(spender: string, value: number): boolean {
    return true;
  }

  @abiParams("Augur", "allowance", {"": AbiType.UINT256}, {"_owner": AbiType.ADDRESS}, {"_spender": AbiType.ADDRESS})
  public allowance(owner: string, spender: string): number {
    return 0;
  }

  // TODO: Add events
  // event Transfer(address indexed _from, address indexed _to, uint _value);
  // event Approval(address indexed _owner, address indexed _spender, uint _value);
}