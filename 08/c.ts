type Node = {
  left: string;
  right: string;
};

export const solution = (input: string) => {
  const [instructions, nodesRaw] = input.split("\n\n");
  const nodes = {} as Record<string, Node>;
  nodesRaw.split("\n").forEach((line) => {
    const name = line.split(" ")[0];
    const data = line
      .match(/\(\w+, \w+\)/)![0]
      .slice(1, -1)
      .split(", ");
    nodes[name] = { left: data[0], right: data[1] };
  });
  // console.log(nodes);

  let i = 0;
  const initials = {} as Record<string, number>;
  const deltas = {} as Record<string, number>;
  const currs = Object.keys(nodes).filter((name) => name.endsWith("A"));
  const currsOriginal = currs.slice();
  // console.log(currs);
  const target = "ZZZ";
  let count = 0;
  console.log("hello");
  while (true) {
    count++;
    // console.log(count);
    for (let j = 0; j < currs.length; j++) {
      if (instructions[i] == "L") {
        currs[j] = nodes[currs[j]].left;
      } else {
        currs[j] = nodes[currs[j]].right;
      }

      if (currs[j].endsWith("Z")) {
        if (currsOriginal[j] in initials) {
          deltas[currsOriginal[j]] = count - initials[currsOriginal[j]];
        } else {
          initials[currsOriginal[j]] = count;
        }
      }
    }

    if (Object.getOwnPropertyNames(deltas).length == currs.length) {
      break;
    }
    // console.log(Object.getOwnPropertyNames(deltas));
    // console.log(currs);
    // if (currs.every((name) => name.endsWith("Z"))) {
    //   break;
    // }
    i = (i + 1) % instructions.length;
  }

  console.log(initials);
  console.log(deltas);

  return count.toString();
};
