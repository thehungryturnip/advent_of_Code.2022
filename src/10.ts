import * as utils from "./lib/utils";

type Instruction = [string, number];

class Processor {
  reg: number[] = [1];

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
}

const data = utils
  .readFile(10)
  .split("\n")
  .filter((line) => line != "")
  .map((line) => line.split(" ") as Instruction);

const cpu = new Processor();
data.forEach((ins) => cpu.exec(ins));
export const sigStrength = utils.arraySum(
  cpu.reg.map((val, cycle) => {
    if ([20, 60, 100, 140, 180, 220].includes(cycle + 1)) {
      return (cycle + 1) * val;
    }
    return 0;
  })
);
console.log(
  `Day 10 Part 1: The sum of the 6 signal strengths is ${sigStrength}`
);
