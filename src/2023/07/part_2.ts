import { sum } from "../../utils";
import { readInputFromFile } from "../../utils/io";
import { CardRank, HandRank, cardRanks, deriveHandRank, handRanks } from "../../utils/cards";

export type CamelHand = {
  hand: string;
  bid: number;
  rank: HandRank;
};
export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const cardRanksLowJoker = { ...cardRanks, J: 0 };
  const mapped = lines
    .map((line) => line.trim().split(/\s+/g))
    .map(([hand, bid]): CamelHand => {
      return {
        hand,
        bid: +bid,
        rank: deriveHandRank(hand, true),
      };
    })
    .sort((a, b) => {
      if (a.rank !== b.rank) {
        return handRanks[a.rank] - handRanks[b.rank];
      }
      let i = 0;
      while (i < a.hand.length) {
        let aCard = a.hand.charAt(i) as CardRank;
        let bCard = b.hand.charAt(i) as CardRank;
        if (aCard != bCard) {
          return cardRanksLowJoker[aCard] - cardRanksLowJoker[bCard];
        }
        i++;
      }
      return 0;
    })
    .map(({ hand, rank, bid }, idx) => {
      return bid * (idx + 1);
    });

  return sum(mapped);
}
