export const solution = (input: string) => {
  return input
    .split("\n")
    .map((s, i) => [s, i + 1])
    .map(([s, i]) => {
      const game = s
        .split(": ")[1]
        .trim()
        .split(";")
        .map((t) => t.trim());
      const maxScore = {
        red: 0,
        green: 0,
        blue: 0,
      };
      // console.log(game);
      for (const g of game) {
        const score = {
          red: 0,
          green: 0,
          blue: 0,
        };
        const points = g.split(",").map((t: string) => t.trim());
        console.log(g);
        for (const p of points) {
          const num = Number(p.split(" ")[0].trim());
          const color = p.split(" ")[1].trim();
          console.log("   ", num, color);
          score[color] += num;
        }

        for (const k in maxScore) {
          maxScore[k] = Math.max(maxScore[k], score[k]);
        }
      }
      return maxScore.red * maxScore.green * maxScore.blue;
    })
    .reduce((acc, cur) => acc + cur, 0)
    .toString();
};
