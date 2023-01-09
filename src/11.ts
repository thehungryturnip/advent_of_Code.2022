interface Monkey {
  starting: number[];
  ops(val: number): number;
  test: number;
  trueTarget: number;
  falseTarget: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EXAMPLE: Monkey[] = [
  {
    starting: [79, 98],
    ops: (val) => val * 19,
    test: 23,
    trueTarget: 2,
    falseTarget: 3,
  },
  {
    starting: [54, 65, 75, 74],
    ops: (val) => val + 6,
    test: 19,
    trueTarget: 2,
    falseTarget: 0,
  },
  {
    starting: [79, 60, 97],
    ops: (val) => val * val,
    test: 13,
    trueTarget: 1,
    falseTarget: 3,
  },
  {
    starting: [74],
    ops: (val) => val + 3,
    test: 17,
    trueTarget: 0,
    falseTarget: 1,
  },
];

const INPUT: Monkey[] = [
  {
    starting: [57],
    ops: (val) => val * 13,
    test: 11,
    trueTarget: 3,
    falseTarget: 2,
  },
  {
    starting: [58, 93, 88, 81, 72, 73, 65],
    ops: (val) => val + 2,
    test: 7,
    trueTarget: 6,
    falseTarget: 7,
  },
  {
    starting: [65, 95],
    ops: (val) => val + 6,
    test: 13,
    trueTarget: 3,
    falseTarget: 5,
  },
  {
    starting: [58, 80, 81, 83],
    ops: (val) => val * val,
    test: 5,
    trueTarget: 4,
    falseTarget: 5,
  },
  {
    starting: [58, 89, 90, 96, 55],
    ops: (val) => val + 3,
    test: 3,
    trueTarget: 1,
    falseTarget: 7,
  },
  {
    starting: [66, 73, 87, 58, 62, 67],
    ops: (val) => val * 7,
    test: 17,
    trueTarget: 4,
    falseTarget: 1,
  },
  {
    starting: [85, 55, 89],
    ops: (val) => val + 4,
    test: 2,
    trueTarget: 2,
    falseTarget: 0,
  },
  {
    starting: [73, 80, 54, 94, 90, 52, 69, 58],
    ops: (val) => val + 7,
    test: 19,
    trueTarget: 6,
    falseTarget: 0,
  },
];

const input = INPUT;

const calcBusiness = (
  data: Monkey[],
  rounds: number,
  adjust: (level: number) => number
): number => {
  const monkeys = data.map((entry) => ({
    ...entry,
    items: [...entry.starting],
    inspections: 0,
  }));

  for (let i = 0; i < rounds; i++) {
    monkeys.forEach((monkey) => {
      while (monkey.items.length > 0) {
        monkey.inspections += 1;
        const item = monkey.items.shift();
        const level = adjust(monkey.ops(item!));
        const target =
          level % monkey.test === 0 ? monkey.trueTarget : monkey.falseTarget;
        monkeys[target].items.push(level);
      }
    });
  }
  const inspections = monkeys.map((monkey) => monkey.inspections);
  const topTwo = inspections.sort((a, b) => b - a).slice(0, 2);
  return topTwo.reduce((total, val) => total * val, 1);
};

export const business = calcBusiness(input, 20, (level) =>
  Math.floor(level / 3)
);
console.log(`Day 11 Part 1: The monkey business level is ${business}`);

const levelMod = input
  .map((monkey) => monkey.test)
  .reduce((total, test) => total * test, 1);
export const bigBusiness = calcBusiness(
  input,
  10000,
  (level) => level % levelMod
);
console.log(`Day 11 part 2: The big monkey business level is ${bigBusiness}`);
