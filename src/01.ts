#!/usr/bin/env ts-node-esm

import * as inputReader from "./lib/inputReader";

const main = async () => {
  const input = await inputReader.readFile(1);

  let biggest = 0;
  let current = 0;
  input.forEach((line) => {
    if (line === "") {
      if (current > biggest) {
        biggest = current;
      }
      current = 0;
    } else {
      current += +line;
    }
  });
  if (current > biggest) {
    biggest = current;
  }

  console.log(
    `Part 1: The elf with the most calories has ${biggest} calories.`
  );
};

main().catch(console.error);
