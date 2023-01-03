import * as utils from "./lib/utils";

const rangeStartEnd = (range: string): number[] =>
  range.split("-").map((val) => +val);

const rangeCovers = (thisRange: number[], thatRange: number[]): boolean => {
  if (thisRange[0] <= thatRange[0] && thatRange[1] <= thisRange[1]) {
    return true;
  }
  if (thatRange[0] <= thisRange[0] && thisRange[1] <= thatRange[1]) {
    return true;
  }
  return false;
};

const rangeOverlaps = (thisRange: number[], thatRange: number[]): boolean => {
  if (thisRange[0] <= thatRange[1] && thatRange[1] <= thisRange[1]) {
    return true;
  }
  if (thatRange[0] <= thisRange[1] && thisRange[1] <= thatRange[1]) {
    return true;
  }
  return false;
};

const data = utils
  .readFile(4)
  .split("\n")
  .filter((s) => s !== "");
const entries = data.map((line) =>
  line.split(",").map((range) => rangeStartEnd(range))
);
const covers = entries.map((entry) => rangeCovers(entry[0], entry[1]));
export const coversCount = utils.countTrueArray(covers);
console.log(
  `Day 04 Part 1: The number of pairs that fully covers each other is ${coversCount}.`
);

const overlaps = entries.map((entry) => rangeOverlaps(entry[0], entry[1]));
export const overlapCount = utils.countTrueArray(overlaps);
console.log(
  `Day 04 Part 2: The number of pairs that overlap each other is ${overlapCount}.`
);
