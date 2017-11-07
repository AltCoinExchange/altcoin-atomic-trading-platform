export const assembleLink = (depositCoin: string,
                             depositAmount: number,
                             receiveCoin: string,
                             receiveAmount: number,
                             address: string,
                             date: Date,): string => {
  const stringified = JSON.stringify([
    depositCoin, depositAmount, receiveCoin, receiveAmount, address, date,
  ]);
  const link = btoa(stringified);
  return link;
};

export const disAssembleLink = (link: string): {
  depositCoin: string,
  depositAmount: number,
  receiveCoin: string,
  receiveAmount: number,
  address: string,
  date: Date
} => {
  const stringified = atob(link);
  const data = JSON.parse(stringified);
  return {
    depositCoin: data[0],
    depositAmount: +data[1],
    receiveCoin: data[2],
    receiveAmount: +data[3],
    address: data[4],
    date: new Date(data[5]),
  };
};
