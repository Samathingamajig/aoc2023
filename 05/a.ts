export const solution = (input: string) => {
  const sections = input.split("\n\n");
  const seeds = sections[0]
    .split(": ")[1]
    .split(/\s+/)
    .map((n) => parseInt(n));

  const maps = sections.slice(1).map((sec) =>
    sec
      .split("\n")
      .slice(1)
      .map((r) => r.split(/\s+/).map((n) => parseInt(n)))
      .sort((a, b) => a[0] - b[0]),
  );

  return Math.min(
    ...seeds.map((s) =>
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

  console.log(seeds);
  console.log(maps);

  return "";
};
