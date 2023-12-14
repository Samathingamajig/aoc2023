export const solution = (input: string) => {
  return input
    .split("\n\n")
    .map((s) => s.split("\n"))
    .reduce((acc, curr, mainIdx) => {
      for (let i = 1; i < curr[0].length; i++) {
        let wrong = 0;
        for (let j = 0; j < curr.length && wrong < 2; j++) {
          for (let di = 0; i + di < curr[0].length && i - di - 1 >= 0 && wrong < 2; di++) {
            if (curr[j][i + di] != curr[j][i - di - 1]) {
              wrong++;
            }
          }
        }
        // console.log(i, valid);
        if (wrong == 1) {
          // console.log("ret", i * 100);
          return acc + i;
        }
      }

      // console.log("between");
      for (let i = 1; i < curr.length; i++) {
        let wrong = 0;
        for (let j = 0; j < curr[i].length && wrong < 2; j++) {
          for (let di = 0; i + di < curr.length && i - di - 1 >= 0 && wrong < 2; di++) {
            if (curr[i + di][j] != curr[i - di - 1][j]) {
              wrong++;
            }
          }
        }
        // console.log(i, valid);
        if (wrong == 1) {
          // console.log("ret", i);
          return acc + i * 100;
        }
      }

      console.log("uhoh", mainIdx);
      return acc;
    }, 0)
    .toString();
};
