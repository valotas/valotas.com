/* eslint-env jest */
import { sortByDate } from "./date-sorter.js";

describe("date-sorter", () => {
  test("sorts by the containing date", () => {
    const arr = [
      { date: "2022-01-01" },
      { date: "2022-10-10" },
      { date: "2021-10-10" },
    ];

    const sorted = sortByDate(arr);

    expect(sorted.map(({ date }) => date)).toEqual([
      "2022-10-10",
      "2022-01-01",
      "2021-10-10",
    ]);
  });
});
