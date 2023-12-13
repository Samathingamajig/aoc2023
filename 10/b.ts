import text from "./input.txt";

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

const twins = {
  F: "J",
  // L: "7",
  "7": "L",
  // J: "F",
};

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
  const drs: number[] = [];
  const dcs: number[] = [];
  const positions = new Set<`${number},${number}`>();

  let columnChanged = false;
  for (const dir of cardinalDirs) {
    const r = startRow + dir.dr;
    const c = startCol + dir.dc;
    if (board[r][c] != ".") {
      columnChanged ||= dir.dc != 0;
      const dirs2 = connections[board[r][c] as keyof typeof connections];
      if (dirs2.some(({ dr: dr2, dc: dc2 }) => dir.dr == -dr2 && dir.dc == -dc2)) {
        rows.push(r);
        cols.push(c);
        drs.push(dir.dr);
        dcs.push(dir.dc);
      }
    }
  }

  board[startRow][startCol] = Object.entries(connections).find(([_, deltas]) =>
    deltas.every(({ dr, dc }) => drs.some((dr2) => dr == dr2) && dcs.some((dc2) => dc == dc2)),
  )![0];
  // console.log(rows[0], cols[0]);
  // console.log(rows[1], cols[1]);
  positions.add(`${startRow},${startCol}`);
  positions.add(`${rows[0]},${cols[0]}`);
  positions.add(`${rows[1]},${cols[1]}`);

  // console.log(board.map((r) => r.join("")).join("\n"));
  // return "";

  // console.log(board.map((row) => row.join("")).join("\n"));

  while (true) {
    const prev = [];
    for (let i = 0; i < rows.length; i++) {
      prev.push(board[rows[i]][cols[i]]);
      positions.add(`${rows[i]},${cols[i]}`);
      // board[rows[i]][cols[i]] = ".";
    }

    let changed = 0;
    for (let i = 0; i < rows.length; i++) {
      for (const dir of connections[prev[i] as keyof typeof connections]) {
        if (!positions.has(`${rows[i] + dir.dr},${cols[i] + dir.dc}`)) {
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
    } else {
      // console.log("a");
      break;
    }

    if (rows[0] == rows[1] && cols[0] == cols[1]) {
      // console.log("b");
      break;
    }
  }

  for (let i = 0; i < 2; i++) {
    positions.add(`${rows[i]},${cols[i]}`);
  }

  let count = 0;

  for (let c = 0; c < board[0].length; c++) {
    let innie = false;
    let prev = "";
    for (let r = 0; r < board.length; r++) {
      if (positions.has(`${r},${c}`)) {
        if (board[r][c] == "|") {
          // carry on
        } else if (board[r][c] == "-") {
          // flip
          if (prev != "") {
            // console.log("weirdchamp", r, c, prev);
          }
          innie = !innie;
        } else if (board[r][c] == twins[prev]) {
          prev = "";
          // continue on
        } else {
          prev = board[r][c];
          innie = !innie;
        }
      } else {
        if (innie) {
          count++;
        }
      }
    }
    if (innie) {
      // console.log(c, "uhoh");
    }
  }

  return count.toString();
};

const trimmed = text.trim();
for (let i = 0; i < 100; i++) {
  solution(trimmed);
}

let totalTime = 0;
for (let i = 0; i < 100; i++) {
  const start = Bun.nanoseconds();
  solution(trimmed);
  totalTime += Bun.nanoseconds() - start;
}

console.log(totalTime / 1_000_000_000 / 100);
