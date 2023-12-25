export const solution = (input: string) => {
  console.log("woohoo");
  const data = input.split("\n").map((line) =>
    line.split("@").map(
      (nums) =>
        nums
          .trim()
          .split(/\s*,?\s+/)
          .map(BigInt) as [bigint, bigint, bigint],
    ),
  );
  // console.log(data);
  const [minRange, maxRange] = input.length < 1000 ? [7n, 27n] : [200000000000000n, 400000000000000n];

  let collisions = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      // if (data[i][1][0] == data[j][1][0] && data[i][1][1] == data[j][1][1]) continue;

      const x1 = data[i][0][0];
      const x2 = x1 + data[i][1][0] * 1n;
      const x3 = data[j][0][0];
      const x4 = x3 + data[j][1][0] * 1n;

      const y1 = data[i][0][1];
      const y2 = y1 + data[i][1][1] * 1n;
      const y3 = data[j][0][1];
      const y4 = y3 + data[j][1][1] * 1n;

      // if (x1 == x2 || x3 == x4 || y1 == y2 || y3 == y4) {
      //   console.log("???");
      // }

      const pxNum = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4);
      const pyNum = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4);
      const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      // console.log(denom);
      if (denom == 0n) {
        // console.log(pxNum, pyNum);
        console.log(i + 1, j + 1, "parallel");
        continue; // parallel
      }
      // if (input.length < 1000)
      //   console.log(
      //     denom,
      //     "\n",
      //     data[i].map((c) => c.join(", ")).join(" @ "),
      //     "\n",
      //     data[j].map((c) => c.join(", ")).join(" @ "),
      //   );
      const px = pxNum / denom;
      const pxExtra = pxNum % denom;
      const py = pyNum / denom;
      const pyExtra = pyNum % denom;
      // console.log(i, j, px, py);
      if (
        minRange <= px &&
        px <= maxRange &&
        (px == maxRange ? pxExtra == 0n : true) &&
        minRange <= py &&
        py <= maxRange && // give me line breaks
        (py == maxRange ? pyExtra == 0n : true) &&
        Math.sign(Number(px - x1)) == Math.sign(Number(x2 - x1)) &&
        Math.sign(Number(px - x3)) == Math.sign(Number(x4 - x3)) &&
        Math.sign(Number(py - y1)) == Math.sign(Number(y2 - y1)) &&
        Math.sign(Number(py - y3)) == Math.sign(Number(y4 - y3))
        // px * BigInt(Math.sign(Number(x2 - x1))) <= x1 &&
        // px * BigInt(Math.sign(Number(x4 - x3))) <= x3 &&
        // py * BigInt(Math.sign(Number(y2 - y1))) <= y1 &&
        // py * BigInt(Math.sign(Number(y4 - y3))) <= y3
      ) {
        // console.log(
        //   "add\n",
        //   data[i].map((c) => c.join(", ")).join(" @ "),
        //   "\n",
        //   data[j].map((c) => c.join(", ")).join(" @ "),
        // );
        collisions++;
      }
    }
  }

  return collisions;
};
