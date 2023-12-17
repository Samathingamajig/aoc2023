import { PriorityQueue } from "@datastructures-js/priority-queue";

class Cell {
  public total: number[][];
  constructor(public weight: number) {
    this.total = Array.from({ length: 4 }, () => Array.from({ length: 11 }, () => Infinity));
  }
}

type Path = {
  destRow: number;
  destCol: number;
  total: number;
  prevDir: Dir;
  prevRepeatCount: number;
};

type Dir = {
  dr: number;
  dc: number;
};

const dirs = [
  { dr: 1, dc: 0 },
  { dr: -1, dc: 0 },
  { dr: 0, dc: 1 },
  { dr: 0, dc: -1 },
] satisfies Dir[];

export const solution = (input: string) => {
  const grid = input.split("\n").map((row) => row.split("").map((val) => new Cell(+val)));

  const q = new PriorityQueue<Path>((p1, p2) => p1.total - p2.total);
  q.push({
    destCol: 0,
    destRow: 0,
    prevDir: { dr: 0, dc: 0 },
    prevRepeatCount: 0,
    total: 0,
  });

  let bestTotal = Infinity;

  allOfIt: while (true) {
    const path = q.pop();

    for (const dir of dirs) {
      if (dir.dr == -path.prevDir.dr && dir.dc == -path.prevDir.dc) continue;
      if (path.prevRepeatCount < 4 && dir != path.prevDir && !(path.prevDir.dr == 0 && path.prevDir.dc == 0)) continue;
      const newRow = path.destRow + dir.dr;
      const newCol = path.destCol + dir.dc;
      const newRepeatCount = path.prevDir == dir ? path.prevRepeatCount + 1 : 1;

      if (newRow < 0 || newRow >= grid.length || newCol < 0 || newCol >= grid[0].length || newRepeatCount > 10)
        continue;

      const next = grid[newRow][newCol];
      const newTotal = path.total + next.weight;

      if (newRow == grid.length - 1 && newCol == grid[0].length - 1 && newRepeatCount >= 4) {
        // console.log(path.destRow, path.destCol);
        bestTotal = newTotal;
        break allOfIt;
      }

      if (newTotal < next.total[dirs.indexOf(dir)][newRepeatCount]) {
        next.total[dirs.indexOf(dir)][newRepeatCount] = newTotal;
        q.enqueue({ destCol: newCol, destRow: newRow, prevDir: dir, prevRepeatCount: newRepeatCount, total: newTotal });
      }
    }
  }

  return bestTotal.toString();
};
