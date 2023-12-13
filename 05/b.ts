type SeedRange = {
  a: number;
  b: number;
};

type MapRange = [number, number, number];

export const solution = (input: string) => {
  // if (input.length > 100) return "";

  const sections = input.split("\n\n");
  const seedsOriginal = sections[0]
    .split(": ")[1]
    .split(/\s+/)
    .map((n) => parseInt(n))
    .reduce((acc, curr, i, arr) => {
      if (i % 2 == 0) {
        acc.push({ a: curr, b: curr + arr[i + 1] - 1 });
      }

      return acc;
    }, [] as SeedRange[]);

  const maps = sections.slice(1).map((sec) =>
    sec
      .split("\n")
      .slice(1)
      .map((r) => r.split(/\s+/).map((n) => parseInt(n)))
      .sort((a, b) => a[1] - b[1]),
  ) as MapRange[][];

  for (const map of maps) {
    let start = 0;
    for (let i = 0; i < map.length; i++) {
      if (start < map[i][1]) {
        map.splice(i, 0, [start, start, map[i][1] - start]);
      }
      start = map[i][1] + map[i][2];
    }
    map.push([start, start, Infinity]);
  }

  console.log(seedsOriginal);
  console.log(maps);
  // prompt();

  // @ts-ignore
  const foo = maps.reduce((seeds: SeedRange[], map) => {
    const newSeeds = [];
    // console.log(seeds.length);
    // console.log(seeds);
    // prompt();

    for (const { a, b } of seeds) {
      // // const start = map.findIndex((mapRange) => mapRange[1] <= a);
      // // const end = map.findLastIndex((mapRange) => b < mapRange[1] + mapRange[2]);
      // // const myMaps = map.slice(start, end + 1);
      // const myMaps = map.slice();
      console.log("a, b:", a, b);
      const myMaps = map.filter((mapRange) => a < mapRange[1] + mapRange[2] && b >= mapRange[1]);
      console.log(myMaps);

      for (const mmap of myMaps) {
        // console.log("aaa");
        console.log();
        console.log(mmap);
        console.log(`mmap[1] + mmap[2] - 1 = ${mmap[1] + mmap[2] - 1}`);
        console.log(`b = ${b}`);
        console.log(`mmap[1] = ${mmap[1]}`);
        console.log(`a = ${a}`);
        // prompt();
        const range = Math.min(b, mmap[1] + mmap[2] - 1) - Math.max(a, mmap[1]);
        const start2 = mmap[0] + Math.max(0, a - mmap[1]);
        if (range >= 0) {
          newSeeds.push({ a: start2, b: start2 + range });
          console.log(mmap, newSeeds.at(-1), range);
        } else {
          console.log("not in range:", range);
        }
        // console.log({ a, b, range });
      }
      // const last = myMaps.at(-1);
      // if (last && last[1] - last[2] <= b) {
      //   newSeeds.push
      // }
    }
    console.log();

    return newSeeds;
  }, seedsOriginal);

  console.log("foo", foo);

  return Math.min(...foo.map(({ a }) => a)).toString();

  return Math.min(
    ...seedsOriginal.map((s) =>
      // @ts-ignore
      maps.reduce((res: number, map) => {
        console.log(s, res);
        const n2 = map.filter((a) => a[1] <= res && res < a[1] + a[2]);
        console.log(n2);
        const n = n2[0];
        if (n) {
          return res + (n[0] - n[1]);
        } else {
          return res;
        }
      }, s),
    ),
  ).toString();
};

// console.log(
//   solution(`Seeds: 8 8

// foo:
// 12 7 2
// 2 10 3`),
// );
