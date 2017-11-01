/**
 * DB test
 *
 * @author Djenad Razic
 * @company Altcoin Exchange, Inc.
 */

var AppConfig = require("../config");
var Db = require("../modules/db");
var Common = require("../modules/common");

var db = new Db(AppConfig);

var now = new Date();
now.setHours(now.getHours() + 1);

// Send test data to the BigchainDB
db.Send(
    { address: "0xb483f5a8c6ebA74Dc1bcef9D167E6B86Caa4C773",
        amount: "0.1",
        currencySell: "ETH",
        currencyBuy: "BTC",
        spread: "0.2",
        expiry: now.toISOString() }).then(function(data) {
            console.log(data);
    });

// Subscribe to data
// Data example: {"block_id": "5a5aee2fb89bbff210b21c4ad578c51d14e0d8e98f1828c4c77f8c15bedc444f",
//                "asset_id": "f6b7c303eda0d2565fd2b76c5be5586a46bed893cbb181b6a223a6e6d3b41403",
//                "transaction_id": "f6b7c303eda0d2565fd2b76c5be5586a46bed893cbb181b6a223a6e6d3b41403"}
db.Subscribe(function (data) {
    console.log(data);
});

// Find by any data
db.Find("BTC").then(function(r) {
    console.log(r);
});

db.FindEx(JSON.stringify({})).then(function(r) {
    console.log(r);
});


db.FindEx(JSON.stringify({"data.currencySell":"ETH"})).then(function(r) {
    console.log(r);
});
