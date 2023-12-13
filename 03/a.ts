export const solution = (input: string) => {
  let lines = input.split("\n");
  lines.unshift(".".repeat(lines[0].length));
  lines.push(".".repeat(lines[0].length));
  lines = lines.map((s) => "." + s + ".");

  let sum = 0n;

  for (let i = 1; i < lines.length - 1; i++) {
    let strNum = "";
    let symbolFound = false;
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j].match(/\d/)) {
        strNum += lines[i][j];

        if (!symbolFound) {
          for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
              if (lines[i + r][j + c].match(/[^\d\.]/)) {
                if (lines.length < 20) {
                  console.log("found symbol at " + (i + r) + " " + (j + c));
                }
                symbolFound = true;
                // break foo;
              }
            }
          }
        }
      } else {
        if (symbolFound) {
          sum += BigInt(strNum);
          console.log(BigInt(strNum));
          strNum = "";
          symbolFound = false;
        }
        strNum = "";
      }
    }
    if (symbolFound) {
      // sum += +strNum;
    }
  }

  return "" + sum;
};

// consol
