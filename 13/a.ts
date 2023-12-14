export const solution = (input: string) => {
  return input
    .split("\n\n")
    .map((s) => s.split("\n"))
    .reduce((acc, curr, mainIdx) => {
      for (let i = 1; i < curr[0].length; i++) {
        let valid = true;
        for (let j = 0; j < curr.length && valid; j++) {
          for (let di = 0; i + di < curr[0].length && i - di - 1 >= 0 && valid; di++) {
            valid &&= curr[j][i + di] == curr[j][i - di - 1];
          }
        }
        // console.log(i, valid);
        if (valid) {
          // console.log("ret", i * 100);
          return acc + i;
        }
      }

      // console.log("between");
      for (let i = 1; i < curr.length; i++) {
        let valid = true;
        for (let j = 0; j < curr[i].length && valid; j++) {
          for (let di = 0; i + di < curr.length && i - di - 1 >= 0 && valid; di++) {
            valid &&= curr[i + di][j] == curr[i - di - 1][j];
          }
        }
        // console.log(i, valid);
        if (valid) {
          // console.log("ret", i);
          return acc + i * 100;
        }
      }

      console.log("uhoh", mainIdx);
      return acc;
    }, 0)
    .toString();
};
