import * as utils from "./lib/utils";

const rangeStartEnd = (range: string): number[] =>
  range.split("-").map((val) => +val);

const rangeCovers = (thisRange: string, thatRange: string): boolean => {
  const thisStartEnd = rangeStartEnd(thisRange);
  const thatStartEnd = rangeStartEnd(thatRange);
  if (
    thisStartEnd[0] <= thatStartEnd[0] &&
    thatStartEnd[1] <= thisStartEnd[1]
  ) {
    return true;
  }
  if (
    thatStartEnd[0] <= thisStartEnd[0] &&
    thisStartEnd[1] <= thatStartEnd[1]
  ) {
    return true;
  }
  return false;
};

const data = utils
  .readFile(4)
  .split("\n")
  .filter((s) => s !== "");
const entries = data.map((line) => line.split(","));
const covers = entries.map((entry) => rangeCovers(entry[0], entry[1]));
export const coversCount = covers.reduce((sum, val) => (sum += val ? 1 : 0), 0);
console.log(
  `Day 04 part 1: The number of pairs that fully covers each other is ${coversCount}.`
);
