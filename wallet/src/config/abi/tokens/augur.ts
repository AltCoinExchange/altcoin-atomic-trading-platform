// TODO remove: here is for reference only for building test contracts over standard (ERC20 for now)
// export const Configuration = [
// {
//   "Augur": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_tokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "suicideFunds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "logStakeTokenBurned",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_from",
//         "type": "address"
//       },
//       {
//         "name": "_to",
//         "type": "address"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       }
//     ],
//     "name": "logStakeTokensTransferred",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "logParticipationTokenBurned",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "logStakeTokenMinted",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_reporter",
//         "type": "address"
//       },
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_stakeToken",
//         "type": "address"
//       },
//       {
//         "name": "_amountStaked",
//         "type": "uint256"
//       },
//       {
//         "name": "_payoutNumerators",
//         "type": "uint256[]"
//       }
//     ],
//     "name": "logDesignatedReportSubmitted",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "logReputationTokenBurned",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "logUniverseForked",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_shareToken",
//         "type": "address"
//       },
//       {
//         "name": "_filler",
//         "type": "address"
//       },
//       {
//         "name": "_orderId",
//         "type": "bytes32"
//       },
//       {
//         "name": "_numCreatorShares",
//         "type": "uint256"
//       },
//       {
//         "name": "_numCreatorTokens",
//         "type": "uint256"
//       },
//       {
//         "name": "_numFillerShares",
//         "type": "uint256"
//       },
//       {
//         "name": "_numFillerTokens",
//         "type": "uint256"
//       },
//       {
//         "name": "_marketCreatorFees",
//         "type": "uint256"
//       },
//       {
//         "name": "_reporterFees",
//         "type": "uint256"
//       },
//       {
//         "name": "_tradeGroupId",
//         "type": "uint256"
//       }
//     ],
//     "name": "logOrderFilled",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       }
//     ],
//     "name": "extractEther",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_shareToken",
//         "type": "address"
//       },
//       {
//         "name": "_sender",
//         "type": "address"
//       },
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_numShares",
//         "type": "uint256"
//       },
//       {
//         "name": "_numPayoutTokens",
//         "type": "uint256"
//       },
//       {
//         "name": "_finalTokenBalance",
//         "type": "uint256"
//       }
//     ],
//     "name": "logTradingProceedsClaimed",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_marketCreator",
//         "type": "address"
//       },
//       {
//         "name": "_marketCreationFee",
//         "type": "uint256"
//       },
//       {
//         "name": "_topic",
//         "type": "bytes32"
//       },
//       {
//         "name": "_extraInfo",
//         "type": "string"
//       }
//     ],
//     "name": "logMarketCreated",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_shareToken",
//         "type": "address"
//       },
//       {
//         "name": "_sender",
//         "type": "address"
//       },
//       {
//         "name": "_orderId",
//         "type": "bytes32"
//       },
//       {
//         "name": "_orderType",
//         "type": "uint8"
//       },
//       {
//         "name": "_tokenRefund",
//         "type": "uint256"
//       },
//       {
//         "name": "_sharesRefund",
//         "type": "uint256"
//       }
//     ],
//     "name": "logOrderCanceled",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_from",
//         "type": "address"
//       },
//       {
//         "name": "_to",
//         "type": "address"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       }
//     ],
//     "name": "logParticipationTokensTransferred",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "logReputationTokenMinted",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_from",
//         "type": "address"
//       },
//       {
//         "name": "_to",
//         "type": "address"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       }
//     ],
//     "name": "logShareTokensTransferred",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       }
//     ],
//     "name": "setController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_shareToken",
//         "type": "address"
//       },
//       {
//         "name": "_creator",
//         "type": "address"
//       },
//       {
//         "name": "_orderId",
//         "type": "bytes32"
//       },
//       {
//         "name": "_tradeGroupId",
//         "type": "uint256"
//       }
//     ],
//     "name": "logOrderCreated",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_reporter",
//         "type": "address"
//       },
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_stakeToken",
//         "type": "address"
//       },
//       {
//         "name": "_amountStaked",
//         "type": "uint256"
//       },
//       {
//         "name": "_payoutNumerators",
//         "type": "uint256[]"
//       }
//     ],
//     "name": "logReportSubmitted",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "logShareTokenBurned",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "logShareTokenMinted",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "logParticipationTokenMinted",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_disputer",
//         "type": "address"
//       },
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_reportingPhase",
//         "type": "uint8"
//       },
//       {
//         "name": "_disputeBondAmount",
//         "type": "uint256"
//       }
//     ],
//     "name": "logReportsDisputed",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_market",
//         "type": "address"
//       }
//     ],
//     "name": "logMarketFinalized",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_token",
//         "type": "address"
//       },
//       {
//         "name": "_from",
//         "type": "address"
//       },
//       {
//         "name": "_to",
//         "type": "address"
//       },
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "trustedTransfer",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_from",
//         "type": "address"
//       },
//       {
//         "name": "_to",
//         "type": "address"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       }
//     ],
//     "name": "logReputationTokensTransferred",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_token",
//         "type": "address"
//       }
//     ],
//     "name": "extractTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_reporter",
//         "type": "address"
//       },
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_stakeToken",
//         "type": "address"
//       },
//       {
//         "name": "_amountRedeemed",
//         "type": "uint256"
//       },
//       {
//         "name": "_reportingFeesReceived",
//         "type": "uint256"
//       },
//       {
//         "name": "_payoutNumerators",
//         "type": "uint256[]"
//       }
//     ],
//     "name": "logWinningTokensRedeemed",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_childUniverse",
//         "type": "address"
//       }
//     ],
//     "name": "logUniverseCreated",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "universe",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "topic",
//         "type": "bytes32"
//       },
//       {
//         "indexed": true,
//         "name": "marketCreator",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "market",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "marketCreationFee",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "name": "extraInfo",
//         "type": "string"
//       }
//     ],
//     "name": "MarketCreated",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "universe",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "reporter",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "market",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "stakeToken",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "amountStaked",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "name": "payoutNumerators",
//         "type": "uint256[]"
//       }
//     ],
//     "name": "DesignatedReportSubmitted",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "universe",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "reporter",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "market",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "stakeToken",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "amountStaked",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "name": "payoutNumerators",
//         "type": "uint256[]"
//       }
//     ],
//     "name": "ReportSubmitted",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "universe",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "reporter",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "market",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "stakeToken",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "amountRedeemed",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "name": "reportingFeesReceived",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "name": "payoutNumerators",
//         "type": "uint256[]"
//       }
//     ],
//     "name": "WinningTokensRedeemed",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "universe",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "disputer",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "market",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "reportingPhase",
//         "type": "uint8"
//       },
//       {
//         "indexed": false,
//         "name": "disputeBondAmount",
//         "type": "uint256"
//       }
//     ],
//     "name": "ReportsDisputed",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "universe",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "market",
//         "type": "address"
//       }
//     ],
//     "name": "MarketFinalized",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "universe",
//         "type": "address"
//       }
//     ],
//     "name": "UniverseForked",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "universe",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "shareToken",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "sender",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "orderId",
//         "type": "bytes32"
//       },
//       {
//         "indexed": false,
//         "name": "orderType",
//         "type": "uint8"
//       },
//       {
//         "indexed": false,
//         "name": "tokenRefund",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "name": "sharesRefund",
//         "type": "uint256"
//       }
//     ],
//     "name": "OrderCanceled",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "universe",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "shareToken",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "creator",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "orderId",
//         "type": "bytes32"
//       },
//       {
//         "indexed": false,
//         "name": "tradeGroupId",
//         "type": "uint256"
//       }
//     ],
//     "name": "OrderCreated",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "universe",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "shareToken",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "filler",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "orderId",
//         "type": "bytes32"
//       },
//       {
//         "indexed": false,
//         "name": "numCreatorShares",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "name": "numCreatorTokens",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "name": "numFillerShares",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "name": "numFillerTokens",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "name": "marketCreatorFees",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "name": "reporterFees",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "name": "tradeGroupId",
//         "type": "uint256"
//       }
//     ],
//     "name": "OrderFilled",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "universe",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "shareToken",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "sender",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "market",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "numShares",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "name": "numPayoutTokens",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "name": "finalTokenBalance",
//         "type": "uint256"
//       }
//     ],
//     "name": "TradingProceedsClaimed",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "parentUniverse",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "childUniverse",
//         "type": "address"
//       }
//     ],
//     "name": "UniverseCreated",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "universe",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "token",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "from",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "to",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "TokensTransferred",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "universe",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "token",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "target",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "TokensMinted",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "universe",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "token",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "target",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "TokensBurned",
//     "type": "event"
//   }
// ],
//   "Controlled": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_tokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "suicideFunds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       }
//     ],
//     "name": "setController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "constructor"
//   }
// ],
//   "Controller": [
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "switchModeSoOnlyEmergencyStopsAndEscapeHatchesCanBeUsed",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_key",
//         "type": "bytes32"
//       }
//     ],
//     "name": "unregisterContract",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_destination",
//         "type": "address"
//       }
//     ],
//     "name": "extractEther",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_key",
//         "type": "bytes32"
//       }
//     ],
//     "name": "getContractDetails",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       },
//       {
//         "name": "",
//         "type": "bytes20"
//       },
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "stopInEmergency",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_key",
//         "type": "bytes32"
//       },
//       {
//         "name": "_address",
//         "type": "address"
//       },
//       {
//         "name": "_commitHash",
//         "type": "bytes20"
//       },
//       {
//         "name": "_bytecodeHash",
//         "type": "bytes32"
//       }
//     ],
//     "name": "registerContract",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "onlyInEmergency",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       }
//     ],
//     "name": "assertIsWhitelisted",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getAugur",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_token",
//         "type": "address"
//       }
//     ],
//     "name": "extractTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_newController",
//         "type": "address"
//       }
//     ],
//     "name": "updateController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "emergencyStop",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "stopped",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "name": "registry",
//     "outputs": [
//       {
//         "name": "name",
//         "type": "bytes32"
//       },
//       {
//         "name": "contractAddress",
//         "type": "address"
//       },
//       {
//         "name": "commitHash",
//         "type": "bytes20"
//       },
//       {
//         "name": "bytecodeHash",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "release",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       }
//     ],
//     "name": "removeFromWhitelist",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "owner",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_tokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "suicideFunds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "name": "whitelist",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       }
//     ],
//     "name": "addToWhitelist",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_newOwner",
//         "type": "address"
//       }
//     ],
//     "name": "transferOwnership",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_key",
//         "type": "bytes32"
//       }
//     ],
//     "name": "lookup",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_caller",
//         "type": "address"
//       },
//       {
//         "name": "_allowedCaller",
//         "type": "bytes32"
//       }
//     ],
//     "name": "assertOnlySpecifiedCaller",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "constructor"
//   }
// ],
//   "LegacyReputationToken": [
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "name",
//     "outputs": [
//       {
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_spender",
//         "type": "address"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       }
//     ],
//     "name": "approve",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "totalSupply",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_from",
//         "type": "address"
//       },
//       {
//         "name": "_to",
//         "type": "address"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       }
//     ],
//     "name": "transferFrom",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "decimals",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "faucet",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "ETERNAL_APPROVAL_VALUE",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_owner",
//         "type": "address"
//       }
//     ],
//     "name": "balanceOf",
//     "outputs": [
//       {
//         "name": "balance",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "symbol",
//     "outputs": [
//       {
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_to",
//         "type": "address"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       }
//     ],
//     "name": "transfer",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_owner",
//         "type": "address"
//       },
//       {
//         "name": "_spender",
//         "type": "address"
//       }
//     ],
//     "name": "allowance",
//     "outputs": [
//       {
//         "name": "remaining",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_address",
//         "type": "address"
//       }
//     ],
//     "name": "getBalance",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "constructor"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "_sender",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "_repBalance",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "name": "_timestamp",
//         "type": "uint256"
//       }
//     ],
//     "name": "FundedAccount",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "target",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Mint",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "target",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Burn",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "owner",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "spender",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Approval",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "from",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "to",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Transfer",
//     "type": "event"
//   }
// ],
//   "DisputeBondFactory": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       },
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_bondHolder",
//         "type": "address"
//       },
//       {
//         "name": "_bondAmount",
//         "type": "uint256"
//       },
//       {
//         "name": "_payoutDistributionHash",
//         "type": "bytes32"
//       }
//     ],
//     "name": "createDisputeBond",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ],
//   "MailboxFactory": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       },
//       {
//         "name": "_owner",
//         "type": "address"
//       }
//     ],
//     "name": "createMailbox",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ],
//   "MapFactory": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       },
//       {
//         "name": "_owner",
//         "type": "address"
//       }
//     ],
//     "name": "createMap",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ],
//   "MarketFactory": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       },
//       {
//         "name": "_reportingWindow",
//         "type": "address"
//       },
//       {
//         "name": "_endTime",
//         "type": "uint256"
//       },
//       {
//         "name": "_numOutcomes",
//         "type": "uint8"
//       },
//       {
//         "name": "_numTicks",
//         "type": "uint256"
//       },
//       {
//         "name": "_feePerEthInWei",
//         "type": "uint256"
//       },
//       {
//         "name": "_denominationToken",
//         "type": "address"
//       },
//       {
//         "name": "_creator",
//         "type": "address"
//       },
//       {
//         "name": "_designatedReporterAddress",
//         "type": "address"
//       }
//     ],
//     "name": "createMarket",
//     "outputs": [
//       {
//         "name": "_market",
//         "type": "address"
//       }
//     ],
//     "payable": true,
//     "stateMutability": "payable",
//     "type": "function"
//   }
// ],
//   "ParticipationTokenFactory": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       },
//       {
//         "name": "_reportingWindow",
//         "type": "address"
//       }
//     ],
//     "name": "createParticipationToken",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ],
//   "ReportingWindowFactory": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       },
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_reportingWindowId",
//         "type": "uint256"
//       }
//     ],
//     "name": "createReportingWindow",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ],
//   "ReputationTokenFactory": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       },
//       {
//         "name": "_universe",
//         "type": "address"
//       }
//     ],
//     "name": "createReputationToken",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ],
//   "ShareTokenFactory": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       },
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_outcome",
//         "type": "uint8"
//       }
//     ],
//     "name": "createShareToken",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ],
//   "StakeTokenFactory": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       },
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_payoutNumerators",
//         "type": "uint256[]"
//       },
//       {
//         "name": "_invalid",
//         "type": "bool"
//       }
//     ],
//     "name": "createStakeToken",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ],
//   "UniverseFactory": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       },
//       {
//         "name": "_parentUniverse",
//         "type": "address"
//       },
//       {
//         "name": "_parentPayoutDistributionHash",
//         "type": "bytes32"
//       }
//     ],
//     "name": "createUniverse",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ],
//   "Delegator": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_tokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "suicideFunds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       }
//     ],
//     "name": "setController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "controllerLookupName",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       },
//       {
//         "name": "_controllerLookupName",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "constructor"
//   },
//   {
//     "payable": true,
//     "stateMutability": "payable",
//     "type": "fallback"
//   }
// ],
//   "DisputeBond": [
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getDisputedPayoutDistributionHash",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_tokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "suicideFunds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       }
//     ],
//     "name": "extractEther",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getUniverse",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getOwner",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       }
//     ],
//     "name": "setController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "forgoFees",
//         "type": "bool"
//       }
//     ],
//     "name": "withdraw",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "controllerLookupName",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "withdrawInEmergency",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_bondHolder",
//         "type": "address"
//       },
//       {
//         "name": "_bondAmount",
//         "type": "uint256"
//       },
//       {
//         "name": "_payoutDistributionHash",
//         "type": "bytes32"
//       }
//     ],
//     "name": "initialize",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getTypeName",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getBondRemainingToBePaidOut",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_token",
//         "type": "address"
//       }
//     ],
//     "name": "extractTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getInitialized",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getMarket",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_newOwner",
//         "type": "address"
//       }
//     ],
//     "name": "transferOwnership",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "withdrawDisavowedTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_shadyUniverse",
//         "type": "address"
//       }
//     ],
//     "name": "withdrawToUniverse",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ],
//   "Market": [
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "migrateThroughAllForks",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "migrateThroughOneFork",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_tokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "suicideFunds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_payoutNumerators",
//         "type": "uint256[]"
//       },
//       {
//         "name": "_invalid",
//         "type": "bool"
//       }
//     ],
//     "name": "getOrCreateStakeToken",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_payoutDistributionHash",
//         "type": "bytes32"
//       }
//     ],
//     "name": "updateTentativeWinningPayoutDistributionHash",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getMarketCreatorSettlementFeeDivisor",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getExtraDisputeBondRemainingToBePaidOut",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_reportingWindow",
//         "type": "address"
//       },
//       {
//         "name": "_endTime",
//         "type": "uint256"
//       },
//       {
//         "name": "_numOutcomes",
//         "type": "uint8"
//       },
//       {
//         "name": "_numTicks",
//         "type": "uint256"
//       },
//       {
//         "name": "_feePerEthInAttoeth",
//         "type": "uint256"
//       },
//       {
//         "name": "_cash",
//         "type": "address"
//       },
//       {
//         "name": "_creator",
//         "type": "address"
//       },
//       {
//         "name": "_designatedReporterAddress",
//         "type": "address"
//       }
//     ],
//     "name": "initialize",
//     "outputs": [
//       {
//         "name": "_success",
//         "type": "bool"
//       }
//     ],
//     "payable": true,
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_payoutNumerators",
//         "type": "uint256[]"
//       },
//       {
//         "name": "_invalid",
//         "type": "bool"
//       }
//     ],
//     "name": "derivePayoutDistributionHash",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getDesignatedReportDisputeDueTimestamp",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getNumberOfOutcomes",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint8"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_outcome",
//         "type": "uint8"
//       }
//     ],
//     "name": "getShareToken",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "tryFinalize",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getTentativeWinningPayoutDistributionHash",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_shadyDisputeBond",
//         "type": "address"
//       }
//     ],
//     "name": "isContainerForDisputeBond",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "disavowTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getTotalWinningDisputeBondStake",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getEndTime",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "designatedReport",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_payoutDistributionHash",
//         "type": "bytes32"
//       }
//     ],
//     "name": "getPayoutDistributionHashStake",
//     "outputs": [
//       {
//         "name": "",
//         "type": "int256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_payoutNumerators",
//         "type": "uint256[]"
//       },
//       {
//         "name": "_attotokens",
//         "type": "uint256"
//       },
//       {
//         "name": "_invalid",
//         "type": "bool"
//       }
//     ],
//     "name": "disputeDesignatedReport",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_reporter",
//         "type": "address"
//       }
//     ],
//     "name": "firstReporterCompensationCheck",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_shadyShareToken",
//         "type": "address"
//       }
//     ],
//     "name": "isContainerForShareToken",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       }
//     ],
//     "name": "extractEther",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getDesignatedReporter",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "increaseTotalStake",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getTotalStake",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getUniverse",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getFinalWinningStakeToken",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getOwner",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getFinalPayoutDistributionHash",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getDesignatedReportReceivedTime",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       }
//     ],
//     "name": "setController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getFirstReportersDisputeBond",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getFinalizationTime",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_shadyStakeToken",
//         "type": "address"
//       }
//     ],
//     "name": "isContainerForStakeToken",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "disputeLastReporters",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getDesignatedReporterDisputeBond",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getBestGuessSecondPlaceTentativeWinningPayoutDistributionHash",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getNumTicks",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "isValid",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "controllerLookupName",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "withdrawInEmergency",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_payoutDistributionHash",
//         "type": "bytes32"
//       }
//     ],
//     "name": "getStakeTokenOrZeroByPayoutDistributionHash",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getReportingState",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint8"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getLastReportersDisputeBond",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getForkingMarket",
//     "outputs": [
//       {
//         "name": "_market",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "migrateDueToNoReports",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getTypeName",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getDenominationToken",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "decreaseExtraDisputeBondRemainingToBePaidOut",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getDesignatedReportPayoutHash",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getMarketCreatorMailbox",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_token",
//         "type": "address"
//       }
//     ],
//     "name": "extractTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_payoutNumerators",
//         "type": "uint256[]"
//       },
//       {
//         "name": "_attotokens",
//         "type": "uint256"
//       },
//       {
//         "name": "_invalid",
//         "type": "bool"
//       }
//     ],
//     "name": "disputeFirstReporters",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getDesignatedReportDueTimestamp",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getInitialized",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getReportingWindow",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_newOwner",
//         "type": "address"
//       }
//     ],
//     "name": "transferOwnership",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ],
//   "ParticipationToken": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_spender",
//         "type": "address"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       }
//     ],
//     "name": "approve",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_tokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "suicideFunds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "totalSupply",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_from",
//         "type": "address"
//       },
//       {
//         "name": "_to",
//         "type": "address"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       }
//     ],
//     "name": "transferFrom",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       }
//     ],
//     "name": "extractEther",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "ETERNAL_APPROVAL_VALUE",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_owner",
//         "type": "address"
//       }
//     ],
//     "name": "balanceOf",
//     "outputs": [
//       {
//         "name": "balance",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       }
//     ],
//     "name": "setController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_to",
//         "type": "address"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       }
//     ],
//     "name": "transfer",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "forgoFees",
//         "type": "bool"
//       }
//     ],
//     "name": "redeem",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "controllerLookupName",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "withdrawInEmergency",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_reportingWindow",
//         "type": "address"
//       }
//     ],
//     "name": "initialize",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_attotokens",
//         "type": "uint256"
//       }
//     ],
//     "name": "buy",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getTypeName",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_owner",
//         "type": "address"
//       },
//       {
//         "name": "_spender",
//         "type": "address"
//       }
//     ],
//     "name": "allowance",
//     "outputs": [
//       {
//         "name": "remaining",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_token",
//         "type": "address"
//       }
//     ],
//     "name": "extractTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getInitialized",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getReportingWindow",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_address",
//         "type": "address"
//       }
//     ],
//     "name": "getBalance",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "target",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Mint",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "target",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Burn",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "owner",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "spender",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Approval",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "from",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "to",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Transfer",
//     "type": "event"
//   }
// ],
//   "RepPriceOracle": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_tokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "suicideFunds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getRepPriceInAttoEth",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       }
//     ],
//     "name": "extractEther",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getOwner",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       }
//     ],
//     "name": "setController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_repPriceInAttoEth",
//         "type": "uint256"
//       }
//     ],
//     "name": "setRepPriceInAttoEth",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_token",
//         "type": "address"
//       }
//     ],
//     "name": "extractTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_newOwner",
//         "type": "address"
//       }
//     ],
//     "name": "transferOwnership",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ],
//   "Reporting": [],
//   "ReportingWindow": [
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "getOrCreatePreviousReportingWindow",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "removeMarket",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_tokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "suicideFunds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "updateMarketPhase",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "isReportingActive",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "isActive",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getMarketsCount",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getNumMarkets",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getAvgReportingGasPrice",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "migrateFeesDueToFork",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_shadyDisputeBond",
//         "type": "address"
//       }
//     ],
//     "name": "isContainerForDisputeBond",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getDisputeStartTime",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getParticipationToken",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_reporterAddress",
//         "type": "address"
//       },
//       {
//         "name": "_attoStake",
//         "type": "uint256"
//       },
//       {
//         "name": "_forgoFees",
//         "type": "bool"
//       }
//     ],
//     "name": "collectStakeTokenReportingFees",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getEndTime",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       }
//     ],
//     "name": "extractEther",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_reporterAddress",
//         "type": "address"
//       },
//       {
//         "name": "_attoStake",
//         "type": "uint256"
//       },
//       {
//         "name": "_forgoFees",
//         "type": "bool"
//       }
//     ],
//     "name": "collectParticipationTokenReportingFees",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_reportingWindow",
//         "type": "address"
//       }
//     ],
//     "name": "triggerMigrateFeesDueToFork",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getDisputeEndTime",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_endTime",
//         "type": "uint256"
//       },
//       {
//         "name": "_numOutcomes",
//         "type": "uint8"
//       },
//       {
//         "name": "_numTicks",
//         "type": "uint256"
//       },
//       {
//         "name": "_feePerEthInWei",
//         "type": "uint256"
//       },
//       {
//         "name": "_denominationToken",
//         "type": "address"
//       },
//       {
//         "name": "_designatedReporterAddress",
//         "type": "address"
//       },
//       {
//         "name": "_topic",
//         "type": "bytes32"
//       },
//       {
//         "name": "_extraInfo",
//         "type": "string"
//       }
//     ],
//     "name": "createMarket",
//     "outputs": [
//       {
//         "name": "_newMarket",
//         "type": "address"
//       }
//     ],
//     "payable": true,
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getTotalWinningStake",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "increaseTotalStake",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getTotalStake",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getLastReporterMarketsCount",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getFirstReporterMarketsCount",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getUniverse",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "getOrCreateNextReportingWindow",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_market",
//         "type": "address"
//       }
//     ],
//     "name": "migrateFeesDueToMarketMigration",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       }
//     ],
//     "name": "setController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_market",
//         "type": "address"
//       }
//     ],
//     "name": "noteReportingGasPrice",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getReportingEndTime",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_shadyParticipationToken",
//         "type": "address"
//       }
//     ],
//     "name": "isContainerForParticipationToken",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_shadyMarket",
//         "type": "address"
//       }
//     ],
//     "name": "isContainerForMarket",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_shadyStakeToken",
//         "type": "address"
//       }
//     ],
//     "name": "isContainerForStakeToken",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getNumIncorrectDesignatedReportMarkets",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "noteDesignatedReport",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "increaseTotalWinningStake",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "allMarketsFinalized",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "isOver",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getReportingStartTime",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getReputationToken",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_reporterAddress",
//         "type": "address"
//       },
//       {
//         "name": "_attoStake",
//         "type": "uint256"
//       },
//       {
//         "name": "_forgoFees",
//         "type": "bool"
//       }
//     ],
//     "name": "collectDisputeBondReportingFees",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "controllerLookupName",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getStartTime",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       },
//       {
//         "name": "_reportingWindowId",
//         "type": "uint256"
//       }
//     ],
//     "name": "initialize",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "migrateMarketInFromSibling",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getNumInvalidMarkets",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "isForkingMarketFinalized",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getNumDesignatedReportNoShows",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getTypeName",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "migrateMarketInFromNibling",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_token",
//         "type": "address"
//       }
//     ],
//     "name": "extractTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getInitialized",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "isDisputeActive",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   }
// ],
//   "ReputationToken": [
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "name",
//     "outputs": [
//       {
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_spender",
//         "type": "address"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       }
//     ],
//     "name": "approve",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_tokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "suicideFunds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "totalSupply",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_from",
//         "type": "address"
//       },
//       {
//         "name": "_to",
//         "type": "address"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       }
//     ],
//     "name": "transferFrom",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_source",
//         "type": "address"
//       },
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_attotokens",
//         "type": "uint256"
//       }
//     ],
//     "name": "trustedReportingWindowTransfer",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "decimals",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getTopMigrationDestination",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       }
//     ],
//     "name": "extractEther",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "ETERNAL_APPROVAL_VALUE",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_reporter",
//         "type": "address"
//       },
//       {
//         "name": "_attotokens",
//         "type": "uint256"
//       }
//     ],
//     "name": "migrateOutStakeToken",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_owner",
//         "type": "address"
//       }
//     ],
//     "name": "balanceOf",
//     "outputs": [
//       {
//         "name": "balance",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "migrateFromLegacyReputationToken",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getUniverse",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       }
//     ],
//     "name": "setController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "symbol",
//     "outputs": [
//       {
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_reporter",
//         "type": "address"
//       },
//       {
//         "name": "_attotokens",
//         "type": "uint256"
//       },
//       {
//         "name": "_bonusIfInForkWindow",
//         "type": "bool"
//       }
//     ],
//     "name": "migrateIn",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_to",
//         "type": "address"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       }
//     ],
//     "name": "transfer",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_reporter",
//         "type": "address"
//       },
//       {
//         "name": "_attotokens",
//         "type": "uint256"
//       }
//     ],
//     "name": "migrateOutDisputeBond",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "mintForDisputeBondMigration",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "controllerLookupName",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_universe",
//         "type": "address"
//       }
//     ],
//     "name": "initialize",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getTypeName",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_owner",
//         "type": "address"
//       },
//       {
//         "name": "_spender",
//         "type": "address"
//       }
//     ],
//     "name": "allowance",
//     "outputs": [
//       {
//         "name": "remaining",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_reporter",
//         "type": "address"
//       },
//       {
//         "name": "_attotokens",
//         "type": "uint256"
//       }
//     ],
//     "name": "migrateOut",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_token",
//         "type": "address"
//       }
//     ],
//     "name": "extractTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getInitialized",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_source",
//         "type": "address"
//       },
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_attotokens",
//         "type": "uint256"
//       }
//     ],
//     "name": "trustedStakeTokenTransfer",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_source",
//         "type": "address"
//       },
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_attotokens",
//         "type": "uint256"
//       }
//     ],
//     "name": "trustedMarketTransfer",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_source",
//         "type": "address"
//       },
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_attotokens",
//         "type": "uint256"
//       }
//     ],
//     "name": "trustedParticipationTokenTransfer",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_address",
//         "type": "address"
//       }
//     ],
//     "name": "getBalance",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "target",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Mint",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "target",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Burn",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "owner",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "spender",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Approval",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "from",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "to",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Transfer",
//     "type": "event"
//   }
// ],
//   "StakeToken": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_spender",
//         "type": "address"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       }
//     ],
//     "name": "approve",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_tokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "suicideFunds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "totalSupply",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "index",
//         "type": "uint8"
//       }
//     ],
//     "name": "getPayoutNumerator",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_from",
//         "type": "address"
//       },
//       {
//         "name": "_to",
//         "type": "address"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       }
//     ],
//     "name": "transferFrom",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "migrateLosingTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       }
//     ],
//     "name": "extractEther",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "name": "payoutNumerators",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "ETERNAL_APPROVAL_VALUE",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_payoutNumerators",
//         "type": "uint256[]"
//       },
//       {
//         "name": "_invalid",
//         "type": "bool"
//       }
//     ],
//     "name": "initialize",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_owner",
//         "type": "address"
//       }
//     ],
//     "name": "balanceOf",
//     "outputs": [
//       {
//         "name": "balance",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "market",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getUniverse",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       }
//     ],
//     "name": "setController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_reporter",
//         "type": "address"
//       },
//       {
//         "name": "_attotokens",
//         "type": "uint256"
//       }
//     ],
//     "name": "trustedBuy",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "redeemForkedTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_to",
//         "type": "address"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       }
//     ],
//     "name": "transfer",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getReputationToken",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "isValid",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "controllerLookupName",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "withdrawInEmergency",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_attotokens",
//         "type": "uint256"
//       }
//     ],
//     "name": "buy",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getTypeName",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_owner",
//         "type": "address"
//       },
//       {
//         "name": "_spender",
//         "type": "address"
//       }
//     ],
//     "name": "allowance",
//     "outputs": [
//       {
//         "name": "remaining",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getPayoutDistributionHash",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "forgoFees",
//         "type": "bool"
//       }
//     ],
//     "name": "redeemWinningTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_reporter",
//         "type": "address"
//       }
//     ],
//     "name": "redeemDisavowedTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_token",
//         "type": "address"
//       }
//     ],
//     "name": "extractTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getInitialized",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getReportingWindow",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getMarket",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_address",
//         "type": "address"
//       }
//     ],
//     "name": "getBalance",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "target",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Mint",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "target",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Burn",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "owner",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "spender",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Approval",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "from",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "to",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Transfer",
//     "type": "event"
//   }
// ],
//   "Universe": [
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getDesignatedReportNoShowBond",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "getOrCreatePreviousReportingWindow",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_tokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "suicideFunds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getReportingFeeDivisor",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getRepMarketCapInAttoeth",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_endTime",
//         "type": "uint256"
//       }
//     ],
//     "name": "getReportingWindowByMarketEndTime",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getMarketCreationCost",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_timestamp",
//         "type": "uint256"
//       }
//     ],
//     "name": "getReportingWindowId",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getDesignatedReportStake",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_endTime",
//         "type": "uint256"
//       }
//     ],
//     "name": "getOrCreateReportingWindowByMarketEndTime",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "getOrCreateReportingWindowForForkEndTime",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_shadyDisputeBond",
//         "type": "address"
//       }
//     ],
//     "name": "isContainerForDisputeBond",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "getOrCacheTargetReporterGasCosts",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "decreaseRepAvailableForExtraBondPayouts",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getReportingWindowForForkEndTime",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "fork",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_shadyReportingWindow",
//         "type": "address"
//       }
//     ],
//     "name": "isContainerForReportingWindow",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getTargetRepMarketCapInAttoeth",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_shadyShareToken",
//         "type": "address"
//       }
//     ],
//     "name": "isContainerForShareToken",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       }
//     ],
//     "name": "extractEther",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getReportingPeriodDurationInSeconds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_badMarkets",
//         "type": "uint256"
//       },
//       {
//         "name": "_totalMarkets",
//         "type": "uint256"
//       },
//       {
//         "name": "_targetDivisor",
//         "type": "uint256"
//       },
//       {
//         "name": "_previousValue",
//         "type": "uint256"
//       },
//       {
//         "name": "_defaultValue",
//         "type": "uint256"
//       },
//       {
//         "name": "_floor",
//         "type": "uint256"
//       }
//     ],
//     "name": "calculateFloatingValue",
//     "outputs": [
//       {
//         "name": "_newValue",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "pure",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getPreviousReportingWindow",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getCurrentReportingWindow",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getOpenInterestInAttoEth",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_timestamp",
//         "type": "uint256"
//       }
//     ],
//     "name": "getOrCreateReportingWindowByTimestamp",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getForkEndTime",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getForkReputationGoal",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "getOrCreateCurrentReportingWindow",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getValidityBond",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "getOrCreateNextReportingWindow",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "getOrCacheReportingFeeDivisor",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_reportingWindowId",
//         "type": "uint256"
//       }
//     ],
//     "name": "getReportingWindow",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       }
//     ],
//     "name": "setController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_shadyChild",
//         "type": "address"
//       }
//     ],
//     "name": "isParentOf",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_shadyParticipationToken",
//         "type": "address"
//       }
//     ],
//     "name": "isContainerForParticipationToken",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_shadyMarket",
//         "type": "address"
//       }
//     ],
//     "name": "isContainerForMarket",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_shadyStakeToken",
//         "type": "address"
//       }
//     ],
//     "name": "isContainerForStakeToken",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getParentUniverse",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_timestamp",
//         "type": "uint256"
//       }
//     ],
//     "name": "getReportingWindowByTimestamp",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "getOrCacheValidityBond",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getRepAvailableForExtraBondPayouts",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "decrementOpenInterest",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getReputationToken",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getNextReportingWindow",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_parentUniverse",
//         "type": "address"
//       },
//       {
//         "name": "_parentPayoutDistributionHash",
//         "type": "bytes32"
//       }
//     ],
//     "name": "initialize",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "controllerLookupName",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getParentPayoutDistributionHash",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_parentPayoutDistributionHash",
//         "type": "bytes32"
//       }
//     ],
//     "name": "getOrCreateChildUniverse",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getForkingMarket",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "incrementOpenInterest",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getTypeName",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getTargetReporterGasCosts",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "getOrCacheDesignatedReportStake",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "getOrCacheMarketCreationCost",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_parentPayoutDistributionHash",
//         "type": "bytes32"
//       }
//     ],
//     "name": "getChildUniverse",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_token",
//         "type": "address"
//       }
//     ],
//     "name": "extractTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getInitialized",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "increaseRepAvailableForExtraBondPayouts",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "getOrCacheDesignatedReportNoShowBond",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ],
//   "CancelOrder": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_tokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "suicideFunds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       }
//     ],
//     "name": "extractEther",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_orderId",
//         "type": "bytes32"
//       },
//       {
//         "name": "_type",
//         "type": "uint8"
//       },
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_outcome",
//         "type": "uint8"
//       }
//     ],
//     "name": "cancelOrder",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       }
//     ],
//     "name": "setController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_token",
//         "type": "address"
//       }
//     ],
//     "name": "extractTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ],
//   "Cash": [
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "name",
//     "outputs": [
//       {
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_spender",
//         "type": "address"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       }
//     ],
//     "name": "approve",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_tokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "suicideFunds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "totalSupply",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_to",
//         "type": "address"
//       },
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "withdrawEtherTo",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_from",
//         "type": "address"
//       },
//       {
//         "name": "_to",
//         "type": "address"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       }
//     ],
//     "name": "transferFrom",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "decimals",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "withdrawEther",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_to",
//         "type": "address"
//       }
//     ],
//     "name": "depositEtherFor",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": true,
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       }
//     ],
//     "name": "extractEther",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "ETERNAL_APPROVAL_VALUE",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_owner",
//         "type": "address"
//       }
//     ],
//     "name": "balanceOf",
//     "outputs": [
//       {
//         "name": "balance",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       }
//     ],
//     "name": "setController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "symbol",
//     "outputs": [
//       {
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [],
//     "name": "depositEther",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": true,
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_to",
//         "type": "address"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       }
//     ],
//     "name": "transfer",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getTypeName",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_owner",
//         "type": "address"
//       },
//       {
//         "name": "_spender",
//         "type": "address"
//       }
//     ],
//     "name": "allowance",
//     "outputs": [
//       {
//         "name": "remaining",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_token",
//         "type": "address"
//       }
//     ],
//     "name": "extractTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_address",
//         "type": "address"
//       }
//     ],
//     "name": "getBalance",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "target",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Mint",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "target",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Burn",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "owner",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "spender",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Approval",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "from",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "to",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Transfer",
//     "type": "event"
//   }
// ],
//   "ClaimTradingProceeds": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_winningStakeToken",
//         "type": "address"
//       },
//       {
//         "name": "_outcome",
//         "type": "uint8"
//       },
//       {
//         "name": "_numberOfShares",
//         "type": "uint256"
//       }
//     ],
//     "name": "divideUpWinnings",
//     "outputs": [
//       {
//         "name": "_proceeds",
//         "type": "uint256"
//       },
//       {
//         "name": "_shareHolderShare",
//         "type": "uint256"
//       },
//       {
//         "name": "_creatorShare",
//         "type": "uint256"
//       },
//       {
//         "name": "_reporterShare",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "calculateCreatorFee",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_tokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "suicideFunds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_market",
//         "type": "address"
//       }
//     ],
//     "name": "claimTradingProceeds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       }
//     ],
//     "name": "extractEther",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "calculateReportingFee",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       }
//     ],
//     "name": "setController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_token",
//         "type": "address"
//       }
//     ],
//     "name": "extractTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_winningStakeToken",
//         "type": "address"
//       },
//       {
//         "name": "_outcome",
//         "type": "uint8"
//       },
//       {
//         "name": "_numberOfShares",
//         "type": "uint256"
//       }
//     ],
//     "name": "calculateProceeds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   }
// ],
//   "CompleteSets": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_tokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "suicideFunds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_sender",
//         "type": "address"
//       },
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "sellCompleteSets",
//     "outputs": [
//       {
//         "name": "_creatorFee",
//         "type": "uint256"
//       },
//       {
//         "name": "_reportingFee",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       }
//     ],
//     "name": "extractEther",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       }
//     ],
//     "name": "setController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_sender",
//         "type": "address"
//       },
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "buyCompleteSets",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "publicBuyCompleteSets",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": true,
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "publicSellCompleteSets",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_token",
//         "type": "address"
//       }
//     ],
//     "name": "extractTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ],
//   "CreateOrder": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_tokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "suicideFunds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       }
//     ],
//     "name": "extractEther",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       }
//     ],
//     "name": "setController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_type",
//         "type": "uint8"
//       },
//       {
//         "name": "_attoshares",
//         "type": "uint256"
//       },
//       {
//         "name": "_displayPrice",
//         "type": "uint256"
//       },
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_outcome",
//         "type": "uint8"
//       },
//       {
//         "name": "_betterOrderId",
//         "type": "bytes32"
//       },
//       {
//         "name": "_worseOrderId",
//         "type": "bytes32"
//       },
//       {
//         "name": "_tradeGroupId",
//         "type": "uint256"
//       }
//     ],
//     "name": "publicCreateOrder",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": true,
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_creator",
//         "type": "address"
//       },
//       {
//         "name": "_type",
//         "type": "uint8"
//       },
//       {
//         "name": "_attoshares",
//         "type": "uint256"
//       },
//       {
//         "name": "_displayPrice",
//         "type": "uint256"
//       },
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_outcome",
//         "type": "uint8"
//       },
//       {
//         "name": "_betterOrderId",
//         "type": "bytes32"
//       },
//       {
//         "name": "_worseOrderId",
//         "type": "bytes32"
//       },
//       {
//         "name": "_tradeGroupId",
//         "type": "uint256"
//       }
//     ],
//     "name": "createOrder",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_token",
//         "type": "address"
//       }
//     ],
//     "name": "extractTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ],
//   "FillOrder": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_tokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "suicideFunds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_filler",
//         "type": "address"
//       },
//       {
//         "name": "_orderId",
//         "type": "bytes32"
//       },
//       {
//         "name": "_amountFillerWants",
//         "type": "uint256"
//       },
//       {
//         "name": "_tradeGroupId",
//         "type": "uint256"
//       }
//     ],
//     "name": "fillOrder",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       }
//     ],
//     "name": "extractEther",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       }
//     ],
//     "name": "setController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_orderId",
//         "type": "bytes32"
//       },
//       {
//         "name": "_amountFillerWants",
//         "type": "uint256"
//       },
//       {
//         "name": "_tradeGroupId",
//         "type": "uint256"
//       }
//     ],
//     "name": "publicFillOrder",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": true,
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_token",
//         "type": "address"
//       }
//     ],
//     "name": "extractTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ],
//   "Order": [],
//   "Orders": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_tokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "suicideFunds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_orderId",
//         "type": "bytes32"
//       }
//     ],
//     "name": "getAmount",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_type",
//         "type": "uint8"
//       },
//       {
//         "name": "_price",
//         "type": "uint256"
//       },
//       {
//         "name": "_betterOrderId",
//         "type": "bytes32"
//       }
//     ],
//     "name": "assertIsNotBetterPrice",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_type",
//         "type": "uint8"
//       },
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_amount",
//         "type": "uint256"
//       },
//       {
//         "name": "_price",
//         "type": "uint256"
//       },
//       {
//         "name": "_sender",
//         "type": "address"
//       },
//       {
//         "name": "_blockNumber",
//         "type": "uint256"
//       },
//       {
//         "name": "_outcome",
//         "type": "uint8"
//       },
//       {
//         "name": "_moneyEscrowed",
//         "type": "uint256"
//       },
//       {
//         "name": "_sharesEscrowed",
//         "type": "uint256"
//       }
//     ],
//     "name": "getOrderId",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_orderId",
//         "type": "bytes32"
//       }
//     ],
//     "name": "getPrice",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_type",
//         "type": "uint8"
//       },
//       {
//         "name": "_price",
//         "type": "uint256"
//       },
//       {
//         "name": "_worseOrderId",
//         "type": "bytes32"
//       }
//     ],
//     "name": "assertIsNotWorsePrice",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_orderId",
//         "type": "bytes32"
//       }
//     ],
//     "name": "getOrderMoneyEscrowed",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       }
//     ],
//     "name": "extractEther",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_type",
//         "type": "uint8"
//       },
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_outcome",
//         "type": "uint8"
//       }
//     ],
//     "name": "getBestOrderId",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_type",
//         "type": "uint8"
//       },
//       {
//         "name": "_price",
//         "type": "uint256"
//       },
//       {
//         "name": "_orderId",
//         "type": "bytes32"
//       }
//     ],
//     "name": "isBetterPrice",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_orderId",
//         "type": "bytes32"
//       }
//     ],
//     "name": "getOutcome",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint8"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_orderId",
//         "type": "bytes32"
//       },
//       {
//         "name": "_sharesFilled",
//         "type": "uint256"
//       },
//       {
//         "name": "_tokensFilled",
//         "type": "uint256"
//       }
//     ],
//     "name": "fillOrder",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_orderId",
//         "type": "bytes32"
//       }
//     ],
//     "name": "getWorseOrderId",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_outcome",
//         "type": "uint8"
//       }
//     ],
//     "name": "getLastOutcomePrice",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_market",
//         "type": "address"
//       }
//     ],
//     "name": "getVolume",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       }
//     ],
//     "name": "setController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_orderId",
//         "type": "bytes32"
//       }
//     ],
//     "name": "getBetterOrderId",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_type",
//         "type": "uint8"
//       },
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_outcome",
//         "type": "uint8"
//       }
//     ],
//     "name": "getWorstOrderId",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "controllerLookupName",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_orderId",
//         "type": "bytes32"
//       }
//     ],
//     "name": "getMarket",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_orderId",
//         "type": "bytes32"
//       }
//     ],
//     "name": "getOrderType",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint8"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_outcome",
//         "type": "uint8"
//       },
//       {
//         "name": "_price",
//         "type": "uint256"
//       }
//     ],
//     "name": "setPrice",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_type",
//         "type": "uint8"
//       },
//       {
//         "name": "_price",
//         "type": "uint256"
//       },
//       {
//         "name": "_orderId",
//         "type": "bytes32"
//       }
//     ],
//     "name": "isWorsePrice",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_orderId",
//         "type": "bytes32"
//       }
//     ],
//     "name": "getOrderCreator",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_orderId",
//         "type": "bytes32"
//       }
//     ],
//     "name": "getOrderSharesEscrowed",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_token",
//         "type": "address"
//       }
//     ],
//     "name": "extractTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_orderId",
//         "type": "bytes32"
//       }
//     ],
//     "name": "removeOrder",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_type",
//         "type": "uint8"
//       },
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_amount",
//         "type": "uint256"
//       },
//       {
//         "name": "_price",
//         "type": "uint256"
//       },
//       {
//         "name": "_sender",
//         "type": "address"
//       },
//       {
//         "name": "_outcome",
//         "type": "uint8"
//       },
//       {
//         "name": "_moneyEscrowed",
//         "type": "uint256"
//       },
//       {
//         "name": "_sharesEscrowed",
//         "type": "uint256"
//       },
//       {
//         "name": "_betterOrderId",
//         "type": "bytes32"
//       },
//       {
//         "name": "_worseOrderId",
//         "type": "bytes32"
//       },
//       {
//         "name": "_tradeGroupId",
//         "type": "uint256"
//       }
//     ],
//     "name": "saveOrder",
//     "outputs": [
//       {
//         "name": "_orderId",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ],
//   "OrdersFetcher": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_tokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "suicideFunds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_type",
//         "type": "uint8"
//       },
//       {
//         "name": "_price",
//         "type": "uint256"
//       },
//       {
//         "name": "_highestOrderId",
//         "type": "bytes32"
//       }
//     ],
//     "name": "descendOrderList",
//     "outputs": [
//       {
//         "name": "_betterOrderId",
//         "type": "bytes32"
//       },
//       {
//         "name": "_worseOrderId",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_type",
//         "type": "uint8"
//       },
//       {
//         "name": "_price",
//         "type": "uint256"
//       },
//       {
//         "name": "_bestOrderId",
//         "type": "bytes32"
//       },
//       {
//         "name": "_worstOrderId",
//         "type": "bytes32"
//       },
//       {
//         "name": "_betterOrderId",
//         "type": "bytes32"
//       },
//       {
//         "name": "_worseOrderId",
//         "type": "bytes32"
//       }
//     ],
//     "name": "findBoundingOrders",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       },
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       }
//     ],
//     "name": "extractEther",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       }
//     ],
//     "name": "setController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_token",
//         "type": "address"
//       }
//     ],
//     "name": "extractTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_type",
//         "type": "uint8"
//       },
//       {
//         "name": "_price",
//         "type": "uint256"
//       },
//       {
//         "name": "_lowestOrderId",
//         "type": "bytes32"
//       }
//     ],
//     "name": "ascendOrderList",
//     "outputs": [
//       {
//         "name": "_betterOrderId",
//         "type": "bytes32"
//       },
//       {
//         "name": "_worseOrderId",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   }
// ],
//   "ShareToken": [
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "name",
//     "outputs": [
//       {
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_spender",
//         "type": "address"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       }
//     ],
//     "name": "approve",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_tokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "suicideFunds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_owner",
//         "type": "address"
//       },
//       {
//         "name": "_fxpValue",
//         "type": "uint256"
//       }
//     ],
//     "name": "createShares",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "totalSupply",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_from",
//         "type": "address"
//       },
//       {
//         "name": "_to",
//         "type": "address"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       }
//     ],
//     "name": "transferFrom",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "decimals",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       }
//     ],
//     "name": "extractEther",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "ETERNAL_APPROVAL_VALUE",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_owner",
//         "type": "address"
//       }
//     ],
//     "name": "balanceOf",
//     "outputs": [
//       {
//         "name": "balance",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getOutcome",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint8"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       }
//     ],
//     "name": "setController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_outcome",
//         "type": "uint8"
//       }
//     ],
//     "name": "initialize",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "symbol",
//     "outputs": [
//       {
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_to",
//         "type": "address"
//       },
//       {
//         "name": "_value",
//         "type": "uint256"
//       }
//     ],
//     "name": "transfer",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "isShareToken",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "pure",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "controllerLookupName",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_owner",
//         "type": "address"
//       },
//       {
//         "name": "_fxpValue",
//         "type": "uint256"
//       }
//     ],
//     "name": "destroyShares",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getTypeName",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_owner",
//         "type": "address"
//       },
//       {
//         "name": "_spender",
//         "type": "address"
//       }
//     ],
//     "name": "allowance",
//     "outputs": [
//       {
//         "name": "remaining",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_token",
//         "type": "address"
//       }
//     ],
//     "name": "extractTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getInitialized",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getMarket",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_address",
//         "type": "address"
//       }
//     ],
//     "name": "getBalance",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "target",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Mint",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "target",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Burn",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "owner",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "spender",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Approval",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "name": "from",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "name": "to",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "value",
//         "type": "uint256"
//       }
//     ],
//     "name": "Transfer",
//     "type": "event"
//   }
// ],
//   "Trade": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_tokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "suicideFunds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_direction",
//         "type": "uint8"
//       },
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_outcome",
//         "type": "uint8"
//       },
//       {
//         "name": "_fxpAmount",
//         "type": "uint256"
//       },
//       {
//         "name": "_price",
//         "type": "uint256"
//       },
//       {
//         "name": "_tradeGroupId",
//         "type": "uint256"
//       }
//     ],
//     "name": "publicTakeBestOrder",
//     "outputs": [
//       {
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "payable": true,
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       }
//     ],
//     "name": "extractEther",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       }
//     ],
//     "name": "setController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_outcome",
//         "type": "uint8"
//       },
//       {
//         "name": "_fxpAmount",
//         "type": "uint256"
//       },
//       {
//         "name": "_price",
//         "type": "uint256"
//       },
//       {
//         "name": "_tradeGroupId",
//         "type": "uint256"
//       }
//     ],
//     "name": "publicBuy",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": true,
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_direction",
//         "type": "uint8"
//       },
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_outcome",
//         "type": "uint8"
//       },
//       {
//         "name": "_fxpAmount",
//         "type": "uint256"
//       },
//       {
//         "name": "_price",
//         "type": "uint256"
//       },
//       {
//         "name": "_tradeGroupId",
//         "type": "uint256"
//       }
//     ],
//     "name": "publicTrade",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": true,
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_market",
//         "type": "address"
//       },
//       {
//         "name": "_outcome",
//         "type": "uint8"
//       },
//       {
//         "name": "_fxpAmount",
//         "type": "uint256"
//       },
//       {
//         "name": "_price",
//         "type": "uint256"
//       },
//       {
//         "name": "_tradeGroupId",
//         "type": "uint256"
//       }
//     ],
//     "name": "publicSell",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": true,
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_token",
//         "type": "address"
//       }
//     ],
//     "name": "extractTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ],
//   "TradingEscapeHatch": [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_tokens",
//         "type": "address[]"
//       }
//     ],
//     "name": "suicideFunds",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "getController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       }
//     ],
//     "name": "extractEther",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_controller",
//         "type": "address"
//       }
//     ],
//     "name": "setController",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [],
//     "name": "controllerLookupName",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bytes32"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_market",
//         "type": "address"
//       }
//     ],
//     "name": "claimSharesInUpdate",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_destination",
//         "type": "address"
//       },
//       {
//         "name": "_token",
//         "type": "address"
//       }
//     ],
//     "name": "extractTokens",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ]
// }
// ];