export const solution = (input: string) => {
  return input
    .split("\n")
    .map((line) => line.split(/\s+/).map((n) => parseInt(n)))
    .map((firstRow) => {
      console.log(firstRow);
      const rows = [firstRow];
      while (rows.at(-1)?.some((n) => n != 0)) {
        const currRow = rows.at(-1)!;
        const nextRow = [];
        for (let i = 0; i < currRow.length - 1; i++) {
          nextRow.push(currRow[i + 1] - currRow[i]);
        }
        rows.push(nextRow);
      }
      return rows.reduce((acc, curr) => acc + curr.at(-1)!, 0);
    })
    .reduce((acc, curr) => acc + curr, 0)
    .toString();
};
