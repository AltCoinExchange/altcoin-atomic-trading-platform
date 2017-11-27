find . -name '*.js' -type f -print0 | xargs -0 sed -i '' -e "s/bitcore.versionGuard = function(version) {/bitcore.versionGuard = function(version) { return true;/g"
