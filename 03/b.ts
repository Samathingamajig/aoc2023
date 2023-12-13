export const solution = (input: string) => {
  let lines = input.split("\n");
  lines.unshift(".".repeat(lines[0].length));
  lines.push(".".repeat(lines[0].length));
  lines = lines.map((s) => "." + s + ".");

  const map = {}; // `${gearx},${geary}` : [num1, num2, ..., numn]

  let sum = 0;

  for (let i = 1; i < lines.length - 1; i++) {
    let strNum = "";
    const gearsFound = new Set();
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j].match(/\d/)) {
        strNum += lines[i][j];

        for (let r = -1; r <= 1; r++) {
          for (let c = -1; c <= 1; c++) {
            if (lines[i + r][j + c] == "*") {
              gearsFound.add(`${i + r},${j + c}`);
            }
          }
        }
      } else {
        if (gearsFound.size > 0) {
          const num = +strNum;
          strNum = "";
          for (const g of gearsFound) {
            map[g] = map[g] ?? [];
            map[g].push(num);
          }
          gearsFound.clear();
        }
        strNum = "";
      }
    }
  }

  console.log("foo");
  for (const nums of Object.values(map)) {
    console.log(nums);
    if ((nums as number[]).length == 2) {
      // @ts-ignore
      sum += nums[0] * nums[1];
    }
  }
  return "" + sum;
};

// consol
