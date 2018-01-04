#!/usr/bin/env bash

sed 's/throw new Error(message)//g' node_modules/bitcore-lib/index.js
sed 's/throw new Error(message)//g' node_modules/bitcore-mnemonic/node_modules/bitcore-lib/index.js
