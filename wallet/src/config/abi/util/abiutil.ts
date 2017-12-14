/* tslint:disable */
export module AbiUtil {

  export enum AbiType {
    uint = 0,
    uint256 = 1,
    address = 2,
    bool = 3,
    bytes32 = 4,
  }

  // DUH! Do not include reflect-metadata module
  declare abstract class Reflect {
    public static getMetadata(metadataKey:any, target:Object, targetKey:string | symbol):any;
    public static getOwnMetadata(metadataKey: any, target: Object, targetKey: string | symbol): any;
    public static getOwnMetadata(metadataKey: any, target: Object): any;
    public static defineMetadata(metadataKey: any, metadataValue: any, target: Object, targetKey?: string | symbol): void;
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
        params.forEach((v) => {
          for (let ret in v) {
            if (v.hasOwnProperty(ret)) {
              root.inputs.push({"name": ret, "type": AbiType[v[ret]]});
            }
          }
        });
      }

      for (let ret in returnType) {
        if (returnType.hasOwnProperty(ret)) {
          root.outputs.push({"name": ret, "type": AbiType[returnType[ret]]});
        }
      }

      let rootData = [];
      rootData.push(root);

      Reflect.defineMetadata("abiParams", rootData, target, functionName);
    };
  };

   export const getAbiParams = (target: any, propertyKey: string) => {
      return Reflect.getMetadata("abiParams", target, propertyKey);
   }
}