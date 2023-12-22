type Brick = {
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
  outNodes: number[];
  special: boolean;
};

export const solution = (input: string) => {
  // console.log("woohoo");
  // console.time("parsing");
  const bricks = input
    .split("\n")
    .map((brick) => {
      // const corners = brick.split("~");
      const mid = brick.indexOf("~");

      return {
        minX: +brick[0],
        minY: +brick[2],
        minZ: +brick.slice(4, mid),
        maxX: +brick[mid + 1],
        maxY: +brick[mid + 3],
        maxZ: +brick.slice(mid + 5),
        outNodes: [],
        special: false,
      } as Brick;
    })
    // console.timeEnd("parsing");

    // console.time("sorting");
    .sort((a, b) => a.minZ - b.minZ);
  // console.timeEnd("sorting");

  // for (let bi = 0; bi < bricks.length; bi++) {
  //   bricks[bi].id = bi;
  // }

  bricks[-1] = { maxZ: 0, outNodes: { push() {} } } as unknown as Brick;
  const inNodesCounts = new Int16Array(bricks.length);

  // console.time("dropping bricks");
  // Yoinked from Fugi
  // https://gist.github.com/FugiTech/efe373cfc5cedafbd30598420e94bab5#file-solve-ts-L25-L45
  // now with a lot more modifications
  const grid = new Int16Array(100).fill(-1);
  for (let bi = 0; bi < bricks.length; bi++) {
    const b = bricks[bi];
    // b.id = bi;
    const below = new Set<number>();
    for (let y = b.minY; y <= b.maxY; y++) {
      for (let x = b.minX; x <= b.maxX; x++) {
        // const k = ;
        // if (k !== -1) {
        below.add(grid[y * 10 + x]);
        // }
        grid[y * 10 + x] = bi;
      }
    }

    const B = [...below];
    const Z = Math.max(...B.map((k) => bricks[k].maxZ));
    // const d = b.minZ - Z - 1;
    // b.minZ -= d;
    b.maxZ -= b.minZ - Z - 1;
    const inNodes = B.filter((k) => bricks[k].maxZ === Z);
    inNodesCounts[bi] = inNodes.length;
    const winner = inNodes.length === 1;
    for (let i = 0; i < inNodes.length; i++) {
      bricks[inNodes[i]].outNodes.push(bi);
      bricks[inNodes[i]].special ||= winner;
    }
    // inNodes.forEach((k) => {
    //   bricks[k].outNodes.push(bi);
    //   bricks[k].special ||= winner;
    // });
  }
  // console.timeEnd("dropping bricks");

  let sum = 0;

  // console.time("finale");
  const scratch = new Int16Array(bricks.length);
  const queue = new Int16Array(bricks.length);
  for (let bi = 0; bi < bricks.length; bi++) {
    if (bricks[bi].special) {
      let qi = 1;
      queue[0] = bi;
      scratch.fill(0);
      // const scratch = new Int16Array(bricks.length);
      // const queue = [startingBrick.id];
      for (let i = 0; i < qi; i++) {
        const brick = queue[i];
        for (const out of bricks[brick].outNodes) {
          scratch[out]++;
          if (scratch[out] === inNodesCounts[out]) {
            queue[qi] = out;
            ++qi;
          }
        }
      }
      sum += qi - 1;
    }
  }
  // console.timeEnd("finale");

  return sum;
};
