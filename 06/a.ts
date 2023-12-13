export const solution = (input: string) => {
  const [times, distances] = input.split("\n").map((line) => line.split(":")[1].trim().split(/\s+/).map(Number));

  return times
    .reduce((acc, time, idx) => {
      const dist = distances[idx];

      let wins = 0;

      for (let t = 1; t < time; t++) {
        const d = t * (time - t);
        if (d > dist) {
          wins++;
        }
      }

      return acc * wins;
    }, 1)
    .toString();
};
