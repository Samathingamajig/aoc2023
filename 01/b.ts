export const solution = (input: string) => {
  const firsts = input
    .split("\n")
    // .map((x) => x.replaceAll(/[0-9]/g, ""))
    // .map((x) => x.replaceAll("one", "1"))
    // .map((x) => x.replaceAll("two", "2"))
    // .map((x) => x.replaceAll("three", "3"))
    // .map((x) => x.replaceAll("four", "4"))
    // .map((x) => x.replaceAll("five", "5"))
    // .map((x) => x.replaceAll("six", "6"))
    // .map((x) => x.replaceAll("seven", "7"))
    // .map((x) => x.replaceAll("eight", "8"))
    // .map((x) => x.replaceAll("nine", "9"))
    .map((x) =>
      x.replaceAll(/one|two|three|four|five|six|seven|eight|nine/g, (match) => {
        switch (match) {
          case "one":
            return "1";
          case "two":
            return "2";
          case "three":
            return "3";
          case "four":
            return "4";
          case "five":
            return "5";
          case "six":
            return "6";
          case "seven":
            return "7";
          case "eight":
            return "8";
          case "nine":
            return "9";
        }
      }),
    )
    // .map((x) => x.replaceAll("zero", "0"))
    .map((x) => x.replaceAll(/[^1-9]/g, ""))
    // .filter((x) => x.length > 0)
    .map((n) => n.at(0))
    .map(Number)
    .reduce((a, b) => a + b, 0);

  const seconds = input
    .split("\n")
    .map((x) => x.split("").reverse().join(""))
    // .map((x) => x.replaceAll(/[0-9]/g, ""))
    // .map((x) => x.replaceAll("one", "1"))
    // .map((x) => x.replaceAll("two", "2"))
    // .map((x) => x.replaceAll("three", "3"))
    // .map((x) => x.replaceAll("four", "4"))
    // .map((x) => x.replaceAll("five", "5"))
    // .map((x) => x.replaceAll("six", "6"))
    // .map((x) => x.replaceAll("seven", "7"))
    // .map((x) => x.replaceAll("eight", "8"))
    // .map((x) => x.replaceAll("nine", "9"))
    .map((x) =>
      x.replaceAll(/eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/g, (match) => {
        switch (match) {
          case "eno":
            return "1";
          case "owt":
            return "2";
          case "eerht":
            return "3";
          case "ruof":
            return "4";
          case "evif":
            return "5";
          case "xis":
            return "6";
          case "neves":
            return "7";
          case "thgie":
            return "8";
          case "enin":
            return "9";
        }
      }),
    )
    // .map((x) => x.replaceAll("zero", "0"))
    .map((x) => x.replaceAll(/[^1-9]/g, ""))
    // .filter((x) => x.length > 0)
    .map((n) => n.at(0))
    .map(Number)
    .reduce((a, b) => a + b, 0);

  return (firsts * 10 + seconds).toString();
};
