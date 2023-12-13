export const solution = (input: string) => {
  return (
    input
      .split("\n")
      .map((s, i) => [s, i + 1])
      .filter(([s, i]) => {
        const game = s
          .split(": ")[1]
          .trim()
          .split(";")
          .map((t) => t.trim());
        // const score = {
        //   red: 0,
        //   green: 0,
        //   blue: 0,
        // };
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
          if (!(score.red <= 12 && score.green <= 13 && score.blue <= 14)) {
            return false;
          }
        }
        return true;
      })
      // .map((e, i) => {
      //   console.log(e, i);
      //   return e;
      // })
      // .filter((g) => g[0].red <= 12 && g[0].green <= 13 && g[0].blue <= 14)
      .reduce((acc, cur) => acc + cur[1], 0)
      .toString()
  );
};

console.log(solution("Game 234: 1 red, 2 green, 3 blue"));
console.log(
  solution(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`),
);
