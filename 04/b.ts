export const solution = (input: string) => {
  const lines = input.split("\n");
  const copies = new Array(lines.length).fill(1);

  return input
    .split("\n")
    .map((line, cardIndex) => {
      const [winRaw, haveRaw] = line
        .split(":")[1]
        .split("|")
        .map((s) => s.trim().split(/\s+/).map(Number));

      const win = new Set(winRaw);
      const wins = haveRaw.filter((n) => win.has(n)).length;

      for (let i = 1; i <= wins; i++) {
        copies[cardIndex + i] += copies[cardIndex];
      }

      return copies[cardIndex];
    })
    .reduce((a, b) => a + b)
    .toString();
};
