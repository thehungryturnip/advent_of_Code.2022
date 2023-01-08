import * as utils from "./lib/utils";

type Instruction = [string, number];

class CommSystem {
  reg: number[] = [1];

  disp: string = "";

  exec = (ins: Instruction) => {
    switch (ins[0]) {
      case "addx":
        this.reg.push(this.reg[this.reg.length - 1]);
        this.reg.push(this.reg[this.reg.length - 1] + +ins[1]);
        break;
      case "noop":
        this.reg.push(this.reg[this.reg.length - 1]);
        break;
    }
  };

  generateDisplay = () => {
    const pixels: string[][] = [...Array(6)].map(() => new Array(40).fill("."));

    this.reg.forEach((val, cycle) => {
      const col = cycle % 40;
      const row = Math.floor(cycle / 40) % 6;
      if ([-1, 0, 1].includes(val - col)) {
        pixels[row][col] = "#";
      }
    });

    this.disp = pixels.map((line) => line.join("")).join("\n");
  };
}

const data = utils
  .readFile(10)
  .split("\n")
  .filter((line) => line != "")
  .map((line) => line.split(" ") as Instruction);

const sys = new CommSystem();
data.forEach((ins) => sys.exec(ins));
export const sigStrength = utils.arraySum(
  sys.reg.map((val, cycle) => {
    if ([20, 60, 100, 140, 180, 220].includes(cycle + 1)) {
      return (cycle + 1) * val;
    }
    return 0;
  })
);
console.log(
  `Day 10 Part 1: The sum of the 6 signal strengths is ${sigStrength}`
);

sys.generateDisplay();
console.log(`CRT:\n${sys.disp}`);
export const letters = "EPJBRKAH";
console.log(`Day 10 Part 2: The CRT shows ${letters}`);
