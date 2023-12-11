import { sortDesc } from "./array";

export const cards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"] as const;
export type CardRank = (typeof cards)[number];
// ranking of cards
export const cardRanks: Record<CardRank, number> = {
  A: 13,
  K: 12,
  Q: 11,
  J: 10,
  T: 9,
  "9": 8,
  "8": 7,
  "7": 6,
  "6": 5,
  "5": 4,
  "4": 3,
  "3": 2,
  "2": 1,
};
export type HandRank = "5kind" | "4kind" | "fhouse" | "3kind" | "2pair" | "pair" | "card";
export const handRanks: Record<HandRank, number> = {
  "5kind": 7,
  "4kind": 6,
  fhouse: 5,
  "3kind": 4,
  "2pair": 3,
  pair: 2,
  card: 1,
};

export function deriveHandRank(hand: string, useJokers = false): HandRank {
  const handMap: Record<string, number> = {};
  hand.split("").forEach((char: string) => {
    handMap[char] = (handMap[char] ?? 0) + 1;
  });

  const sortedCounts = sortDesc(
    Object.entries(handMap)
      // filter out the jokers if using them
      .filter(([card]) => !useJokers || card !== "J")
      .map(([, count]) => +count),
  );
  let jokerCount = useJokers ? handMap.J ?? 0 : 0;
  const high = (sortedCounts[0] ?? 0) + jokerCount;
  const second = sortedCounts[1];

  switch (high) {
    case 5: {
      return "5kind";
    }
    case 4: {
      return "4kind";
    }
    case 3: {
      if (second === 2) {
        return "fhouse";
      }
      return "3kind";
    }
    case 2: {
      if (second === 2) {
        return "2pair";
      }
      return "pair";
    }
    default: {
      return "card";
    }
  }
}
