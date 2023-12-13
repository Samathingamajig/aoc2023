import { aocTest, getDayAndPart } from "../aocTester";
import { solution } from "./a";
import exampleInput from "./example.input.txt";
import exampleOutput from "./a.example.output.txt";
import realInput from "./input.txt";

const { day, part } = getDayAndPart(import.meta.url);

aocTest(solution, exampleInput, exampleOutput, realInput, day, part);
