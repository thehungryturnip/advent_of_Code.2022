#!/usr/bin/env ts-node-esm

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
