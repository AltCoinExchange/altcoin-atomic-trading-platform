enum AbiType {
  NONE = "",
  UINT = "uint",
  UINT256 = "uint256",
  ADDRESS = "address",
  BOOL = "bool",
  BYTES32 = "bytes32"
}

function abiParams(className: string, functionName: string, returnType: any, ...params) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): any {

    let root = {} as any;
    root.inputs = [];
    root.constant = false;
    root.outputs = [];
    root.name = functionName;
    root.type = "function";
    root.payable = false;
    root.stateMutability = "nonpayable"; // TODO Fix if needed
    params.forEach((v, k) => root.inputs.push({"name": k, "type": v.toString()}));
    returnType.forEach((v, k) => root.outputs.push({"name": k, "type": v.toString()}));

    let rootData = {} as any;
    rootData[className] = [];
    rootData.push(root);

    return Reflect.metadata("abiParams_" + functionName, rootData);
  };
}

function getAbiParams(target: any, propertyKey: string) {
  return Reflect.getMetadata("abiParams" + propertyKey, target, propertyKey);
}

function returns(name: string, v: AbiType) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value = new Map<string, AbiType>().set(name, v);
  };
}