#!/usr/bin/env bash
cd btcatomicswap
yarn
yarn build
cd ../wallet
yarn
cd node_modules
find . -name '*.js' -print0 | xargs -0 sed -i "" "s/bitcore.versionGuard = function(version) {/bitcore.versionGuard = function(version) { return true;/g"
cd ../../shapeshift/
yarn
cd ..
./scripts/linkallfirsttime.sh
find shapeshift/node_modules/@angular/cli/models/webpack-configs/common.js -print0 | xargs -0 sed -i "" "s/crypto: 'empty'/crypto: true/g"
cd shapeshift
ng serve