import { sortDesc, sum } from "../../utils";
import { CardRank, cardRanks, deriveHandRank, handRanks } from "../../utils/cards";
import { readInputFromFile } from "../../utils/io";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);

  const mapped = lines
    // split on whitespace
    .map((line) => line.trim().split(/\s+/g))
    // map to an object to score relative hand strength
    .map(([hand, bid]) => ({
      hand,
      bid: +bid,
      rank: handRanks[deriveHandRank(hand)],
    }))
    .sort((a, b) => {
      // if the rank is different, sort by rank
      // eg 4kind > 2pair
      if (a.rank !== b.rank) {
        return a.rank - b.rank;
      }
      // otherwise loop through the cards left to right
      // and compare each,
      // as soon as they don't match, sort by card rank
      let i = 0;
      while (i < a.hand.length) {
        let aCard = a.hand.charAt(i) as CardRank;
        let bCard = b.hand.charAt(i) as CardRank;
        if (aCard != bCard) {
          return cardRanks[aCard] - cardRanks[bCard];
        }
        i++;
      }
      return 0;
    })
    // multiply final position by the bid amount to obtain winnings score
    .map(({ bid }, idx) => {
      return bid * (idx + 1);
    });
  return sum(mapped);
}
