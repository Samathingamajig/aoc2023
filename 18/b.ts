export const solution = (input: string) => {
  const data = input.split("\n").map((d) => {
    const raw = d.split(" ");
    // console.log(raw);
    const care = raw[2].slice(2, raw[2].length - 1);
    // console.log(care);

    return ["RDLU"[+care[5]], parseInt(care.slice(0, 5), 16)] as const;
  });

  const START = 1;
  const STOP = 2;
  const EITHER = START | STOP;

  let row = 0;
  let col = 0;
  let prevHor = "";
  // let miscounted = 0;
  const changes: { startCol: number; endCol: number; row: number; shouldChange: number }[] = [];

  let maxRow = 0;
  let minRow = 0;
  let maxCol = 0;
  let minCol = 0;

  for (let di = 0; di < data.length; di++) {
    const d = data[di];
    // for (let i = 0; i < d[1]; i++) {
    const prevCol = col;
    let signDir = 0;
    switch (d[0]) {
      case "U":
        row -= d[1];
        break;
      case "D":
        row += d[1];
        break;
      case "L":
        col -= d[1];
        signDir = -1;
        break;
      case "R":
        col += d[1];
        signDir = 1;
        break;
    }

    if (d[0] == "L" || d[0] == "R") {
      // if (prevHor == d[0]) {
      //   changes.push({
      //     startCol: Math.min(prevCol, col),
      //     endCol: Math.max(prevCol, col),
      //     // startCol: Math.min(prevCol + signDir, col),
      //     // endCol: Math.max(prevCol + signDir, col),
      //     row,
      //     shouldChange: fal se,
      //   });
      // } else {
      //   changes.push({ startCol: Math.min(prevCol, col), endCol: Math.max(prevCol, col), row, shouldChange: true });
      //   prevHor = d[0];
      // }
      changes.push({
        startCol: Math.min(prevCol + signDir, col - signDir),
        endCol: Math.max(prevCol + signDir, col - signDir),
        row,
        shouldChange: EITHER,
      });

      changes.push({ startCol: col, endCol: col, row, shouldChange: data[di + 1][0] == "U" ? START : STOP });
      if (di > 0) {
        changes.push({ startCol: col, endCol: col, row, shouldChange: data[di - 1][0] == "U" ? START : STOP });
      }
    }

    maxRow = Math.max(maxRow, row);
    minRow = Math.min(minRow, row);
    maxCol = Math.max(maxCol, col);
    minCol = Math.min(minCol, col);
    // add(row, col, touched);
    // }
  }

  // console.log(data);
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

  changes.sort((a, b) => a.row - b.row);
  // console.log(changes);
  let area = 0;
  console.time("foo");
  for (let c = minCol - 1; c <= maxCol + 1; c++) {
    let init = false;
    let prev: (typeof changes)[number] = {
      startCol: -Infinity,
      endCol: Infinity,
      row: minRow - 100,
      shouldChange: 0,
    };
    // let prevRow = minRow - 100;
    for (const change of changes) {
      if (prev.row == change.row) continue;
      // if (change.shouldChange == STOP) continue;
      if (c >= change.startCol && c <= change.endCol) {
        // if (prev.endCol == change.startCol) {
        //   area += change.row - prev.row;
        //   if (change.shouldChange || prev.shouldChange) {
        //     init = !init;
        //   }
        // } else {
        //   if (init) {
        //     area += change.row - prev.row + 1;
        //   }

        //   init = !init;
        // }
        // prev = change;
        if (init) {
          // area += change.row - prev.row + 1;
          area += change.row - prev.row - 1;
        }
        if (change.shouldChange == START) {
          init = true;
        } else if (change.shouldChange == STOP) {
          init = false;
        } else {
          init = !init;
        }
        prev = change;
      }
    }
  }

  for (const d of data) {
    area += d[1] - 1;
  }

  console.timeEnd("foo");

  // return Math.max(
  //   navigate(-1, -1, touched),
  //   navigate(1, -1, touched),
  //   navigate(-1, 1, touched),
  //   navigate(1, 1, touched),
  // );

  // return "62";
  // return 952408144115;
  return area;
};
