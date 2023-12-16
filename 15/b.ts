export const solution = (input: string) => {
  const hash = (str: string) => {
    let value = 0;
    for (const c of str) {
      value += c.charCodeAt(0);
      value *= 17;
      value %= 256;
    }
    return value;
  };

  const boxes = new Array<[string, number][]>(256).fill([]).map(() => [] as [string, number][]);
  const data = input.replaceAll("\n", "").split(",");

  for (const instruction of data) {
    if (instruction.includes("=")) {
      const [left, right] = instruction.split("=");
      const id = hash(left);
      const pref = +right;
      const idx = boxes[id].findIndex((bar) => bar[0] == left);
      if (idx != -1) {
        // if (boxes[id][idx][1] < pref) {
        boxes[id][idx][1] = pref;
        // }
      } else {
        boxes[id].push([left, pref] as const);
      }
    } else if (instruction.includes("-")) {
      const foo = instruction.split("-")[0];
      const id = hash(foo);
      const idx = boxes[id].findIndex((bar) => bar[0] == foo);
      if (idx != -1) {
        // console.log("removing");
        boxes[id].splice(idx, 1);
      }
    } else {
      console.log("what");
    }
  }
  console.log(boxes);

  let sum = 0;
  for (let i = 0; i < boxes.length; i++) {
    for (let j = 0; j < boxes[i].length; j++) {
      sum += (i + 1) * (j + 1) * boxes[i][j][1];
    }
  }
  return sum.toString();
};
