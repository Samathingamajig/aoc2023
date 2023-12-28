import os
import networkx as nx
import matplotlib.pyplot as plt
from operator import mul
from functools import reduce


def solution(inp: str):
    g = nx.Graph()
    for line in inp.split("\n"):
        name, right_side = line.split(": ")
        edges = right_side.split(" ")
        for edge in edges:
            g.add_edge(name, edge)
    # g.remove_node
    g.remove_edge("grd", "hvm")
    g.remove_edge("zfk", "jmn")
    g.remove_edge("kdc", "pmn")

    nx.draw(g, with_labels=True)
    # plt.savefig("filename.png")
    plt.show()
    print("fazbear")
    print([len(c) for c in nx.connected_components(g)])
    print(reduce(mul, [len(g.subgraph(c)) for c in nx.connected_components(g)], 1))

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
