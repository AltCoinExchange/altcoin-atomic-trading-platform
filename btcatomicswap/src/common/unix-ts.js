export function getUnixTimeFor2Days() {
  return getCurrentUnixTime();
}

export function getCurrentUnixTime(appendDays = 0) {
  const currDate = new Date();
  currDate.setDate(currDate.getDate() + appendDays);
  return parseInt(( currDate.getTime() / 1000).toFixed(0))
}
