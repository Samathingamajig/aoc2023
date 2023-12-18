import { expect } from "bun:test";
import { dirname, basename } from "path";

const runFullVersions = ["1", "yes", "y", "true"].includes(String(Bun.env.AOC_RUN_FULL).toLowerCase().trim());

export const getDayAndPart = (metaURL: string) => {
  const pathname = new URL(metaURL).pathname;
  const day = Number(basename(dirname(pathname)));
  const part = basename(pathname).split(".")[0];
  return {
    day,
    part,
  };
};

export const aocTest = (
  solution: (input: string) => string,
  exampleInput: string,
  exampleOutput: string,
  realInput: string,
  day: number,
  part: string,
) => {
  exampleInput = exampleInput.replace(/\n$/, "");
  exampleOutput = exampleOutput.replace(/\n$/, "");
  realInput = realInput.replace(/\n$/, "");

  const filesThatHaveChangeMe = [exampleInput, exampleOutput, realInput].filter((text) => text.startsWith("CHANGE_ME"));

  if (filesThatHaveChangeMe.length > 0) {
    console.log("You forgot to update the following files:");
    for (const file of filesThatHaveChangeMe) {
      console.log(file);
    }
    throw new Error(`You forgot to update the files: "${filesThatHaveChangeMe.join('", "')}"`);
  }

  const outputForExample = String(solution(exampleInput));
  expect(outputForExample).toEqual(exampleOutput);
  // if (outputForExample != exampleOutput) {
  //   console.log(`lol be careful bud, "${outputForExample}" != "${exampleOutput}"`);
  // }

  if (!runFullVersions) return;

  const output = solution(realInput);
  const header = `${"-".repeat(20)} Day ${day} Part ${part} ${"-".repeat(20)}`;
  console.log(header);
  console.log(output);
  console.log("-".repeat(header.length));
};
