type ConditionRecord = {
  springs: string;
  groups: number[];
};

const stringify = (groupI: number, mainI: number) => `${groupI}|${mainI}`;

const memo = new Map<string, number>();
const workingCombos = (cr: ConditionRecord, groupI: number, mainI: number): number => {
  const key = stringify(groupI, mainI);
  if (memo.has(key)) {
    return memo.get(key)!;
  }
  if (groupI == cr.groups.length) {
    for (let i = mainI; i < cr.springs.length; i++) {
      if (cr.springs[i] == "#") {
        memo.set(key, 0);
        return 0;
      }
    }
    memo.set(key, 1);
    return 1;
  }
  if (mainI > cr.springs.length) {
    memo.set(key, 0);
    return 0;
  }

  if (cr.springs[mainI] == ".") {
    const result = workingCombos(cr, groupI, mainI + 1);
    memo.set(key, result);
    return result;
  }

  let safe = true;
  for (let i = 0; i < cr.groups[groupI] && safe; i++) {
    safe &&= cr.springs[i + mainI] != "." && cr.springs[i + mainI] != undefined;
  }
  safe &&= cr.springs[mainI + cr.groups[groupI]] != "#";

  let sum = 0;
  if (safe) {
    sum += workingCombos(cr, groupI + 1, mainI + cr.groups[groupI] + 1);
  }
  if (cr.springs[mainI] == "#") {
    if (!safe) {
      memo.set(key, 0);
      return 0;
    }
  } else {
    sum += workingCombos(cr, groupI, mainI + 1);
  }
  memo.set(key, sum);

  return sum;
};

export const solution = (input: string) => {
  const conditionRecords = input.split("\n").map((line) => {
    const [leftRaw, rightRaw] = line.split(" ");
    const left = Array(5).fill(leftRaw).join("?");
    const right = Array(5).fill(rightRaw).join(",").split(",").map(Number);
    return { springs: left, groups: right } satisfies ConditionRecord;
  });

  // console.log(conditionRecords);

  let sum = 0;
  // let myI = 0;
  console.log();
  for (const cr of conditionRecords) {
    // const before = sum;
    // console.log(cr.springs.length);
    memo.clear();
    sum += workingCombos(cr, 0, 0);
    // console.log(myI++ + "\t" + (sum - before));
  }
  return sum.toString();
};
