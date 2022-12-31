import * as utils from "./lib/utils";

interface File {
  size: number;
}

interface Directory {
  parent?: Directory;
  dirs: Record<string, Directory>;
  files: Record<string, File>;
}

class FileSystem {
  root: Directory = {
    dirs: {},
    files: {},
  };

  curr: Directory = this.root;

  processEntry = (entry: string): void => {
    const command = entry.slice(0, 2);
    switch (command) {
      case "cd":
        const dir = entry.split(" ")[1];
        this.changeDir(dir);
        break;
      case "ls":
        const lines = entry.split("\n").filter((line) => line !== "");
        this.listDir(lines);
        break;
    }
  };

  changeDir = (dir: string): void => {
    if (dir === "/") {
      this.curr = this.root;
      return;
    }

    if (dir === "..") {
      this.curr = this.curr.parent!;
      return;
    }

    this.curr = this.curr.dirs[dir];
  };

  listDir = (lines: string[]): void => {
    lines.slice(1).forEach((line) => {
      const entry = line.split(" ");
      if (entry[0] === "dir") {
        this.curr.dirs[entry[1]] = {
          parent: this.curr,
          dirs: {},
          files: {},
        };
      } else {
        this.curr.files[entry[1]] = {
          size: +entry[0],
        };
      }
    });
  };

  calcDirSize = (dir: Directory): number => {
    const fileSize = Object.entries(dir.files)
      .map((file) => file[1].size)
      .reduce((sum, size) => (sum += size), 0);
    const dirSize = Object.entries(dir.dirs)
      .map((record) => this.calcDirSize(record[1]))
      .reduce((sum, size) => (sum += size), 0);
    return fileSize + dirSize;
  };

  sumDirSize = (under: number): number => {
    let dirSize = 0;
    const toCheck = [this.root];
    while (toCheck.length > 0) {
      const dir = toCheck.pop();
      const dirs = Object.entries(dir!.dirs).map((record) => record[1]);
      toCheck.push(...dirs);
      const size = this.calcDirSize(dir!);
      if (size <= under) {
        dirSize += size;
      }
    }
    return dirSize;
  };
}

const data = utils
  .readFile(7)
  .split("$")
  .filter((line) => line !== "")
  .map((line) => line.slice(1))
  .map((line) => line.trim());

const sys = new FileSystem();
data.forEach((entry) => sys.processEntry(entry));
export const dirSum = sys.sumDirSize(100000);
console.log(`Day 07 Part 1: The sum of directories under 10000 is ${dirSum}.`);
