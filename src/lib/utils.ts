import * as fs from "fs";

export const readFile = (day: number, example: boolean = false): string => {
  const extension = example ? "ex" : "in";
  const path = `res/${String(day).padStart(2, "0")}.${extension}`;
  return fs.readFileSync(path).toString();
};

export const sumArray = (array: number[]) =>
  array.reduce((sum, n) => sum + n, 0);
