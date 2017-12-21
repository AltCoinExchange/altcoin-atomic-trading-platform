import {ERC20} from "./ERC20";
import {AbiUtil} from "../../config/abi/util/abiutil";
import abiParams = AbiUtil.abiParams;
import AbiType = AbiUtil.AbiType;
import getAbiParams = AbiUtil.getAbiParams;
import {EthConfirmation} from "../eth-engine";
import {EthExtractSecretParams} from "../atomic-swap/eth-extract-secret-params";
import {EthExtractSecretData} from "../atomic-swap/eth-extract-secret-data";
import {TokenAtomicSwapAbi} from "../../config/abi/tokenatomicswap";

export class TokenAtomicSwap extends ERC20 {

  @abiParams({}, {}, {"_hashedSecret": AbiType.bytes20}, {"_initiator": AbiType.address},
    {"_token": AbiType.address}, {"_amount": AbiType.uint256})
  public async participate(hashedSecret: string, initiator: string, token: string, amount: number): Promise<any> {
    const abi = getAbiParams(this, "participate");

    const generalParams = {
      from: this.ethEngine.configuration.defaultWallet
    };

    const result: any = await this.ethEngine.callFunction("participate", [hashedSecret, initiator, token, amount], generalParams, EthConfirmation.RECEIPT, abi, this.contractAddress);
    return result;
  }

  @abiParams({}, {}, {"_hashedSecret": AbiType.bytes20}, {"_participant": AbiType.address},
    {"_token": AbiType.address}, {"_amount": AbiType.uint256})
  public async initiate(hashedSecret: string, participant: string, token: string, amount: number): Promise<any> {
    const abi = getAbiParams(this, "initiate");

    const generalParams = {
      from: this.ethEngine.configuration.defaultWallet
    };

    const result: any = await this.ethEngine.callFunction("initiate", [hashedSecret, participant, token, amount], generalParams, EthConfirmation.RECEIPT, abi, this.contractAddress);
    return result;
  }

  @abiParams({}, {}, {"_hashedSecret": AbiType.bytes20})
  public async refund(hashedSecret: string): Promise<any> {
    const abi = getAbiParams(this, "refund");

    const generalParams = {
      from: this.ethEngine.configuration.defaultWallet
    };

    const result: any = await this.ethEngine.callFunction("refund", [hashedSecret], generalParams, EthConfirmation.RECEIPT, abi, this.contractAddress);
    return result;
  }

  @abiParams({}, {}, {"_secret": AbiType.bytes32}, {"_hashedSecret": AbiType.bytes20})
  public async redeem(secret: string, hashedSecret: string): Promise<any> {
    const abi = getAbiParams(this, "redeem");

    const generalParams = {
      from: this.ethEngine.configuration.defaultWallet
    };

    const result: any = await this.ethEngine.callFunction("redeem", [secret, hashedSecret], generalParams, EthConfirmation.RECEIPT, abi, this.contractAddress);
    return result;
  }

  public async extractSecret(hashedSecret: string): Promise<any> {
    const params = {
      from: this.ethEngine.configuration.defaultWallet
    };

    return await this.ethEngine.callFunction("swaps", [hashedSecret], params, EthConfirmation.STATIC, TokenAtomicSwapAbi).then((resp) => {
      // TODO map the fields to ethExtractSecretData
      const secretData = new EthExtractSecretData();
      return secretData;
    });
  }
}