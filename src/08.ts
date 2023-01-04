import * as utils from "./lib/utils";

const countVisible = (trees: number[][]): number => {
  const vis = trees.map((row) => row.map(() => false));

  trees.forEach((row, index) => {
    let tallest = -1;
    for (let c = 0; c < row.length; c++) {
      if (row[c] > tallest) {
        vis[index][c] = true;
        tallest = row[c];
      }
    }

    tallest = -1;
    for (let c = row.length - 1; c >= 0; c--) {
      if (row[c] > tallest) {
        vis[index][c] = true;
        tallest = row[c];
      }
    }
  });

  for (let c = 0; c < trees[0].length; c++) {
    let tallest = -1;
    for (let r = 0; r < trees.length; r++) {
      if (trees[r][c] > tallest) {
        vis[r][c] = true;
        tallest = trees[r][c];
      }
    }

    tallest = -1;
    for (let r = trees.length - 1; r >= 0; r--) {
      if (trees[r][c] > tallest) {
        vis[r][c] = true;
        tallest = trees[r][c];
      }
    }
  }

  return utils.sumArray(vis.map((row) => utils.countTrueArray(row)));
};

const data = utils
  .readFile(8)
  .split("\n")
  .filter((line) => line != "")
  .map((line) => Array.from(line).map((char) => +char));

export const visible = countVisible(data);
console.log(`Day 08 Part 1: There are ${visible} visible trees.`);
