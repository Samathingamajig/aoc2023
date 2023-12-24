class Edge {
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
  visited: boolean;
  constructor(startRow: number, startCol: number, endRow: number, endCol: number, public length: number) {
    [[this.startRow, this.startCol], [this.endRow, this.endCol]] = [
      [startRow, startCol],
      [endRow, endCol],
    ].sort((a, b) => {
      const diff1 = a[0] - b[0];
      if (diff1) return diff1;
      else return a[1] - b[1];
    });
    this.visited = false;
  }

  equals(other: unknown) {
    if (other instanceof Edge) {
      return (
        this.startRow == other.startRow &&
        this.startCol == other.startCol &&
        this.endRow == other.endRow &&
        this.endCol == other.endCol
      );
    }
    return false;
  }

  toString() {
    return `${this.startRow},${this.startCol},${this.endRow},${this.endCol}`;
  }

  fromString(inp: string) {
    [this.startRow, this.startCol, this.endRow, this.endCol] = inp.split(",").map(Number);
  }
}

class Node {
  edges: Edge[];
  bestDistance: number;
  visited: boolean;
  constructor(public row: number, public col: number) {
    this.edges = [];
    this.bestDistance = 0;
    this.visited = false;
  }
}

export const solution = (input: string) => {
  const grid = input.split("\n").map((row, ri) =>
    row.split("").map((c, ci) => ({
      char: c,
      longest: 0,
      pos: [ri, ci] as const,
      prev: undefined as [number, number] | undefined,
    })),
  );
  const startRow = 0;
  const startCol = grid[0].findIndex((c) => c.char == ".");
  grid[startRow][startCol].char = "S";
  grid[startRow + 1][startCol].longest = 1;
  grid[startRow + 1][startCol].prev = [-1, 0];
  const endRow = grid.length - 1;
  const endCol = grid[endRow].findIndex((c) => c.char == ".");
  grid[endRow][endCol].char = "E";
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const dirChars = "><^v".split("");
  const edges = [] as Edge[];
  const nodes = {} as Record<string, Node>;
  nodes[`${startRow},${startCol}`] = new Node(startRow, startCol);
  nodes[`${endRow},${endCol}`] = new Node(endRow, endCol);

  for (let r = 1; r < grid.length - 1; r++) {
    for (let c = 1; c < grid[r].length - 1; c++) {
      const foundDirChars: number[][] = [];
      for (const [dr, dc] of dirs) {
        if (dirChars.includes(grid[r + dr][c + dc].char)) {
          foundDirChars.push([dr, dc]);
        }
      }
      if (grid[r][c].char == "." && foundDirChars.length >= 3) {
        const outputs: Edge[] = [];
        for (const [idr, idc] of foundDirChars) {
          let length = 2;
          let row = r + idr * 2;
          let col = c + idc * 2;
          let dr = idr;
          let dc = idc;
          while (!dirChars.includes(grid[row][col].char) && !"SE".includes(grid[row][col].char)) {
            let changed = false;
            for (const [ddr, ddc] of dirs) {
              if (ddr == -dr && ddc == -dc) continue;
              if (grid[row + ddr][col + ddc].char == "#") continue;
              length++;
              dr = ddr;
              dc = ddc;
              row += dr;
              col += dc;
              changed = true;
              break;
            }
            if (!changed) {
              console.log("oopsie poopsie");
              break;
            }
          }
          let newEdge: Edge;
          if ("SE".includes(grid[row][col].char)) {
            newEdge = new Edge(r, c, row, col, length);
          } else {
            newEdge = new Edge(r, c, row + dr, col + dc, length);
          }
          const oldEdge = edges.find((e) => e.equals(newEdge));
          if (oldEdge) {
            outputs.push(oldEdge);
          } else {
            edges.push(newEdge);
            outputs.push(newEdge);
          }

          if ((row == startRow && col == startCol) || (row == endRow && col == endCol)) {
            nodes[`${row},${col}`].edges.push(newEdge);
          }
        }
        const node = new Node(r, c);
        node.edges = outputs;
        nodes[`${r},${c}`] = node;
      }
    }
  }
  // console.log(
  //   Object.entries(nodes)
  //     .map(([key, val]) => [key, val.edges.map(String)] as const)
  //     .join("\n"),
  // );

  const hash = (edges: Edge[], row: number, col: number) => {
    return `${edges.map((e) => (e.visited ? "1" : "0")).join(";")}|${row}|${col}`;
  };

  for (const node of Object.values(nodes)) {
    console.log(node.row, node.col);
    for (const edge of node.edges) {
      let partial: string;
      if (edge.startRow == node.row && edge.startCol == node.col) {
        partial = `${edge.endRow},${edge.endCol}`;
      } else {
        partial = `${edge.startRow},${edge.startCol}`;
      }
      console.log("\t" + partial);
    }
  }

  const startNode = nodes[`${startRow},${startCol}`];
  const endNode = nodes[`${endRow},${endCol}`];
  const cache = {} as Record<string, number>;
  let superBest = 0;
  // let p = 0;
  const recurse = (node: Node, currLength: number, edges: Edge[]) => {
    // const key = hash(edges, node.row, node.col);
    // p++;
    // if (p % 100000 == 0) console.log(p);
    let prev = -1;
    // if (cache[key]) {
    //   // prev = cache[key];
    //   return cache[key];
    // }
    node.visited = true;

    let bestLength = currLength;
    let foundNew = false;
    for (const edge of node.edges) {
      if (edge.visited) continue;
      edge.visited = true;
      let nextNode: Node;
      if (edge.startRow == node.row && edge.startCol == node.col) {
        nextNode = nodes[`${edge.endRow},${edge.endCol}`];
      } else {
        nextNode = nodes[`${edge.startRow},${edge.startCol}`];
      }
      if (!nextNode.visited) {
        foundNew = true;

        const newLength = recurse(nextNode, currLength + edge.length + 1, edges);
        bestLength = Math.max(bestLength, newLength);
      }

      edge.visited = false;
    }
    if (!foundNew && node != endNode) {
      bestLength = 0;
    }

    if (node.bestDistance < bestLength) {
      node.bestDistance = bestLength;
    }

    if (node == endNode) {
      if (superBest < bestLength) {
        superBest = bestLength;
        console.log("new super best", superBest - 2);
      }
    }
    node.visited = false;

    // cache[key] = bestLength;
    // }
    return bestLength;
  };
  recurse(startNode, 0, edges);

  return endNode.bestDistance - 2;
};
