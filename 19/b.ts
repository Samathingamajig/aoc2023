const toKey = (minMax: "min" | "max", variable: string) => {
  return `${minMax}${variable.toUpperCase()}`;
};

class Rule {
  public condition: { xmas: string; operator: string; value: number } | undefined;
  public target: string;
  constructor(data: string) {
    const foo = data.split(":");
    let conditionRaw = "";
    if (foo.length == 2) {
      [conditionRaw, this.target] = foo;
    } else {
      conditionRaw = "";
      this.target = foo[0];
    }

    if (conditionRaw) {
      const [_, target, operator, valueRaw] = conditionRaw.match(/(\w+)(\>|\<)(\d+)/)!;
      this.condition = {
        xmas: target,
        operator,
        value: +valueRaw,
      };
    }
  }

  // test(data: XMAS) {
  //   globalThis.data = data;
  //   if (!this.condition || eval("data." + this.condition)) {
  //     return this.target;
  //   } else {
  //     return "";
  //   }
  // }

  split(data: XmasRange): [[string, XmasRange]?, XmasRange?] {
    if (!this.condition) {
      return [[this.target, data]];
    }

    let finalized: [string, XmasRange] | undefined;
    let carry: XmasRange | undefined;

    const cond = this.condition;
    const minKey = toKey("min", cond.xmas) as keyof XmasRange;
    const maxKey = toKey("max", cond.xmas) as keyof XmasRange;
    const min = data[minKey];
    const max = data[maxKey];
    if (cond.operator == "<") {
      if (min < cond.value) {
        const cloned = structuredClone(data);
        cloned[maxKey] = Math.min(max, cond.value - 1);
        finalized = [this.target, cloned];
      }
      if (max >= cond.value) {
        const cloned = structuredClone(data);
        cloned[minKey] = Math.max(min, cond.value);
        carry = cloned;
      }
    } else if (cond.operator == ">") {
      if (max > cond.value) {
        const cloned = structuredClone(data);
        cloned[minKey] = Math.max(min, cond.value + 1);
        finalized = [this.target, cloned];
      }
      if (min <= cond.value) {
        const cloned = structuredClone(data);
        cloned[maxKey] = Math.min(max, cond.value);
        carry = cloned;
      }
    } else {
      console.log("uh oh! invalid operator found: ", cond);
    }

    return [finalized, carry];
  }
}

class Workflow {
  public rules: Rule[];
  constructor(data: string) {
    data = data.slice(1, -1);
    // console.log(data);
    this.rules = data.split(",").map((r) => new Rule(r));
    // console.log(this.rules);
  }

  // test(data: XMAS) {
  //   for (const rule of this.rules) {
  //     const res = rule.test(data);
  //     // console.log(res, rule, data);
  //     if (res) {
  //       return res;
  //     }
  //   }
  //   console.log("?????");
  //   return "";
  // }

  split(data: XmasRange) {
    const out: [string, XmasRange][] = [];
    let carry = data;
    for (const rule of this.rules) {
      const res = rule.split(carry);
      if (res[0]) out.push(res[0]);
      if (res[1]) {
        carry = res[1];
      } else {
        console.log("uhhhhh shouldn't be here");
        break;
      }
    }

    return out;
  }
}

type XmasRange = {
  minX: number;
  maxX: number;
  minM: number;
  maxM: number;
  minA: number;
  maxA: number;
  minS: number;
  maxS: number;
};

export const solution = (input: string) => {
  const [workflowsRaw] = input.split("\n\n").map((section) => section.split("\n"));

  const workflows: Record<string, Workflow> = {};
  for (const rw of workflowsRaw) {
    const [name, data] = rw.split(/(?=\{)/);
    // console.log(name, data);
    workflows[name] = new Workflow(data);
  }

  const queue: [string, XmasRange][] = [
    [
      "in",
      {
        minX: 1,
        maxX: 4000,
        minM: 1,
        maxM: 4000,
        minA: 1,
        maxA: 4000,
        minS: 1,
        maxS: 4000,
      },
    ],
  ];

  let sum = 0;

  for (let i = 0; i < queue.length; i++) {
    const [target, data] = queue[i];
    if (target == "A") {
      // ... figure out adding
      // console.log("accept:", data);
      sum +=
        (data.maxX - data.minX + 1) *
        (data.maxM - data.minM + 1) *
        (data.maxA - data.minA + 1) *
        (data.maxS - data.minS + 1);
    } else if (target != "R") {
      const workflow = workflows[target];
      queue.push(...workflow.split(data));
    }
  }

  // console.log(queue);

  return sum;
};
