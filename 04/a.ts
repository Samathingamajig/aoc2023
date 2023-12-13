export const solution = (input: string) => {
  return input
    .split("\n")
    .map((line) => {
      const [winRaw, haveRaw] = line
        .split(":")[1]
        .split("|")
        .map((s) => s.trim().split(/\s+/).map(Number));
      // console.log(haveRaw);

      const win = new Set(winRaw);
      const wins = haveRaw.filter((n) => win.has(n)).length;
      if (wins == 0) {
        return 0;
      } else {
        return 2 ** (wins - 1);
      }
    })
    .reduce((a, b) => a + b)
    .toString();
};
