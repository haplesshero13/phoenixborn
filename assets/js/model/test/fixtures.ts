import allTheCards from "../../../../priv/cards.json"
export { allTheCards }

export const cardList = allTheCards.cards.map((card) => (card.name))

export const jerichoString = `Jericho River Dance

Phoenixborn: Jericho Kill

Dice:
3x Ceremonial
3x Illusion
4x Sympathy

Cards (30/30):

Ready Spells (8):
1x Changing Winds
3x Chant of Revenge
3x Summon Shadow Spirit
1x Summon Squall Stallion

Allies (6):
1x Anchornaut
3x Fire Archer
2x River Skald

Action Spells (9):
2x Blood Chains
3x Double Edge (Jericho Kill)
1x Hand Tricks
3x Hidden Power

Reaction Spells (7):
3x Crescendo
2x Final Cry
2x Summon Sleeping Widows

Conjuration Deck:
4x Shadow Spirit
6x Sleeping Widow
5x Squall Stallion

Created with https://ashes.live`

export const jerichoDeck = {
  phoenixborn: 'Jericho Kill',
  cards: [
    { name: 'Changing Winds', qty: 1 },
    { name: 'Chant of Revenge', qty: 3 },
    { name: 'Summon Shadow Spirit', qty: 3 },
    { name: 'Summon Squall Stallion', qty: 1 },
    { name: 'Anchornaut', qty: 1 },
    { name: 'Fire Archer', qty: 3 },
    { name: 'River Skald', qty: 2 },
    { name: 'Blood Chains', qty: 2 },
    { name: 'Double Edge', qty: 3 },
    { name: 'Hand Tricks', qty: 1 },
    { name: 'Hidden Power', qty: 3 },
    { name: 'Crescendo', qty: 3 },
    { name: 'Final Cry', qty: 2 },
    { name: 'Summon Sleeping Widows', qty: 2 },
    { name: 'Shadow Spirit', qty: 4 },
    { name: 'Sleeping Widow', qty: 6 },
    { name: 'Squall Stallion', qty: 5 },
  ],
  dice: [
    { name: 'Ceremonial', qty: 3 },
    { name: 'Illusion', qty: 3 },
    { name: 'Sympathy', qty: 4 },
  ]
}

export const cards = [
  {
    cost: ["[[main]]", "1 [[illusion:class]]"],
    id: 1,
    images: {
      compressed: "/images/cards/abundance.jpg",
      full: "/images/cards/abundance.png",
      thumbnail: "/images/cards/abundance-slice.jpg"
    },
    name: "Abundance",
    placement: "Spellboard",
    stub: "abundance",
    text: [
      {
        cost: ["[[main]]", "[[exhaust]]"],
        text: "Draw and stuff"
      },
      {
        name: "Focus 1",
        text:
          "Reduce the damage your Phoenixborn receives from this spell by 1."
      },
      {
        name: "Focus 2",
        text:
          "Reduce the damage your Phoenixborn receives from this spell by an additional 1."
      }
    ],
    type: "Ready Spell"
  }
]
