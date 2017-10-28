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

db.Send({ address: "0x0be9f44", amount: "0.1", currencySell: "BTC", currencyBuy: "ETH", spread: "0.2", expiry: "02:20" });