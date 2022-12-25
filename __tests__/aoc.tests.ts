import * as day01 from "../src/01";
import * as day02 from "../src/02";
import * as day03 from "../src/03";

it.each([
  [1, 1, 72017, day01.theMost],
  [1, 2, 212520, day01.topThree],
  [2, 1, 8890, day02.score],
  [2, 2, 10238, day02.score2],
  [3, 1, 7701, day03.dupSum],
  [3, 2, 2644, day03.badgeSum],
])(
  "For day %p part %p. Expect %p.",
  (day: number, part: number, answer: number, actual: number) => {
    expect(answer).toEqual(actual);
  }
);
