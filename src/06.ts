import * as utils from "./lib/utils";

const findMarker = (buffer: string, len: number): number => {
  for (let i = len; i <= buffer.length; i++) {
    const marker = new Set<string>(buffer.slice(i - len, i));
    if (marker.size === len) {
      return i;
    }
  }
  return -1;
};

const data = utils
  .readFile(6)
  .split("\n")
  .filter((s) => s !== "");
const starts = data.map((entry: string) => findMarker(entry, 4));
export const start = starts[0];
console.log(`Day 06 Part 1: The start marker is at position ${start}`);

const messages = data.map((entry: string) => findMarker(entry, 14));
export const message = messages[0];
console.log(`Day 06 Part 2: The message marker is at position ${message}`);
