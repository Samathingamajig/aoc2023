export const solution = (input: string) => {
  const data = input.split("\n").map((d) => {
    const raw = d.split(" ");
    return [raw[0], Number(raw[1]), raw[2].slice(2, raw[2].length - 1)] as const;
  });

  const touched = new Set<string>();
  let row = 0;
  let col = 0;

  let maxRow = 0;
  let minRow = 0;
  let maxCol = 0;
  let minCol = 0;

  const add = (r: number, c: number, touched: Set<string>) => {
    maxRow = Math.max(maxRow, r);
    minRow = Math.min(minRow, r);
    maxCol = Math.max(maxCol, c);
    minCol = Math.min(minCol, c);
    touched.add(`${r}|${c}`);
  };

  add(row, col, touched);

  for (const d of data) {
    for (let i = 0; i < d[1]; i++) {
      switch (d[0]) {
        case "U":
          row--;
          break;
        case "D":
          row++;
          break;
        case "L":
          col--;
          break;
        case "R":
          col++;
          break;
      }

      add(row, col, touched);
    }
  }

  console.log({ minRow, maxRow, minCol, maxCol });

  const navigate = (initialRow: number, initialCol: number, touched: Set<string>) => {
    const visited = new Set(touched);
    const queue = [[initialRow, initialCol] as const];

    const dirs = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    while (queue.length) {
      const pos = queue.pop()!;
      const r = pos[0];
      const c = pos[1];

      for (const dir of dirs) {
        const nr = r + dir[0];
        const nc = c + dir[1];
        if (!visited.has(`${nr}|${nc}`)) {
          visited.add(`${nr}|${nc}`);
          queue.push([nr, nc]);
        }
        if (nr > maxRow || nr < minRow || nc < minCol || nc > maxCol) {
          return -1;
        }
      }
    }

    return visited.size;
  };

  return Math.max(
    navigate(-1, -1, touched),
    navigate(1, -1, touched),
    navigate(-1, 1, touched),
    navigate(1, 1, touched),
  );

  // return "62";
};
