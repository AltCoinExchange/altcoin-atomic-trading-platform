#!/usr/bin/env bash

sed -i bak -e "s/bitcore.versionGuard = function(version) {/bitcore.versionGuard = function(version) { return true;/g" node_modules/bitcore-lib/index.js
sed -i bak -e "s/bitcore.versionGuard = function(version) {/bitcore.versionGuard = function(version) { return true;/g" node_modules/bitcore-mnemonic/node_modules/bitcore-lib/index.js