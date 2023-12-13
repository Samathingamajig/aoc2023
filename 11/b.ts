import text from "./input.txt";
text + "";

type Galaxy = { r: number; c: number; marked: boolean };

export const solution = (input: string) => {
  const bigDiff = input.length < 1000 ? 100 : 1000000;
  const grid = input
    .split("\n")
    .map((line) => line.split(""))
    .reduce((acc, curr) => {
      // acc.push(curr);
      if (curr.every((char) => char == ".")) {
        acc.push(curr.map(() => "-"));
      } else {
        acc.push(curr);
      }
      return acc;
    }, [] as string[][]);
  // console.log(grid[0], grid[0].length);
  for (let c = 0; c < grid[0].length; c++) {
    // console.log(c);
    // console.log(grid.map((r) => r[c]).join(""));
    if (grid.every((row) => row[c] != "#")) {
      for (const row of grid) {
        row[c] = row[c] == "." ? "|" : "+";
      }
    }
    // console.log("len", grid[0].length, c);
  }
  // return "";

  const galaxies: Galaxy[] = [];

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] == "#") {
        galaxies.push({ r, c, marked: false });
      }
    }
  }

  // console.log(grid.map((r) => r.join("")).join("\n"));

  return galaxies
    .map((a, ai) => {
      a.marked = true;
      return galaxies
        .map((b, bi) => {
          if (a == b || b.marked) return 0;
          let dist = 0;
          const minR = Math.min(a.r, b.r);
          const maxR = Math.max(a.r, b.r);
          for (let r = minR; r < maxR; r++) {
            if (grid[r][a.c] == "-" || grid[r][a.c] == "+") {
              dist += bigDiff;
            } else {
              dist++;
            }
          }
          const minC = Math.min(a.c, b.c);
          const maxC = Math.max(a.c, b.c);
          for (let c = minC; c < maxC; c++) {
            if (grid[a.r][c] == "|" || grid[a.r][c] == "+") {
              dist += bigDiff;
            } else {
              dist++;
            }
          }
          return dist;
        })
        .reduce((a, b) => a + b);
    })
    .reduce((a, b) => a + b)
    .toString();
};

// solution(text.trim());
