export const solution = (input: string) => {
  const ALLOWED_STEPS = input.length < 1000 ? 6 : 64;
  if (input.length < 1000) return -1;
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  const grid = input.split("\n").map((row) => "#" + row + "#");
  grid.push("#".repeat(grid[0].length));
  grid.unshift("#".repeat(grid[0].length));

  // const initialRows = grid
  //   .map((r, i) => [r, i] as const)
  //   .filter(([r]) => r.includes("S"))
  //   .map((_, i) => i);
  // const initialCols = grid[initialRow].indexOf("S");

  // let prev = new Set([`66,66`]);
  // let prev = new Set([`1,66`]);
  // let prev = new Set([`1,66`, `66,1`]);
  let prev = new Set([`131,1`]);
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
    // console.log(
    //   "step " + (i + 1),
    //   grid.map((row, r) => [...row].map((char, c) => (prev.has(r + "," + c) ? "O" : char)).join("")).join("\n"),
    // );
    // prompt();
  }

  console.log(
    grid.map((row, r) => [...row].map((char, c) => (prev.has(r + "," + c) ? "O" : char)).join("")).join("\n"),
  );

  return prev.size;
};
