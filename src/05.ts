import * as utils from "./lib/utils";

interface Move {
  count: number;
  from: number;
  to: number;
}

class CargoBay {
  crates: string[][] = [...Array(9)].map(() => []);

  moves: Move[] = [];

  setCrates = (data: string[]) => {
    for (let i = 0; i < 9; i++) {
      const pos = 1 + i * 4;
      for (let l = data.length - 2; l >= 0; l--) {
        const crateId = data[l][pos];
        if (crateId && crateId !== " ") {
          this.crates[i].push(crateId);
        }
      }
    }
  };

  setMoves = (data: string[]) => {
    this.moves = data
      .map((line) => line.match(/^move (\d+) from (\d) to (\d)$/))
      .map((matched) => ({
        count: +matched![1],
        from: +matched![2],
        to: +matched![3],
      }));
  };

  execMoves = () =>
    this.moves.forEach(({ count, from, to }) => {
      const toMove = this.crates[from - 1].splice(
        this.crates[from - 1].length - count,
        count
      );
      this.crates[to - 1].push(...toMove.reverse());
    });

  getTopCrates = (): string =>
    this.crates
      .map((stack) => stack[stack.length - 1])
      .filter((id) => id !== undefined)
      .reduce((str, id) => (str += id), "");
}

const data = utils.readFile(5).split("\n");

const crateData = data.filter((s) => s[0] === "[" || s[0] === " ");

const moveData = data.filter((s) => s[0] === "m");

const bay = new CargoBay();
bay.setCrates(crateData);
bay.setMoves(moveData);
bay.execMoves();
export const topCrates = bay.getTopCrates();
console.log(`Day 05 Part 1: The top crates are ${topCrates}.`);
