#!/usr/bin/env bash

sed 's/throw new Error(message)//g' node_modules/bitcore-lib/index.js
sed 's/throw new Error(message)//g' node_modules/bitcore-mnemonic/node_modules/bitcore-lib/index.js


sudo touch node_modules/scrypt/index.tmp.js
sudo chmod 777 node_modules/scrypt/index.tmp.js
sudo sed  's/build\/Release\/scrypt/build\/Release\/scrypt.node/g' node_modules/scrypt/index.js > node_modules/scrypt/index.tmp.js
sudo rm node_modules/scrypt/index.js
sudo mv node_modules/scrypt/index.tmp.js node_modules/scrypt/index.js