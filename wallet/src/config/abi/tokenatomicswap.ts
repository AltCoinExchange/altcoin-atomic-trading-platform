export const TokenAtomicSwapAbi = [
  {
    constant: false,
    inputs: [
      {
        name: "_hashedSecret",
        type: "bytes20",
      },
      {
        name: "_initiator",
        type: "address",
      },
      {
        name: "_token",
        type: "address",
      },
      {
        name: "_amount",
        type: "uint256",
      }],
    name: "participate",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_hashedSecret",
        type: "bytes20",
      },
      {
        name: "_participant",
        type: "address",
      },
      {
        name: "_token",
        type: "address",
      },
      {
        name: "_amount",
        type: "uint256",
      }],
    name: "initiate",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_hashedSecret",
        type: "bytes20",
      }],
    name: "refund",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{
      name: "_secret",
      type: "bytes32",
    },
      {
        name: "_hashedSecret",
        type: "bytes20",
      }],
    name: "redeem",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "bytes20",
      }],
    name: "swaps",
    outputs: [
      {
        name: "initTimestamp",
        type: "uint256",
      },
      {
        name: "refundTime",
        type: "uint256",
      },
      {
        name: "hashedSecret",
        type: "bytes20",
      },
      {
        name: "secret",
        type: "bytes32",
      },
      {
        name: "initiator",
        type: "address",
      },
      {
        name: "participant",
        type: "address",
      },
      {
        name: "value",
        type: "uint256",
      },
      {
        name: "emptied",
        type: "bool",
      },
      {
        name: "state",
        type: "uint8",
      },
      {
        name: "token",
        type: "address",
      }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [{
      indexed: false,
      name: "_hashedSecret",
      type: "bytes20",
    }],
    name: "Refunded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{
      indexed: false,
      name: "_hashedSecret",
      type: "bytes20",
    }],
    name: "Redeemed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{
      indexed: false,
      name: "_hashedSecret",
      type: "bytes20",
    }],
    name: "Participated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{
      indexed: false,
      name: "_hashedSecret",
      type: "bytes20",
    }],
    name: "Initiated",
    type: "event",
  }];
