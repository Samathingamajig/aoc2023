type Hand = {
  cards: string;
  bet: number;
};

enum HandType {
  Five,
  Four,
  Full,
  Three,
  TwoPair,
  OnePair,
  HighCard,
}

const order = "AKQJT98765432";

const judge = (hand: Hand) => {
  const counts = {} as Record<string, number>;
  for (const c of hand.cards) {
    counts[c] = counts[c] ? counts[c] + 1 : 1;
  }
  let pairs = 0;
  let three = false;
  for (const [card, freq] of Object.entries(counts)) {
    if (freq == 2) {
      pairs++;
    } else if (freq == 5) {
      return HandType.Five;
    } else if (freq == 4) {
      return HandType.Four;
    } else if (freq == 3) {
      three = true;
    }
  }
  if (three) {
    if (pairs > 0) return HandType.Full;
    else return HandType.Three;
  }

  return HandType.HighCard - pairs;
};

const compare = (a: Hand, b: Hand) => {
  const aa = judge(a);
  const bb = judge(b);
  if (aa != bb) {
    return aa - bb;
  }

  for (let i = 0; i < a.cards.length; i++) {
    const aaa = order.indexOf(a.cards[i]);
    const bbb = order.indexOf(b.cards[i]);
    if (aaa != bbb) {
      return aaa - bbb;
    }
  }
  return 0;
};

export const solution = (input: string) => {
  const hands = input.split("\n").map((line) => {
    const parts = line.split(" ");
    return {
      cards: parts[0],
      bet: +parts[1],
    } satisfies Hand;
  });

  console.log(hands);

  const handsSorted = hands.toSorted(compare).reverse();
  console.log(handsSorted);

  const answer = handsSorted.reduce((acc, curr, i) => {
    // console.log(curr.bet, i + 1);
    return acc + curr.bet * (i + 1);
  }, 0);

  return answer.toString();
};
