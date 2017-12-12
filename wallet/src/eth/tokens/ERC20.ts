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

  @abiParams({"": AbiType.UINT256})
  public totalSupply(): number {
    return 0;
  }

  @abiParams({"balance": AbiType.UINT256})
  public async balanceOf(owner: string): Promise<any> {

    const abi = AbiUtil.getAbiParams(this, "balanceOf");

    const params = {
      from: this.config.defaultWallet
    };

    const result: any = await this.callFunction("balanceOf", [], params, EthConfirmation.STATIC, abi, this.contractAddress);
    return result;
  }

  @abiParams({"": AbiType.BOOL}, {"_to": AbiType.ADDRESS}, {"_value": AbiType.UINT256})
  public async transfer(to: string, value: number): Promise<any> {
    const abi = AbiUtil.getAbiParams(this, "transfer");

    const configParams = {
      from: this.config.defaultWallet
    };

    const result: any = await this.callFunction("transfer", [to, value], configParams, EthConfirmation.STATIC, abi, this.contractAddress);
    return result;
  }

  @abiParams({"": AbiType.BOOL},
    {"_from": AbiType.UINT256}, {"_to": AbiType.ADDRESS}, {"_value": AbiType.UINT256})
  public async transferFrom(from: string, to: string, value: number): Promise<any> {
    const abi = AbiUtil.getAbiParams(this, "transferFrom");

    const configParams = {
      from: this.config.defaultWallet
    };

    const result: any = await this.callFunction("transferFrom", [from, to, value], configParams, EthConfirmation.STATIC, abi, this.contractAddress);
    return result;
  }

  @abiParams({"": AbiType.BOOL}, {"_spender": AbiType.ADDRESS}, {"_value": AbiType.UINT256})
  public async approve(spender: string, value: number): Promise<any> {
    const abi = AbiUtil.getAbiParams(this, "approve");

    const configParams = {
      from: this.config.defaultWallet
    };

    const result: any = await this.callFunction("approve", [spender, value], configParams, EthConfirmation.STATIC, abi, this.contractAddress);
    return result;
  }

  @abiParams({"": AbiType.UINT256}, {"_owner": AbiType.ADDRESS}, {"_spender": AbiType.ADDRESS})
  public async allowance(owner: string, spender: string): Promise<any> {
    const abi = AbiUtil.getAbiParams(this, "allowance");

    const configParams = {
      from: this.config.defaultWallet
    };

    const result: any = await this.callFunction("allowance", [owner, spender], configParams, EthConfirmation.STATIC, abi, this.contractAddress);
    return result;
  }

  // TODO: Add events
  // event Transfer(address indexed _from, address indexed _to, uint _value);
  // event Approval(address indexed _owner, address indexed _spender, uint _value);
}