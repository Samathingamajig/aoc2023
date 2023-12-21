class Rule {
  public condition: string;
  public target: string;
  constructor(data: string) {
    const foo = data.split(":");
    if (foo.length == 2) {
      [this.condition, this.target] = foo;
    } else {
      this.condition = "";
      this.target = foo[0];
    }
  }

  test(data: XMAS) {
    globalThis.data = data;
    if (!this.condition || eval("data." + this.condition)) {
      return this.target;
    } else {
      return "";
    }
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

  test(data: XMAS) {
    for (const rule of this.rules) {
      const res = rule.test(data);
      // console.log(res, rule, data);
      if (res) {
        return res;
      }
    }
    console.log("?????");
    return "";
  }
}

type XMAS = {
  x: number;
  m: number;
  a: number;
  s: number;
};

export const solution = (input: string) => {
  const [workflowsRaw, dataRaw] = input.split("\n\n").map((section) => section.split("\n"));

  const workflows: Record<string, Workflow> = {};
  for (const rw of workflowsRaw) {
    const [name, data] = rw.split(/(?=\{)/);
    // console.log(name, data);
    workflows[name] = new Workflow(data);
  }

  const data = dataRaw.map((d) => {
    const out = {} as Record<string, number>;
    d = d.slice(1, -1);
    for (const foo of d.split(",")) {
      const [key, value] = foo.split("=");
      out[key] = +value;
    }
    return out as unknown as XMAS;
  });

  let sum = 0;

  for (const d of data) {
    let key = "in";
    while (key != "A" && key != "R") {
      // console.log("key");
      key = workflows[key].test(d);
    }
    if (key == "A") {
      sum += Object.values(d).reduce((a, b) => a + b);
    }
  }

  return sum;
};
