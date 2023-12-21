const LOW = 0;
const HIGH = 1;

abstract class Mod {
  constructor(public name: string, public children: string[]) {}

  public abstract receive(pulse: number, senderName: string): void;
  public abstract process(): { name: string; pulse: number }[];
}

class Broadcaster extends Mod {
  private prev: number;
  constructor(name: string, children: string[]) {
    super(name, children);
    this.prev = LOW;
  }

  public receive(pulse: number, senderName: string): void {
    console.log(`${senderName} -${pulse == LOW ? "low" : "high"}-> ${this.name}`);
    this.prev = pulse;
  }
  public process(): { name: string; pulse: number }[] {
    return this.children.map((target) => ({ name: target, pulse: this.prev }));
  }
}

class FlipFlop extends Mod {
  public isOn: boolean;
  private justFlopped: boolean;
  constructor(name: string, children: string[]) {
    super(name, children);
    this.isOn = false;
    this.justFlopped = false;
  }

  public receive(pulse: number, senderName: string): void {
    console.log(`${senderName} -${pulse == LOW ? "low" : "high"}-> ${this.name}`);
    if (pulse == LOW) {
      this.isOn = !this.isOn;
      this.justFlopped = true;
    }
  }

  public process(): { name: string; pulse: number }[] {
    if (this.justFlopped) {
      this.justFlopped = false;
      return this.children.map((target) => ({ name: target, pulse: this.isOn ? HIGH : LOW }));
    } else {
      return [];
    }
  }
}

class Conjunction extends Mod {
  public inputs: Record<string, number>;
  constructor(name: string, children: string[]) {
    super(name, children);
    this.inputs = {};
  }

  public registerInput(otherName: string) {
    this.inputs[otherName] = LOW;
  }

  public receive(pulse: number, senderName: string): void {
    console.log(`${senderName} -${pulse == LOW ? "low" : "high"}-> ${this.name}`);
    this.inputs[senderName] = pulse;
  }

  public process(): { name: string; pulse: number }[] {
    const pulse = Object.values(this.inputs).every((v) => v == HIGH) ? LOW : HIGH;
    return this.children.map((target) => ({ name: target, pulse }));
  }
}

export const solution = (input: string) => {
  const rawLines = input.split("\n");

  const mods: Record<string, Mod> = {};
  for (const line of rawLines) {
    const [left, right] = line.split(" -> ");
    const children = right.split(", ");
    switch (left[0]) {
      case "%":
        mods[left.slice(1)] = new FlipFlop(left.slice(1), children);
        break;
      case "&":
        mods[left.slice(1)] = new Conjunction(left.slice(1), children);
        break;
      default:
        mods[left] = new Broadcaster(left, children);
        break;
    }
  }

  for (const mod of Object.values(mods)) {
    for (const childStr of mod.children) {
      const child = mods[childStr];
      if (child && child instanceof Conjunction) {
        child.registerInput(mod.name);
      }
    }
  }

  console.log(mods);

  let lowPulses = 0;
  let highPulses = 0;

  for (let buttonPresses = 0; buttonPresses < 1000; buttonPresses++) {
    const queue: string[] = ["broadcaster"];
    mods["broadcaster"].receive(LOW, "button");
    lowPulses++;
    for (let qi = 0; qi < queue.length; qi++) {
      const mod = mods[queue[qi]];
      if (mod) {
        const results = mod.process();
        for (const { name, pulse } of results) {
          if (pulse == LOW) {
            lowPulses++;
          } else {
            highPulses++;
          }
          const target = mods[name];
          if (target) {
            target.receive(pulse, mod.name);
            // if (!queue.slice(qi).includes(name)) {
            queue.push(name);
            // }
          }
        }
      }
    }
  }

  console.log({ lowPulses, highPulses });

  console.log(mods);
  return lowPulses * highPulses;
};
