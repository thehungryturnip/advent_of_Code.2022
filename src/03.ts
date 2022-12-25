import * as utils from "./lib/utils";

const stringToPriority = (s: string): number[] => {
  const priorityBase = "a".charCodeAt(0) - 1;
  const priorities: number[] = [];
  for (const c of s) {
    const priority = c.charCodeAt(0) - priorityBase;
    priorities.push(priority > 0 ? priority : priority + 58);
  }
  return priorities;
};

const data = utils.readFile(3);

const bagStr = data.split("\n").filter((s) => s !== "");
const bagCompStr = bagStr.map((s) => {
  const half = Math.floor(s.length / 2);
  return [s.slice(0, half), s.slice(half)];
});
const bagCompPris = bagCompStr.map((strings) => [
  stringToPriority(strings[0]),
  stringToPriority(strings[1]),
]);
const dups = bagCompPris.map((pris) => {
  const set = new Set<number>(pris[0]);
  for (const n of pris[1]) {
    if (set.has(n)) {
      return n;
    }
  }
  return 0;
});
export const dupSum = dups.reduce((sum, n) => sum + n, 0);
console.log(`Day 03 Part 1: The priority sum is ${dupSum}.`);
