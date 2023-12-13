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
  let currs = Object.keys(nodes).filter((name) => name.endsWith("A"));
  // console.log(currs);
  const target = "ZZZ";
  let count = 0;
  while (true) {
    count++;
    // console.log(count);
    for (let j = 0; j < currs.length; j++) {
      if (instructions[i] == "L") {
        currs[j] = nodes[currs[j]].left;
      } else {
        currs[j] = nodes[currs[j]].right;
      }
    }
    // console.log(currs);
    if (currs.every((name) => name.endsWith("Z"))) {
      break;
    }
    i = (i + 1) % instructions.length;
  }

  return count.toString();
};
