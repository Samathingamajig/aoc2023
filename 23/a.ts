// import { PriorityQueue } from "@datastructures-js/priority-queue";
import FlatQueue from "flatqueue";

export const solution = (input: string) => {
  const grid = input.split("\n").map((row, ri) =>
    row.split("").map((c, ci) => ({
      char: c,
      longest: 0,
      pos: [ri, ci] as const,
      prev: undefined as [number, number] | undefined,
    })),
  );
  const startRow = 0;
  const startCol = grid[0].findIndex((c) => c.char == ".");
  grid[startRow][startCol].char = "#";
  grid[startRow + 1][startCol].longest = 1;
  grid[startRow + 1][startCol].prev = [-1, 0];
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const mapping = {
    ">": [0, 1],
    "<": [0, -1],
    "^": [-1, 0],
    v: [1, 0],
  };

  const queue = new FlatQueue<[number, number]>();

  queue.push([startRow + 1, startCol], 1);
  while (queue.length) {
    const prevValue = queue.peekValue();
    const [qr, qc] = queue.pop()!;
    // console.log(qr, qc, prevValue);
    const cell = grid[qr][qc];
    if (prevValue != cell.longest) continue;
    for (const dir of dirs) {
      const [dr, dc] = dir;
      if (-dr == cell.prev?.[0] && -dc == cell.prev?.[1]) {
        continue;
      }
      const newRow = qr + dr;
      const newCol = qc + dc;
      const newCell = grid[newRow][newCol];
      if (newCell.char == "#") continue;
      if (newCell.longest > cell.longest) continue;
      const maybeAngle = mapping[newCell.char as keyof typeof mapping];
      if (maybeAngle && -dr == maybeAngle[0] && -dc == maybeAngle[1]) {
        continue;
      }
      newCell.longest = cell.longest + 1;
      newCell.prev = [dr, dc];
      if (newRow < grid.length - 1) {
        queue.push([newRow, newCol], newCell.longest);
      }
    }
  }

  const endRow = grid.length - 1;
  const endCol = grid[endRow].findIndex((c) => c.char == ".");

  return grid[endRow][endCol].longest;
};
