#!/usr/bin/env bash

find . -name '*.js' -print0 | xargs -0 sed -i "" "s/bitcore.versionGuard = function(version) {/bitcore.versionGuard = function(version) { return true;/g"
