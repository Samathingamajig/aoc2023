const connections = {
  "|": [
    { dr: -1, dc: 0 },
    { dr: 1, dc: 0 },
  ],
  "-": [
    { dr: 0, dc: -1 },
    { dr: 0, dc: 1 },
  ],
  L: [
    { dr: -1, dc: 0 },
    { dr: 0, dc: 1 },
  ],
  J: [
    { dr: -1, dc: 0 },
    { dr: 0, dc: -1 },
  ],
  "7": [
    { dr: 0, dc: -1 },
    { dr: 1, dc: 0 },
  ],
  F: [
    { dr: 1, dc: 0 },
    { dr: 0, dc: 1 },
  ],
};

const cardinalDirs = [
  { dr: -1, dc: 0 },
  { dr: 1, dc: 0 },
  { dr: 0, dc: -1 },
  { dr: 0, dc: 1 },
];

export const solution = (input: string) => {
  // if (input.length > 1000) return "";
  const linesPre = input.split("\n").map((l) => `.${l}.`);
  linesPre.push(".".repeat(linesPre[0].length));
  linesPre.unshift(".".repeat(linesPre[0].length));
  const startRow = linesPre.findIndex((l) => l.includes("S"));
  const startCol = linesPre[startRow].indexOf("S");
  const board = linesPre.map((l) => l.split(""));

  const rows = [];
  const cols = [];
  // const positions = new Set<`${number},${number}`>();
  let count = 1;

  for (const dir of cardinalDirs) {
    const r = startRow + dir.dr;
    const c = startCol + dir.dc;
    if (board[r][c] != ".") {
      const dirs2 = connections[board[r][c] as keyof typeof connections];
      if (dirs2.some(({ dr: dr2, dc: dc2 }) => dir.dr == -dr2 && dir.dc == -dc2)) {
        rows.push(r);
        cols.push(c);
      }
    }
  }

  board[startRow][startCol] = ".";
  console.log(rows[0], cols[0]);
  console.log(rows[1], cols[1]);
  // console.log(board.map((row) => row.join("")).join("\n"));

  while (true) {
    const prev = [];
    for (let i = 0; i < rows.length; i++) {
      prev.push(board[rows[i]][cols[i]]);
      board[rows[i]][cols[i]] = ".";
    }

    let changed = 0;
    for (let i = 0; i < rows.length; i++) {
      for (const dir of connections[prev[i] as keyof typeof connections]) {
        if (board[rows[i] + dir.dr][cols[i] + dir.dc] != ".") {
          rows[i] = rows[i] + dir.dr;
          cols[i] = cols[i] + dir.dc;
          changed++;
          break;
        }
      }
    }
    // console.log("                ");
    // console.log(rows[0], cols[0]);
    // console.log(rows[1], cols[1]);
    // console.log(board.map((row) => row.join("")).join("\n"));
    // console.log(changed);
    if (changed == rows.length) {
      count++;
    } else {
      console.log("a");
      break;
    }

    if (rows[0] == rows[1] && cols[0] == cols[1]) {
      console.log("b");
      break;
    }
  }

  return count.toString();
};
