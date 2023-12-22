// class Position {
//   public x: number;
//   public y: number;
//   public z: number;
//   constructor(constr: string) {
//     [this.x, this.y, this.z] = constr.split(",").map(Number);
//   }
// }

class Brick {
  // public corner1: Position;
  // public corner2: Position;
  // public raw: string;
  // public finalIndex = Infinity;
  // public fallen = false;
  // public numOthersFall = 0;
  public inNodesCount = 0;
  public outNodes: Brick[];

  public minX: number;
  public maxX: number;
  public minY: number;
  public maxY: number;
  public minZ: number;
  public maxZ: number;
  constructor(constr: string, public id: number) {
    // const [corner1, corner2] = constr.split("~").map((p) => new Position(p));
    const corners = constr.split("~");
    //.map((p) => p.split(","));
    this.minX = +corners[0][0];
    this.minY = +corners[0][2];
    this.minZ = +corners[0].slice(4);
    this.maxX = +corners[1][0];
    this.maxY = +corners[1][2];
    this.maxZ = +corners[1].slice(4);
    // [this.minX, this.maxX] = [this.corner1.x, this.corner2.x].sort((a, b) => a - b);
    // [this.minY, this.maxY] = [this.corner1.y, this.corner2.y].sort((a, b) => a - b);
    // [this.minZ, this.maxZ] = [this.corner1.z, this.corner2.z].sort((a, b) => a - b);
    // if (this.minX != this.corner1.x || this.minY != this.corner1.y || this.minZ != this.corner1.z) {
    //   console.log("SIJFOJSDOFSDOJIOJ");
    // }
    // this.raw = constr;
    this.outNodes = [];
  }

  // collides(other: Brick) {
  //   // [minSelfX, maxSelfX] = [this.corner1.x, this.corner2.x].sort((a, b) => a - b);
  //   return (
  //     this.maxX >= other.minX &&
  //     this.minX <= other.maxX &&
  //     this.maxY >= other.minY &&
  //     this.minY <= other.maxY &&
  //     this.maxZ >= other.minZ &&
  //     this.minZ <= other.maxZ
  //   );
  // }

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
  console.log("woohoo");
  console.time("parsing");
  const bricks = input.split("\n").map((brick, i) => new Brick(brick, i));
  console.timeEnd("parsing");

  console.time("initial sort");
  bricks.sort((a, b) => a.minZ - b.minZ);
  console.timeEnd("initial sort");

  // console.time("sort but by max (copied array)");
  // const bricks2 = bricks.toSorted((a, b) => b.maxZ - a.maxZ);
  // console.timeEnd("sort but by max (copied array)");

  // for (const b1 of bricks) {
  //   for (const b2 of bricks) {
  //     if (b1 == b2) continue;
  //     // console.log(b1.raw, b2.raw, b1.collides(b2), b2.collides(b1), b1.collidesXY(b2), b2.collidesXY(b1));
  //   }
  // }

  console.time("dropping bricks");
  for (let bi = 0; bi < bricks.length; bi++) {
    // console.log(bi);
    const brick = bricks[bi];
    // let newZ = 0;
    // for (let i = 0; i < bricks2.length; i++) {
    //   const other = bricks2[i];
    //   if (other.maxZ < brick.minZ && other.collidesXY(brick)) {
    //     newZ = other.maxZ + 1;
    //     break;
    //   }
    // }
    let newZ = 0;
    for (let i = 0; i < bi; i++) {
      const other = bricks[i];
      if (other.maxZ >= newZ && other.maxZ < brick.minZ && other.collidesXY(brick)) {
        newZ = other.maxZ + 1;
      }
    }
    // const newZ = bricks.reduce((result, curr, i) => {
    //   if (i >= bi || curr.maxZ > brick.minZ || !curr.collidesXY(brick)) {
    //     return result;
    //   } else {
    //     return Math.max(result, curr.maxZ + 1);
    //   }
    // }, 0);
    brick.changeZ(newZ - brick.minZ);
    // console.log(newZ)
    // const careAbout = bricks.filter((other) => brick.collidesXY(other) && brick != other && other.maxZ < brick.minZ);
    // silly: while (true) {
    //   // console.log(brick.minSelfZ);

    //   for (let i = 0; i < careAbout.length; i++) {
    //     if (brick.collides(careAbout[i])) {
    //       brick.changeZ(1);
    //       break silly;
    //     }
    //   }
    //   if (brick.minZ == 0) {
    //     break;
    //   }
    //   brick.changeZ(-1);
    // }
  }
  console.timeEnd("dropping bricks");

  console.time("second sort");
  bricks.sort((a, b) => a.minZ - b.minZ);
  console.timeEnd("second sort");

  // for (let bi = 0; bi < bricks.length; bi++) {
  //   bricks[bi].finalIndex = bi;
  // }

  // console.log(bricks);

  // for (const brick of bricks) {
  console.time("building graph");
  for (let bi = 0; bi < bricks.length; bi++) {
    const brick = bricks[bi];
    for (let i = bi + 1; i < bricks.length; i++) {
      // for (const other of bricks) {
      const other = bricks[i];
      if (
        other.minZ - 1 == brick.maxZ && // again, useless comment to get better line breaks
        other.collidesXY(brick)
      ) {
        // console.log(brick.finalIndex + " " + other.finalIndex);
        brick.outNodes.push(other);
        other.inNodesCount++;
      } else if (other.minZ - 1 > brick.maxZ) break;
      // const careAbout2 = bricks.filter(
      //   (yetAnother) =>
      //     yetAnother.collidesXY(other) && // again, useless comment to get better line breaks
      //     yetAnother.maxZ + 1 == other.minZ &&
      //     yetAnother != brick &&
      //     yetAnother != other,
      // );
      // if (careAbout2.length == 0) {
      //   // other.fallen = true;
      // } else {
      //   brick.fallen = true;
      // }
    }
  }
  console.timeEnd("building graph");

  let sum = 0;

  // const removable = bricks.filter((brick) => brick.outNodes.some((other) => other.inNodesCount == 1));

  // for (const startingBrick of removable) {
  console.time("finale");
  // console.log(scratch);
  for (let bi = 0; bi < bricks.length; bi++) {
    const startingBrick = bricks[bi];
    // scratch.fill(0);
    const scratch = new Int16Array(bricks.length);
    if (startingBrick.outNodes.some((other) => other.inNodesCount == 1)) {
      // for (const other of bricks) {
      //   other.scratch = 0;
      // }

      const queue = [startingBrick];
      // brick.scratch = brick.inNodes.length;
      for (let i = 0; i < queue.length; i++) {
        const brick = queue[i];
        for (const out of brick.outNodes) {
          scratch[out.id]++;
          if (scratch[out.id] == out.inNodesCount) {
            // sum++;
            queue.push(out);
          }
        }
      }
      sum += queue.length - 1;
    }
  }
  console.timeEnd("finale");

  // console.log(bricks);

  // for (const b1 of bricks) {
  //   for (const b2 of bricks) {
  //     if (b1 == b2) continue;
  //     console.log(b1.raw, b2.raw, b1.collides(b2), b2.collides(b1));
  //   }
  // }
  // console.log(new Brick("0,0,0~0,0,0").collides(new Brick("0,0,0~0,0,0")));
  // console.log(new Brick("0,0,0~0,0,0").collides(new Brick("1,1,1~1,1,1")));
  // console.log(new Brick("0,0,0~0,0,0").collides(new Brick("0,0,0~1,1,1")));
  // console.log(new Brick("0,0,0~0,0,0").collides(new Brick("-1,-1,-1~1,1,1")));

  // return sum + " foo";
  // return 7;
  return sum;
};
