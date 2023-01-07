import * as fs from "fs";

export const readFile = (day: number, example: boolean = false): string => {
  const extension = example ? "ex" : "in";
  const path = `res/${String(day).padStart(2, "0")}.${extension}`;
  return fs.readFileSync(path).toString();
};

export const arraySum = (array: number[]): number =>
  array.reduce((sum, n) => sum + n, 0);

export const arrayCountTrue = (array: boolean[]): number =>
  array.filter((entry) => entry).length;

export const arrayMin = (array: number[]): number =>
  array.reduce(
    (min, size) => (min < size ? min : size),
    Number.MAX_SAFE_INTEGER
  );

export const arrayMax = (array: number[]): number =>
  array.reduce(
    (max, size) => (max > size ? max : size),
    Number.MIN_SAFE_INTEGER
  );
