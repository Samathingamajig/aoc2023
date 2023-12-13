type ConditionRecord = {
  springs: string[];
  groups: number[];
};

const meetsGroupingRequirements = (cr: ConditionRecord) => {
  let groupI = 0;
  let curr = 0;
  for (let i = 0; i < cr.springs.length + 1; i++) {
    if (cr.springs[i] == "#") {
      curr++;
      // if (curr > cr.groups[groupI]) return false;
    } else if (curr != 0) {
      if (curr == cr.groups[groupI]) {
        groupI++;
        curr = 0;
      } else {
        return false;
      }
    }
  }
  // if (curr == cr.groups[groupI]) {
  //   groupI++;
  // }

  return groupI == cr.groups.length;
};

export const solution = (input: string) => {
  const conditionRecords = input.split("\n").map((line) => {
    const [leftRaw, rightRaw] = line.split(" ");
    const left = leftRaw.split("");
    const right = rightRaw.split(",").map(Number);
    return { springs: left, groups: right } satisfies ConditionRecord;
  });

  let sum = 0;
  let myI = 0;
  for (const cr of conditionRecords) {
    let before = sum;
    const questions = cr.springs
      .map((val, i) => [val, i] as const)
      .filter(([val]) => val == "?")
      .map(([_, i]) => i);

    for (let i = 0n; i < 2n ** BigInt(questions.length); i++) {
      // let s = "";
      for (let j = 0; j < questions.length; j++) {
        const qj = questions[j];
        cr.springs[qj] = (1n << BigInt(j)) & i ? "#" : ".";
        // s += cr.springs[qj];
      }
      // console.log(s);

      if (meetsGroupingRequirements(cr)) {
        sum++;
      }
    }
    console.log(++myI, sum - before);
  }
  return sum.toString();

  // console.log(conditionRecords);
};
