export const solution = (input: string) => {
  const hash = (str: string) => {
    let value = 0;
    for (const c of str) {
      value += c.charCodeAt(0);
      value *= 17;
      value %= 256;
    }
    return value;
  };
  return input
    .replaceAll("\n", "")
    .split(",")
    .map(hash)
    .reduce((a, b) => a + b)
    .toString();
};
