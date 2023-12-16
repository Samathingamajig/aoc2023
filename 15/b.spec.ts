import { aocTest, getDayAndPart } from "../aocTester";
import { solution } from "./b";
import exampleInput from "./example.input.txt";
import exampleOutput from "./b.example.output.txt";
import realInput from "./input.txt";
import { it } from "bun:test";

const { day, part } = getDayAndPart(import.meta.url);

if (!isNaN(day)) {
  it(`should work for day ${day} part ${part}'s example`, () => {
    aocTest(solution, exampleInput, exampleOutput, realInput, day, part);
  });
}
