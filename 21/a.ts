export const solution = (input: string) => {
  const ALLOWED_STEPS = input.length < 1000 ? 6 : 64;
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  const grid = input.split("\n").map((row) => "#" + row + "#");
  grid.push("#".repeat(grid[0].length));
  grid.unshift("#".repeat(grid[0].length));

  const initialRow = grid.findIndex((r) => r.includes("S"));
  const initialCol = grid[initialRow].indexOf("S");

  let prev = new Set([`${initialRow},${initialCol}`]);
  for (let i = 0; i < ALLOWED_STEPS; i++) {
    const next = new Set<string>();
    for (const pos of prev) {
      const [row, col] = pos.split(",").map(Number);
      for (const [dr, dc] of dirs) {
        const r = dr + row;
        const c = dc + col;
        if (grid[r][c] == "." || grid[r][c] == "S") {
          next.add(`${r},${c}`);
        }
      }
    }
    prev = next;
  }

  return prev.size;
};
