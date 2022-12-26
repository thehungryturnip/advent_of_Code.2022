import * as day01 from "../src/01";
import * as day02 from "../src/02";
import * as day03 from "../src/03";
import * as day04 from "../src/04";
import * as day05 from "../src/05";

it.each([
  [1, 1, 72017, day01.theMost],
  [1, 2, 212520, day01.topThree],
  [2, 1, 8890, day02.score],
  [2, 2, 10238, day02.score2],
  [3, 1, 7701, day03.dupSum],
  [3, 2, 2644, day03.badgeSum],
  [4, 1, 477, day04.coversCount],
  [4, 2, 830, day04.overlapCount],
  [5, 1, "TBVFVDZPN", day05.topCrates],
])(
  "For day %p part %p. Expect %p.",
  (
    day: number,
    part: number,
    answer: number | string,
    actual: number | string
  ) => {
    expect(answer).toEqual(actual);
  }
);
