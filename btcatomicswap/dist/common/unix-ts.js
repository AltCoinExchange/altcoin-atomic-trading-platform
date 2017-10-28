"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUnixTimeFor2Days = getUnixTimeFor2Days;
exports.getCurrentUnixTime = getCurrentUnixTime;
function getUnixTimeFor2Days() {
  return getCurrentUnixTime(2);
}

function getCurrentUnixTime() {
  var appendDays = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var currDate = new Date();
  currDate.setDate(currDate.getDate() + appendDays);
  return parseInt((currDate.getTime() / 1000).toFixed(0));
}