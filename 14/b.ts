export const solution = (input: string) => {
  // if (input.length > 1000) return "huh";
  const grid = input.split("\n").map((line) => line.split(""));

  const forceNorth = (initialI: number, j: number) => {
    for (let i = initialI; i >= 1 && grid[i][j] == "O" && grid[i - 1][j] == "."; i--) {
      grid[i][j] = ".";
      grid[i - 1][j] = "O";
    }
  };

  const forceWest = (i: number, initialJ: number) => {
    for (let j = initialJ; j >= 1 && grid[i][j] == "O" && grid[i][j - 1] == "."; j--) {
      grid[i][j] = ".";
      grid[i][j - 1] = "O";
    }
  };

  const forceSouth = (initialI: number, j: number) => {
    for (let i = initialI; i < grid.length - 1 && grid[i][j] == "O" && grid[i + 1][j] == "."; i++) {
      grid[i][j] = ".";
      grid[i + 1][j] = "O";
    }
  };

  const forceEast = (i: number, initialJ: number) => {
    for (let j = initialJ; j < grid[0].length - 1 && grid[i][j] == "O" && grid[i][j + 1] == "."; j++) {
      grid[i][j] = ".";
      grid[i][j + 1] = "O";
    }
  };

  const stringify = (grid: string[][]) => grid.map((l) => l.join("")).join("\n");

  const memo = new Map<string, number>();
  let cycle = 0;
  let foundLoop = false;
  while (cycle < 1000000000) {
    // console.log("on cycle", cycle);
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        forceNorth(i, j);
      }
    }
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        forceWest(i, j);
      }
    }

    for (let i = grid.length - 1; i >= 0; i--) {
      for (let j = grid[0].length - 1; j >= 0; j--) {
        forceSouth(i, j);
      }
    }

    for (let i = grid.length - 1; i >= 0; i--) {
      for (let j = grid[0].length - 1; j >= 0; j--) {
        forceEast(i, j);
      }
    }

    if (!foundLoop) {
      const s = stringify(grid);
      if (memo.has(s)) {
        foundLoop = true;
        const diff = cycle - memo.get(s)!;
        const remaining = 1000000000 - cycle - 1;
        const dist = Math.floor(remaining / diff) * diff;
        // console.log(dist);

        console.log("loop detected", memo.get(s), cycle, diff, cycle + dist);
        cycle += dist;
        // console.log(cycle);
      }
      memo.set(s, cycle);
    }
    cycle++;
  }

  // console.log(stringify(grid));
  // console.log();

  let sum = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == "O") {
        // console.log(grid.length - i);
        sum += grid.length - i;
      }
    }
  }

  return sum.toString();
};
