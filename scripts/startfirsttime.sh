#!/usr/bin/env bash

cd wallet
npm install
cd node_modules
find . -name '*.js' -type f -print0 | xargs -0 sed -i '' -e "s/bitcore.versionGuard = function(version) {/bitcore.versionGuard = function(version) { return true;/g"
npm run build
cd ../../shapeshift/
npm install
cd node_modules
ln -s wallet altcoinio-wallet
find @angular/cli/models/webpack-configs/common.js -print0 | xargs -0 sed -i '' -e "s/crypto: 'empty'/crypto: true/g"
cd ..
npm run start
