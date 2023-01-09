interface Monkey {
  items: number[];
  ops(val: number): number;
  action(val: number): number;
  inspections: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EXAMPLE: Monkey[] = [
  {
    items: [79, 98],
    ops: (val) => val * 19,
    action: (val) => (val % 23 === 0 ? 2 : 3),
    inspections: 0,
  },
  {
    items: [54, 65, 75, 74],
    ops: (val) => val + 6,
    action: (val) => (val % 19 === 0 ? 2 : 0),
    inspections: 0,
  },
  {
    items: [79, 60, 97],
    ops: (val) => val * val,
    action: (val) => (val % 13 === 0 ? 1 : 3),
    inspections: 0,
  },
  {
    items: [74],
    ops: (val) => val + 3,
    action: (val) => (val % 17 === 0 ? 0 : 1),
    inspections: 0,
  },
];

const INPUT: Monkey[] = [
  {
    items: [57],
    ops: (val) => val * 13,
    action: (val) => (val % 11 === 0 ? 3 : 2),
    inspections: 0,
  },
  {
    items: [58, 93, 88, 81, 72, 73, 65],
    ops: (val) => val + 2,
    action: (val) => (val % 7 === 0 ? 6 : 7),
    inspections: 0,
  },
  {
    items: [65, 95],
    ops: (val) => val + 6,
    action: (val) => (val % 13 === 0 ? 3 : 5),
    inspections: 0,
  },
  {
    items: [58, 80, 81, 83],
    ops: (val) => val * val,
    action: (val) => (val % 5 === 0 ? 4 : 5),
    inspections: 0,
  },
  {
    items: [58, 89, 90, 96, 55],
    ops: (val) => val + 3,
    action: (val) => (val % 3 === 0 ? 1 : 7),
    inspections: 0,
  },
  {
    items: [66, 73, 87, 58, 62, 67],
    ops: (val) => val * 7,
    action: (val) => (val % 17 === 0 ? 4 : 1),
    inspections: 0,
  },
  {
    items: [85, 55, 89],
    ops: (val) => val + 4,
    action: (val) => (val % 2 === 0 ? 2 : 0),
    inspections: 0,
  },
  {
    items: [73, 80, 54, 94, 90, 52, 69, 58],
    ops: (val) => val + 7,
    action: (val) => (val % 19 === 0 ? 6 : 0),
    inspections: 0,
  },
];

const monkeys = INPUT;
for (let i = 0; i < 20; i++) {
  monkeys.forEach((monkey) => {
    while (monkey.items.length > 0) {
      monkey.inspections += 1;
      const item = monkey.items.shift();
      const level = Math.floor(monkey.ops(item!) / 3);
      monkeys[monkey.action(level)].items.push(level);
    }
  });
}

const inspections = monkeys.map((monkey) => monkey.inspections);
const topTwo = inspections.sort((a, b) => b - a).slice(0, 2);
export const business = topTwo.reduce((total, val) => total * val, 1);
console.log(`Day 11 Part 2: The monkey business level is ${business}`);
