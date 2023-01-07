import * as utils from "./lib/utils";

const stringToPriority = (s: string): number[] => {
  const priorityBase = "a".charCodeAt(0) - 1;
  const priorities: number[] = [];
  for (const c of s) {
    const priority = c.charCodeAt(0) - priorityBase;
    priorities.push(priority >= 0 ? priority : priority + 58);
  }
  return priorities;
};

const findCommon = (this_: number[], that: number[]): number[] => {
  const common = new Set<number>();
  const set = new Set<number>(this_);
  for (const n of that) {
    if (set.has(n)) {
      common.add(n);
    }
  }
  return Array.from(common);
};

const data = utils.readFile(3);

const bagStr = data.split("\n").filter((s) => s !== "");
const bagPris = bagStr.map((s) => stringToPriority(s));
const bagCompPris = bagPris.map((s) => {
  const half = Math.floor(s.length / 2);
  return [s.slice(0, half), s.slice(half)];
});
const dups = bagCompPris.map((pris) => findCommon(pris[0], pris[1])[0]);

export const dupSum = utils.arraySum(dups);
console.log(`Day 03 Part 1: The priority sum is ${dupSum}.`);

const groups = [];
for (let i = 0; i < bagPris.length; i += 3) {
  groups.push(bagPris.slice(i, i + 3));
}

const badges = groups.map(
  (group) => findCommon(findCommon(group[0], group[1]), group[2])[0]
);
export const badgeSum = utils.arraySum(badges);
console.log(`Day 03 Part 2: The badge sum is ${badgeSum}.`);
