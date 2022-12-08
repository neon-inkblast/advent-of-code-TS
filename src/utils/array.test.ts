import { max, min, sortAsc, sortDesc, splitEvery, splitOnEmpty, splitOnX, sum } from "./array";

describe("array utils", () => {
  describe("splitting arrays", () => {
    test.each([
      {
        input: ["1", "2", "3", "X", "4", "5", "6", "X", "7", "8", "9", "X", "10", "11", "12"],
        token: "X",
        expected: [
          ["1", "2", "3"],
          ["4", "5", "6"],
          ["7", "8", "9"],
          ["10", "11", "12"]
        ]
      },
      {
        input: [1, 2, 3, "", 4, 5, 6, "", 7, 8, 9, "", 10, 11, 12],
        token: "",
        expected: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
          [10, 11, 12]
        ]
      }
    ])("splits an array $input on a token '$token'", ({ input, token, expected }) => {
      const result = splitOnX(input, token);
      expect(result).toEqual(expected);
    });

    test.each([
      {
        input: ["1", "2", "3", "", "4", "5", "6", "", "7", "8", "9", "", "10", "11", "12"],
        expected: [
          ["1", "2", "3"],
          ["4", "5", "6"],
          ["7", "8", "9"],
          ["10", "11", "12"]
        ]
      }
    ])("splits a string array $input on an empty line", ({ input, expected }) => {
      const result = splitOnEmpty(input);
      expect(result).toEqual(expected);
    });

    test.each([
      {
        input: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        n: 3,
        expected: [
          ["1", "2", "3"],
          ["4", "5", "6"],
          ["7", "8", "9"],
          ["10", "11", "12"]
        ]
      }
    ])("splits a string array $input every $n elements", ({ input, n, expected }) => {
      const result = splitEvery(input, n);
      expect(result).toEqual(expected);
    });
  });

  describe("sorting and reducing", () => {
    test.each([
      {
        input: ["1", "2", "3", "4"],
        expected: 10
      },
      {
        input: [11, 22, 33],
        expected: 66
      }
    ])(
      "sums up an array of values $input = $expected",
      ({ input, expected }: { input: any[]; expected: number }) => {
        const result = sum(input);
        expect(result).toEqual(expected);
      }
    );
    test.each([
      {
        input: ["1", "31", "30", "7"],
        expected: "31"
      },
      {
        input: [12, 13, 12, 14, 12],
        expected: 14
      }
    ])(
      "finds the largest value in an array of values $input = $expected",
      ({ input, expected }: { input: any[]; expected: any }) => {
        const result = max(input);
        expect(result).toEqual(expected);
      }
    );
    test.each([
      {
        input: ["13", "31", "3", "7"],
        expected: "3"
      },
      {
        input: [12, 13, 11, 14, 12],
        expected: 11
      }
    ])(
      "finds the smallest value in an array of values $input = $expected",
      ({ input, expected }: { input: any[]; expected: any }) => {
        const result = min(input);
        expect(result).toEqual(expected);
      }
    );
    test.each([
      {
        input: ["13", "31", "3", "7"],
        expected: ["3", "7", "13", "31"]
      },
      {
        input: [12, 13, 11, 14, 12],
        expected: [11, 12, 12, 13, 14]
      }
    ])(
      "sorts an array of values in ascending order, $input to $expected",
      ({ input, expected }: { input: any[]; expected: any[] }) => {
        const result = sortAsc(input);
        expect(result).toEqual(expected);
      }
    );
    test.each([
      {
        input: ["13", "31", "3", "7"],
        expected: ["31", "13", "7", "3"]
      },
      {
        input: [12, 13, 11, 14, 12],
        expected: [14, 13, 12, 12, 11]
      }
    ])(
      "sorts an array of values in descending order, $input to $expected",
      ({ input, expected }: { input: any[]; expected: any[] }) => {
        const result = sortDesc(input);
        expect(result).toEqual(expected);
      }
    );
  });
});
