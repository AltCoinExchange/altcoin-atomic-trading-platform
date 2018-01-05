#!/usr/bin/env bash
cd btcatomicswap
yarn link
cd ..
cd ethatomicswap
yarn link
cd ..
cd wallet
yarn link
cd ..
cd wallet-ts
yarn link
cd ..
cd shapeshift
yarn link wallet
yarn link ethatomicswap
yarn link btc-atomic-swap
yarn link ts-wallet
