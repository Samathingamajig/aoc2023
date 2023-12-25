import os
import z3
from pprint import pprint


def parse_line(line: str):
    return tuple(
        tuple(int(num) for num in part.split(", ")) for part in line.split("@")
    )


def solution(inp: str):
    data = (parse_line(line.strip()) for line in inp.split("\n")[:3])
    # pprint(data)

    solver = z3.Solver()
    xPos, yPos, zPos, xVel, yVel, zVel = z3.Reals("xPos yPos zPos xVel yVel zVel")
    # times = []
    for i, entry in enumerate(data):
        t = z3.Real(f"t_{i}")
        solver.add(xPos + xVel * t == entry[0][0] + entry[1][0] * t)
        solver.add(yPos + yVel * t == entry[0][1] + entry[1][1] * t)
        solver.add(zPos + zVel * t == entry[0][2] + entry[1][2] * t)
        # times.append(t)

    # results = solver.check()
    solver.check()
    # solver.consequences

    # pprint(results)
    # for k, v in solver.statistics():
    #     print(k, " : ", v)
    # print(solver.model())
    # print(solver.model())
    # for t in times:
    #     print(t, solver.model().eval(t))
    print(solver.model().eval(xPos + yPos + zPos))

    pass


def main():
    # with open(
    #     os.path.join(os.path.dirname(__file__), "example.input.txt"), "r"
    # ) as input_file:
    #     test = input_file.read().rstrip()
    #     solution(test)
    with open(os.path.join(os.path.dirname(__file__), "input.txt"), "r") as input_file:
        input = input_file.read().rstrip()
        solution(input)


if __name__ == "__main__":
    main()
