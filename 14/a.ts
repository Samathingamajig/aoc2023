export const solution = (input: string) => {
  const grid = input.split("\n").map((line) => line.split(""));

  const forceUp = (initialI: number, j: number) => {
    for (let i = initialI; i >= 1 && grid[i][j] == "O" && grid[i - 1][j] == "."; i--) {
      grid[i][j] = ".";
      grid[i - 1][j] = "O";
    }
  };

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      forceUp(i, j);
    }
  }

  console.log(grid);

  let sum = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == "O") {
        console.log(grid.length - i);
        sum += grid.length - i;
      }
    }
  }

  return sum.toString();
};
