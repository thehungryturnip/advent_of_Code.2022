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
  head: Coord = new Coord(0, 0);

  tail: Coord = new Coord(0, 0);

  history: Set<string> = new Set<string>([this.tail.key()]);

  move = (move: Move) => {
    for (let i = 0; i < move[1]; i++) {
      this.moveHead(move[0]);
      this.moveTail();
    }
  };

  moveHead = (move: string) => {
    switch (move) {
      case "R":
        this.head.add(new Coord(0, 1));
        break;
      case "L":
        this.head.add(new Coord(0, -1));
        break;
      case "U":
        this.head.add(new Coord(-1, 0));
        break;
      case "D":
        this.head.add(new Coord(1, 0));
    }
  };

  moveTail = () => {
    const diff = this.tail.diff(this.head);
    if (diff.equals(new Coord(2, 0))) {
      this.tail.add(new Coord(1, 0));
    }
    if (diff.equals(new Coord(-2, 0))) {
      this.tail.add(new Coord(-1, 0));
    }
    if (diff.equals(new Coord(0, 2))) {
      this.tail.add(new Coord(0, 1));
    }
    if (diff.equals(new Coord(0, -2))) {
      this.tail.add(new Coord(0, -1));
    }
    if (diff.equals(new Coord(2, 1)) || diff.equals(new Coord(1, 2))) {
      this.tail.add(new Coord(1, 1));
    }
    if (diff.equals(new Coord(2, -1)) || diff.equals(new Coord(1, -2))) {
      this.tail.add(new Coord(1, -1));
    }
    if (diff.equals(new Coord(-2, 1)) || diff.equals(new Coord(-1, 2))) {
      this.tail.add(new Coord(-1, 1));
    }
    if (diff.equals(new Coord(-2, -1)) || diff.equals(new Coord(-1, -2))) {
      this.tail.add(new Coord(-1, -1));
    }

    const historyStr = this.tail.key();
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

const stringMap = new StringMap();
data.forEach((move) => stringMap.move(move));
export const visited = stringMap.history.size;
console.log(`Day 09 Part 1: The number of positions visited is ${visited}`);
