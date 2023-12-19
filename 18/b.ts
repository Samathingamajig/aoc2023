export const solution = (input: string) => {
  const data = input.split("\n").map((d) => {
    const raw = d.split(" ");
    // console.log(raw);
    const care = raw[2].slice(2, raw[2].length - 1);
    // console.log(care);

    return ["RDLU"[+care[5]], parseInt(care.slice(0, 5), 16)] as const;
  });

  let row = 0;
  let col = 0;
  // let miscounted = 0;

  let maxRow = 0;
  let minRow = 0;
  let maxCol = 0;
  let minCol = 0;

  let internalArea = 0;

  for (let di = 0; di < data.length; di++) {
    const d = data[di];
    const prevCol = col;
    const prevRow = row;
    switch (d[0]) {
      case "U":
        row -= d[1];
        break;
      case "D":
        row += d[1];
        break;
      case "L":
        col -= d[1];
        break;
      case "R":
        col += d[1];
        break;
    }

    internalArea += (prevCol * row - col * prevRow) / 2;

    maxRow = Math.max(maxRow, row);
    minRow = Math.min(minRow, row);
    maxCol = Math.max(maxCol, col);
    minCol = Math.min(minCol, col);
    // add(row, col, touched);
    // }
  }

  // console.log(data);
  // console.log(internalArea);
  console.log({ minRow, maxRow, minCol, maxCol });
  // console.log(changes);

  /*
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
  */

  // console.log(changes);

  let foo = 0;
  for (const d of data) {
    foo += d[1];
    // area += d[1] - 1;
  }
  console.log({ foo });

  console.timeEnd("foo");

  // return Math.max(
  //   navigate(-1, -1, touched),
  //   navigate(1, -1, touched),
  //   navigate(-1, 1, touched),
  //   navigate(1, 1, touched),
  // );

  // return "62";
  // return 952408144115;
  return internalArea + 1 - Math.floor(foo / 2) + foo;
};
