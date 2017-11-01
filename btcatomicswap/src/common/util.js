export const flatMap = (arr) => {
  return arr.reduce((a, b) => {
    return a.concat(b);
  }, [])
};
