import * as utils from "./lib/utils";

// A, X: Rock
// B, Y: Paper
// C, Z: Scissor
const scoreTable: Record<string, number> = {
  "A X": 1 + 3,
  "B X": 1 + 0,
  "C X": 1 + 6,
  "A Y": 2 + 6,
  "B Y": 2 + 3,
  "C Y": 2 + 0,
  "A Z": 3 + 0,
  "B Z": 3 + 6,
  "C Z": 3 + 3,
  "": 0,
};

const data = utils.readFile(2);
const rounds = data.split("\n");
const scores = rounds.map((round) => scoreTable[round]);
const score = utils.sumArray(scores);
console.log(`Day 02 Part 1: Total score is ${score}.`);

// A: Rock
// B: Paper
// C: Scissor
// X: lose
// Y: draw
// Z: win
const scoreTable2: Record<string, number> = {
  "A X": 3 + 0,
  "B X": 1 + 0,
  "C X": 2 + 0,
  "A Y": 1 + 3,
  "B Y": 2 + 3,
  "C Y": 3 + 3,
  "A Z": 2 + 6,
  "B Z": 3 + 6,
  "C Z": 1 + 6,
  "": 0,
};

const scores2 = rounds.map((round) => scoreTable2[round]);
const score2 = utils.sumArray(scores2);
console.log(`Day 02 Part 2: Total score is ${score2}.`);
