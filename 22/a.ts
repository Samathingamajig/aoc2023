class Position {
  public x: number;
  public y: number;
  public z: number;
  constructor(constr: string) {
    [this.x, this.y, this.z] = constr.split(",").map(Number);
  }
}

class Brick {
  public corner1: Position;
  public corner2: Position;
  public raw: string;

  public minX: number;
  public maxX: number;
  public minY: number;
  public maxY: number;
  public minZ: number;
  public maxZ: number;
  constructor(constr: string) {
    [this.corner1, this.corner2] = constr.split("~").map((p) => new Position(p));
    [this.minX, this.maxX] = [this.corner1.x, this.corner2.x].sort((a, b) => a - b);
    [this.minY, this.maxY] = [this.corner1.y, this.corner2.y].sort((a, b) => a - b);
    [this.minZ, this.maxZ] = [this.corner1.z, this.corner2.z].sort((a, b) => a - b);
    this.raw = constr;
  }

  collides(other: Brick) {
    // [minSelfX, maxSelfX] = [this.corner1.x, this.corner2.x].sort((a, b) => a - b);
    return (
      this.maxX >= other.minX &&
      this.minX <= other.maxX &&
      this.maxY >= other.minY &&
      this.minY <= other.maxY &&
      this.maxZ >= other.minZ &&
      this.minZ <= other.maxZ
    );
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
    this.corner1.z += dz;
    this.corner2.z += dz;
    this.minZ += dz;
    this.maxZ += dz;
  }
}

export const solution = (input: string) => {
  console.log("woohoo");
  const bricks = input.split("\n").map((brick) => new Brick(brick));
  bricks.sort((a, b) => a.minZ - b.minZ);

  for (const b1 of bricks) {
    for (const b2 of bricks) {
      if (b1 == b2) continue;
      // console.log(b1.raw, b2.raw, b1.collides(b2), b2.collides(b1), b1.collidesXY(b2), b2.collidesXY(b1));
    }
  }

  for (let bi = 0; bi < bricks.length; bi++) {
    // console.log(bi);
    const brick = bricks[bi];
    const careAbout = bricks.filter((other) => brick.collidesXY(other) && brick != other);
    silly: while (true) {
      // console.log(brick.minSelfZ);

      for (let i = 0; i < careAbout.length; i++) {
        if (brick.collides(careAbout[i])) {
          brick.changeZ(1);
          break silly;
        }
      }
      if (brick.minZ == 0) {
        break;
      }
      brick.changeZ(-1);
    }
  }

  // bricks.sort((a, b) => a.minSelfZ - b.minSelfZ);
  // console.log(bricks);

  let sum = 0;

  for (const brick of bricks) {
    // console.log(bi);
    // const brick = bricks[bi];
    // for (const other of bricks) {
    //   if (other == brick) continue;
    //   if (other.collides(brick) || brick.collides(other)) {
    //     console.log("auaufadosjfasodjfoasdj");
    //   }
    //   if (other.collides(brick) != brick.collides(other)) {
    //     console.log("afiodajsf");
    //   }
    // }
    const careAbout = bricks.filter(
      (other) =>
        other.collidesXY(brick) && // again, useless comment to get better line breaks
        other.minZ - 1 == brick.maxZ &&
        other != brick,
    );
    // console.log(bi, careAbout.length, brick.raw);
    let works = true;
    for (const other of careAbout) {
      if (!works) break;
      const careAbout2 = bricks.filter(
        (yetAnother) =>
          yetAnother.collidesXY(other) && // again, useless comment to get better line breaks
          yetAnother.maxZ + 1 == other.minZ &&
          yetAnother != brick &&
          yetAnother != other,
      );
      if (careAbout2.length == 0) {
        works = false;
      }
    }
    if (works) {
      // console.log(String.fromCharCode(bi + 65));
      sum++;
    }
  }

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
  return sum;
};
