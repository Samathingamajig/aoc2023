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
  console.log(nodes);

  let i = 0;
  let curr = "AAA";
  const target = "ZZZ";
  let count = 0;
  while (true) {
    count++;
    if (instructions[i] == "L") {
      curr = nodes[curr].left;
    } else {
      curr = nodes[curr].right;
    }
    if (curr == target) {
      break;
    }
    i = (i + 1) % instructions.length;
  }

  return count.toString();
};
