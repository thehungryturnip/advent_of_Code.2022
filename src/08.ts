import * as utils from "./lib/utils";

class TreeMap {
  trees: number[][];

  constructor(trees: number[][]) {
    this.trees = trees;
  }

  countVisible = (): number => {
    const vis = this.trees.map((row) => row.map(() => false));

    this.trees.forEach((row, index) => {
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

    for (let c = 0; c < this.trees[0].length; c++) {
      let tallest = -1;
      for (let r = 0; r < this.trees.length; r++) {
        if (this.trees[r][c] > tallest) {
          vis[r][c] = true;
          tallest = this.trees[r][c];
        }
      }

      tallest = -1;
      for (let r = this.trees.length - 1; r >= 0; r--) {
        if (this.trees[r][c] > tallest) {
          vis[r][c] = true;
          tallest = this.trees[r][c];
        }
      }
    }

    return utils.arraySum(vis.map((row) => utils.arrayCountTrue(row)));
  };

  calcNorthTrees = (): number[][] =>
    this.trees.map((row, rowIndex) =>
      row.map((tree, colIndex) => {
        if (rowIndex === 0) {
          return 0;
        }
        const height = this.trees[rowIndex][colIndex];
        let r = rowIndex;
        do {
          r--;
        } while (r > 0 && this.trees[r][colIndex] < height);
        return rowIndex - r;
      })
    );

  calcWestTrees = (): number[][] =>
    this.trees.map((row, rowIndex) =>
      row.map((tree, colIndex) => {
        if (colIndex === 0) {
          return 0;
        }
        const height = this.trees[rowIndex][colIndex];
        let c = colIndex;
        do {
          c--;
        } while (c > 0 && this.trees[rowIndex][c] < height);
        return colIndex - c;
      })
    );

  calcSouthTrees = (): number[][] =>
    this.trees.map((row, rowIndex) =>
      row.map((tree, colIndex) => {
        if (rowIndex === this.trees.length - 1) {
          return 0;
        }
        const height = this.trees[rowIndex][colIndex];
        let r = rowIndex;
        do {
          r++;
        } while (r < this.trees.length - 1 && this.trees[r][colIndex] < height);
        return r - rowIndex;
      })
    );

  calcEastTrees = (): number[][] =>
    this.trees.map((row, rowIndex) =>
      row.map((tree, colIndex) => {
        if (colIndex === this.trees[0].length - 1) {
          return 0;
        }
        const height = this.trees[rowIndex][colIndex];
        let c = colIndex;
        do {
          c++;
        } while (
          c < this.trees[0].length - 1 &&
          this.trees[rowIndex][c] < height
        );
        return c - colIndex;
      })
    );

  findBestScene = (): number => {
    const northTrees = this.calcNorthTrees();
    const westTrees = this.calcWestTrees();
    const southTrees = this.calcSouthTrees();
    const eastTrees = this.calcEastTrees();
    const scores = northTrees.map((row, r) =>
      row.map(
        (northTree, c) =>
          northTree * westTrees[r][c] * southTrees[r][c] * eastTrees[r][c]
      )
    );
    return utils.arrayMax(scores.map((row) => utils.arrayMax(row)));
  };
}

const data = utils
  .readFile(8)
  .split("\n")
  .filter((line) => line != "")
  .map((line) => Array.from(line).map((char) => +char));

const treeMap = new TreeMap(data);

export const visible = treeMap.countVisible();
console.log(`Day 08 Part 1: There are ${visible} visible trees.`);

export const bestScene = treeMap.findBestScene();
console.log(`Day 08 Part 2: The best scene score is ${bestScene}.`);
