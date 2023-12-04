import { readInputFromFile } from "../../utils/io";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const mapped = lines.map(line => line.split("|")
  .map((nums,idx) => {
    let matches = nums.match(/\d+/g) as string[] ?? []
    if (idx === 0) {
      matches = matches?.slice(1);
    }
    return matches;
  }))
  let score = 0;

  mapped.forEach(([winners, card]) => {
    let cardScore = -1;
    card.forEach(cardNum => {
      if (winners.find(x => x===cardNum))
      {
        cardScore++
      }
    })
    score += cardScore >= 0 ? Math.pow(2,cardScore) : 0;
 })
  return score;
}
