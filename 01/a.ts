export const solution = (input: string) => {
  return input
    .split("\n")
    .map((x) => x.replaceAll(/[^0-9]/g, ""))
    .map((n) => n.at(0) + n.at(-1))
    .map(Number)
    .reduce((a, b) => a + b, 0)
    .toString();
};
