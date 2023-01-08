import * as utils from "./lib/utils";

type Move = [string, number];

class Coord {
  row: number;

  col: number;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  add = (other: Coord) => {
    this.row += other.row;
    this.col += other.col;
  };

  diff = (other: Coord): Coord =>
    new Coord(other.row - this.row, other.col - this.col);

  equals = (other: Coord): boolean =>
    this.row === other.row && this.col === other.col;

  key = (): string => `${this.row}:${this.col}`;
}

class StringMap {
  rope: Coord[];

  history: Set<string>;

  constructor(length: number) {
    this.rope = [];
    for (let i = 0; i < length; i++) {
      this.rope.push(new Coord(0, 0));
    }
    this.history = new Set<string>([this.rope[this.rope.length - 1].key()]);
  }

  move = (move: Move) => {
    for (let i = 0; i < move[1]; i++) {
      this.moveHead(move[0]);
      this.moveBody();
    }
  };

  moveHead = (move: string) => {
    switch (move) {
      case "R":
        this.rope[0].add(new Coord(0, 1));
        break;
      case "L":
        this.rope[0].add(new Coord(0, -1));
        break;
      case "U":
        this.rope[0].add(new Coord(-1, 0));
        break;
      case "D":
        this.rope[0].add(new Coord(1, 0));
    }
  };

  moveBody = () => {
    for (let i = 1; i < this.rope.length; i++) {
      const diff = this.rope[i].diff(this.rope[i - 1]);
      if (diff.equals(new Coord(2, 0))) {
        this.rope[i].add(new Coord(1, 0));
      }
      if (diff.equals(new Coord(-2, 0))) {
        this.rope[i].add(new Coord(-1, 0));
      }
      if (diff.equals(new Coord(0, 2))) {
        this.rope[i].add(new Coord(0, 1));
      }
      if (diff.equals(new Coord(0, -2))) {
        this.rope[i].add(new Coord(0, -1));
      }
      if (
        diff.equals(new Coord(2, 1)) ||
        diff.equals(new Coord(1, 2)) ||
        diff.equals(new Coord(2, 2))
      ) {
        this.rope[i].add(new Coord(1, 1));
      }
      if (
        diff.equals(new Coord(2, -1)) ||
        diff.equals(new Coord(1, -2)) ||
        diff.equals(new Coord(2, -2))
      ) {
        this.rope[i].add(new Coord(1, -1));
      }
      if (
        diff.equals(new Coord(-2, 1)) ||
        diff.equals(new Coord(-1, 2)) ||
        diff.equals(new Coord(-2, 2))
      ) {
        this.rope[i].add(new Coord(-1, 1));
      }
      if (
        diff.equals(new Coord(-2, -1)) ||
        diff.equals(new Coord(-1, -2)) ||
        diff.equals(new Coord(-2, -2))
      ) {
        this.rope[i].add(new Coord(-1, -1));
      }
    }

    const historyStr = this.rope[this.rope.length - 1].key();
    if (!this.history.has(historyStr)) {
      this.history.add(historyStr);
    }
  };
}

const data = utils
  .readFile(9)
  .split("\n")
  .filter((line) => line != "")
  .map((line) => line.split(" ") as Move);

const stringMap = new StringMap(2);
data.forEach((move) => stringMap.move(move));
export const visited = stringMap.history.size;
console.log(`Day 09 Part 1: The number of positions visited is ${visited}`);

const longerStringMap = new StringMap(10);
data.forEach((move) => longerStringMap.move(move));
export const longerVisited = longerStringMap.history.size;
console.log(
  `Day 09 Part 2: The number of positions visited for the longer string is ${longerVisited}`
);
