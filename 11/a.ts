type Galaxy = { r: number; c: number; marked: boolean };

export const solution = (input: string) => {
  const grid = input
    .split("\n")
    .map((line) => line.split(""))
    .reduce((acc, curr) => {
      acc.push(curr);
      if (curr.every((char) => char == ".")) {
        acc.push(curr.slice());
      }
      return acc;
    }, [] as string[][]);
  console.log(grid[0], grid[0].length);
  for (let c = 0; c < grid[0].length; c++) {
    console.log(c);
    console.log(grid.map((r) => r[c]).join(""));
    if (grid.every((row) => row[c] != "#")) {
      console.log(c, true);
      for (const row of grid) {
        row.splice(c, 0, ".");
      }
      c++;
    }
    // console.log("len", grid[0].length, c);
  }

  const galaxies: Galaxy[] = [];

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] == "#") {
        galaxies.push({ r, c, marked: false });
      }
    }
  }

  console.log(grid.map((r) => r.join("")).join("\n"));

  return galaxies
    .map((a, ai) => {
      a.marked = true;
      return galaxies
        .map((b, bi) => {
          if (a == b || b.marked) return 0;
          const dist = Math.abs(a.r - b.r) + Math.abs(a.c - b.c);
          // console.log(ai + 1, bi + 1, dist);
          return dist;
        })
        .reduce((a, b) => a + b);
    })
    .reduce((a, b) => a + b)
    .toString();
};
