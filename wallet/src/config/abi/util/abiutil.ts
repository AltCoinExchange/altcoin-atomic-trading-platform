export enum AbiType {
  NONE = "",
  UINT = "uint",
  UINT256 = "uint256",
  ADDRESS = "address",
  BOOL = "bool",
  BYTES32 = "bytes32"
}

export const abiParams = (returnType: any, ...params) => {
    return (target: any, functionName: string, descriptor: PropertyDescriptor) => {
      let root = {} as any;
      root.inputs = [];
      root.constant = false;
      root.outputs = [];
      root.name = functionName;
      root.type = "function";
      root.payable = false; // TODO: Add as optional parameter later if needed
      root.stateMutability = "nonpayable"; // TODO Fix if needed
      if (params) {
        params.forEach((v, k) => root.inputs.push({"name": k, "type": v.toString()}));
      }

      for (let ret in returnType) {
        if (returnType.hasOwnProperty(ret)) {
          root.outputs.push({"name": ret, "type": returnType[ret].toString()});
        }
      }

      let rootData = [];
      rootData.push(root);

      Reflect.defineMetadata("abiParams", rootData, target, functionName);
    };
  };

export class AbiUtil {
  public static getAbiParams(target: any, propertyKey: string) {
    return Reflect.getMetadata("abiParams", target, propertyKey);
  }
}