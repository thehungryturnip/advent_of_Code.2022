import * as utils from "./lib/utils";

const findMarker = (buffer: string): number => {
  for (let i = 4; i <= buffer.length; i++) {
    const marker = new Set<string>(buffer.slice(i - 4, i));
    if (marker.size === 4) {
      return i;
    }
  }
  return -1;
};

const data = utils
  .readFile(6)
  .split("\n")
  .filter((s) => s !== "");
const markerPoss = data.map((entry: string) => findMarker(entry));
export const markerPos = markerPoss[0];
console.log(`Day 06 Part 1: The marker is at position ${markerPos}`);
