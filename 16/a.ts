type Direction = {
  dx: number;
  dy: number;
};

const printGrid = (grid: string[], visited: Set<string>) => {
  console.log(
    grid
      .map((row, y) =>
        row
          .split("")
          .map((c, x) => (visited.has(x + "|" + y) ? "#" : c))
          .join(""),
      )
      .join("\n"),
  );
  console.log();
};

const traverse = (
  x: number,
  y: number,
  dir: Direction,
  grid: string[],
  queue: { x: number; y: number; dir: Direction }[],
  visited: Set<string>,
  visitedDirBased: Set<string>,
) => {
  // console.log("traverse called", x, y, dir);
  const nextX = x + dir.dx;
  const nextY = y + dir.dy;
  const key = `${x}|${y}|${dir.dx}|${dir.dy}`;
  if (visitedDirBased.has(key)) {
    return;
  } else {
    visitedDirBased.add(key);
  }
  if (nextX < 0 || nextX >= grid[0].length || nextY < 0 || nextY >= grid.length) {
    // console.log("early`");
    return;
  }
  const next = grid[nextY][nextX];

  visited.add(`${nextX}|${nextY}`);
  // visitedDirBased.add

  if (next == ".") {
    queue.push({ x: nextX, y: nextY, dir });
  } else if (next == "|") {
    if (Math.abs(dir.dy) == 1) {
      // console.log(dir.dy);
      queue.push({ x: nextX, y: nextY, dir });
    } else {
      queue.push({ x: nextX, y: nextY, dir: { dx: 0, dy: 1 } });
      queue.push({ x: nextX, y: nextY, dir: { dx: 0, dy: -1 } });
    }
  } else if (next == "-") {
    if (Math.abs(dir.dx) == 1) {
      queue.push({ x: nextX, y: nextY, dir });
    } else {
      // console.log(dir.dx);
      queue.push({ x: nextX, y: nextY, dir: { dx: 1, dy: 0 } });
      queue.push({ x: nextX, y: nextY, dir: { dx: -1, dy: 0 } });
    }
  } else if (next == "/") {
    queue.push({ x: nextX, y: nextY, dir: { dx: -dir.dy, dy: -dir.dx } });
  } else if (next == "\\") {
    queue.push({ x: nextX, y: nextY, dir: { dx: dir.dy, dy: dir.dx } });
    // } else {
    //   console.log("huh", next, x, y, nextX, nextY);
  }
};

export const solution = (input: string) => {
  const grid = input.split("\n"); //.map((row) => "." + row + ".");
  // grid.push(".".repeat(input[0].length));
  // grid.unshift(".".repeat(input[0].length));
  console.log(grid);

  const queue: { x: number; y: number; dir: Direction }[] = [];
  const visited = new Set<string>();
  const visitedDirBased = new Set<string>();
  queue.push({ x: -1, y: 0, dir: { dx: 1, dy: 0 } });

  while (queue.length > 0) {
    const next = queue.pop()!;
    traverse(next.x, next.y, next.dir, grid, queue, visited, visitedDirBased);
  }

  console.log(grid);
  printGrid(grid, visited);

  return visited.size.toString();
};
