#!/usr/bin/env ts-node-esm

import * as utils from "./lib/utils";

const sumArray = (array: number[]) => array.reduce((sum, n) => sum + n, 0);
const getElves = (data: string) =>
  data.split("\n\n").map((elf) => sumArray(elf.split("\n").map(Number)));

const data = utils.readFile(1);
const elves = getElves(data);

const theMost = Math.max(...elves);
console.log(`Part 1: The elf with the most calories has ${theMost} calories.`);

const topThree = sumArray(elves.sort().slice(-3));
console.log(`Part 2: The top 3 elves have ${topThree} calories.`);
