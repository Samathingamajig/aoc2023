class Brick {
  public inNodesCount = 0;
  public outNodes: Brick[];

  public minX: number;
  public maxX: number;
  public minY: number;
  public maxY: number;
  public minZ: number;
  public maxZ: number;
  constructor(constr: string, public id: number) {
    const corners = constr.split("~");
    this.minX = +corners[0][0];
    this.minY = +corners[0][2];
    this.minZ = +corners[0].slice(4);
    this.maxX = +corners[1][0];
    this.maxY = +corners[1][2];
    this.maxZ = +corners[1].slice(4);
    this.outNodes = [];
  }

  collidesXY(other: Brick) {
    return (
      this.maxX >= other.minX && // useless comment to get better line breaks
      this.minX <= other.maxX &&
      this.maxY >= other.minY &&
      this.minY <= other.maxY
    );
  }

  changeZ(dz: number) {
    this.minZ += dz;
    this.maxZ += dz;
  }
}

export const solution = (input: string) => {
  // console.log("woohoo");
  // console.time("parsing");
  const bricks = input.split("\n").map((brick, i) => new Brick(brick, i));
  // console.timeEnd("parsing");

  // console.time("initial sort");
  bricks.sort((a, b) => a.minZ - b.minZ);
  // console.timeEnd("initial sort");
  for (let bi = 0; bi < bricks.length; bi++) {
    bricks[bi].id = bi;
  }

  // console.time("dropping bricks");
  // Yoinked from Fugi
  // https://gist.github.com/FugiTech/efe373cfc5cedafbd30598420e94bab5#file-solve-ts-L25-L45
  const grid = new Int16Array(100).fill(-1);
  bricks.forEach((b) => {
    const below = new Set<number>();
    for (let y = b.minY; y <= b.maxY; y++) {
      for (let x = b.minX; x <= b.maxX; x++) {
        const k = grid[y * 10 + x];
        if (k !== -1) {
          below.add(k);
        }
        grid[y * 10 + x] = b.id;
      }
    }

    const B = Array.from(below);
    const Z = Math.max(0, ...B.map((k) => bricks[k].maxZ));
    const d = b.minZ - Z - 1;
    b.minZ -= d;
    b.maxZ -= d;
    const inNodes = B.filter((k) => bricks[k].maxZ === Z);
    b.inNodesCount = inNodes.length;
    inNodes.forEach((k) => bricks[k].outNodes.push(bricks[b.id]));
  });
  // console.timeEnd("dropping bricks");

  let sum = 0;

  // console.time("finale");
  for (let bi = 0; bi < bricks.length; bi++) {
    const startingBrick = bricks[bi];
    const scratch = new Int16Array(bricks.length);
    if (startingBrick.outNodes.some((other) => other.inNodesCount == 1)) {
      const queue = [startingBrick];
      for (let i = 0; i < queue.length; i++) {
        const brick = queue[i];
        for (const out of brick.outNodes) {
          scratch[out.id]++;
          if (scratch[out.id] == out.inNodesCount) {
            queue.push(out);
          }
        }
      }
      sum += queue.length - 1;
    }
  }
  // console.timeEnd("finale");

  return sum;
};
