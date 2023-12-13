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

const translate = ([ht, usedJoker]: [number, boolean]) =>
  ["Five", "Four", "Full", "Three", "TwoPair", "OnePair", "HighCard"][ht] + (usedJoker ? " with joker" : "");
const order = "AKQT98765432J";

const judge = (hand: Hand): [number, boolean] => {
  const counts = {} as Record<string, number>;
  for (const c of hand.cards) {
    counts[c] = counts[c] ? counts[c] + 1 : 1;
  }
  let pairs = 0;
  let three = false;
  const jokers = counts["J"] ?? 0;
  let bestHand = HandType.HighCard;
  const usedJoker = jokers > 0;

  for (const [card, freq] of Object.entries(counts)) {
    if (card == "J") continue;

    if (freq == 2) {
      pairs++;
    } else if (freq == 5) {
      bestHand = HandType.Five;
      break;
    } else if (freq == 4) {
      bestHand = HandType.Four;
      break;
    } else if (freq == 3) {
      three = true;
    }
  }

  if (bestHand == HandType.HighCard) {
    if (three) {
      if (pairs > 0) bestHand = HandType.Full;
      else bestHand = HandType.Three;
    } else {
      bestHand = HandType.HighCard - pairs;
    }
  }

  if (bestHand == HandType.Five || jokers == 0) {
    return [bestHand, usedJoker];
  }

  if (jokers == 1) {
    bestHand = {
      [HandType.Four]: HandType.Five,
      [HandType.Full]: HandType.Full, // literally impossible but TS yells at me
      [HandType.Three]: HandType.Four,
      [HandType.TwoPair]: HandType.Full,
      [HandType.OnePair]: HandType.Three,
      [HandType.HighCard]: HandType.OnePair,
    }[bestHand];
  } else if (jokers == 2) {
    bestHand = {
      [HandType.Four]: HandType.Five, // literally impossible but TS yells at me
      [HandType.Full]: HandType.Full, // literally impossible but TS yells at me
      [HandType.Three]: HandType.Five,
      [HandType.TwoPair]: HandType.Full, // literally impossible but TS yells at me
      [HandType.OnePair]: HandType.Four,
      [HandType.HighCard]: HandType.Three,
    }[bestHand];
  } else if (jokers == 3) {
    bestHand = {
      [HandType.Four]: HandType.Five, // literally impossible but TS yells at me
      [HandType.Full]: HandType.Full, // literally impossible but TS yells at me
      [HandType.Three]: HandType.Five, // literally impossible but TS yells at me
      [HandType.TwoPair]: HandType.Full, // literally impossible but TS yells at me
      [HandType.OnePair]: HandType.Five,
      [HandType.HighCard]: HandType.Four,
    }[bestHand];
  } else if (jokers >= 4) {
    bestHand = HandType.Five;
  }

  return [bestHand, usedJoker];
};

const compare = (a: Hand, b: Hand) => {
  const aa = judge(a);
  const bb = judge(b);
  if (aa[0] != bb[0]) {
    return aa[0] - bb[0];
  }
  // if (aa[1] != bb[1]) {
  //   // console.log("foo");
  //   if (aa[1]) return 1;
  //   else return -1;
  // }

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
  // if (input.length > 1000) return;
  const hands = input.split("\n").map((line) => {
    const parts = line.split(" ");
    return {
      cards: parts[0],
      bet: +parts[1],
    } satisfies Hand;
  });

  // console.log(hands);

  const handsSorted = hands.toSorted(compare).reverse();
  // console.log(handsSorted.map((h) => [h, judge(h), ]));
  // console.log(handsSorted);

  const answer = handsSorted.reduce((acc, curr, i) => {
    // console.log(curr.bet, i + 1);
    return acc + curr.bet * (i + 1);
  }, 0);

  // console.log(handsSorted.slice(-100, -50).map((h) => [h, judge(h), translate(judge(h))]));

  // if (input.length > 1000)
  console.log(
    handsSorted
      // .toSorted((a, b) => Math.random() - 0.5)
      // .slice(0, 10)
      .map((h) => [h, judge(h), translate(judge(h))]),
  );

  // let i = 0;
  // for (const hand of hands.toSorted(() => Math.random() - 0.5)) {
  //   console.log(hand.cards.split("").sort().join(""), translate(judge(hand)));
  //   if (++i % 10 == 0) prompt();
  // }

  // console.log([{ cards: "JJJJJ", bet: 0 }]);

  return answer.toString();
};

// console.log(
//   solution(`JJJJJ 0
// QQQQQ 0
// KKKKJ 0
// KKJJA 0`),
// );

// while (true) {
//   const inp = prompt()!!!!;
//   if (inp?.length < 2) break;
//   console.log(translate(judge({ cards: inp, bet: 0 })));
// }
