import * as fs from "fs";
import * as readline from "readline";

export const readFile = async (
  day: number,
  example: boolean = false
): Promise<string[]> => {
  const extension = example ? "ex" : "in";
  const path = `res/${String(day).padStart(2, "0")}.${extension}`;
  const stream = fs.createReadStream(path);
  const reader = readline.createInterface({
    input: stream,
    crlfDelay: Infinity, // Recognizes all instances of CR and LF as single line break
  });

  const lines: string[] = [];
  for await (const line of reader) {
    lines.push(line);
  }

  return lines;
};
