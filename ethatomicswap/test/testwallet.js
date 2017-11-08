/* jshint node: true */
var AbiConfig = require("../abi/atomicswap");
var AppConfig = require("../config");
var AtomicSwap = require("../modules/atomicswap");
var Common = require("../modules/common");

var fs = require('fs');

var secret = (new Common()).GenerateSecret();

// Init
var engine = new AtomicSwap(AbiConfig, AppConfig.hosts[0]);
try {

    var t = new Date();
    var account = null;

    // Create account and save keystore file
    if (!fs.existsSync("./testAccount.json")) {

        account = engine.CreateAccount('testwallt12#!');

        fs.writeFile("./testAccount", JSON.stringify(account), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Account saved!");
        });
    } else {
        // Load account
        var keystore = require("../testAccount.json");
        account = engine.Login(keystore.keystore, 'testwallt12#!');
    }

} catch (e) {
    console.log(e);
}