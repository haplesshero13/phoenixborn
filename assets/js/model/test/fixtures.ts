import allTheCards from "../../../../priv/cards.json"
import { IStringMap } from "../DeckImporter"

export { allTheCards }

export const cardMap: IStringMap = Object.assign(
  {},
  ...allTheCards.cards.map(card => ({
    [card.name]: card.stub
  }))
)

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
  phoenixborn: "Jericho Kill",
  cards: {
    "changing-winds": 1,
    "chant-of-revenge": 3,
    "summon-shadow-spirit": 3,
    "summon-squall-stallion": 1,
    anchornaut: 1,
    "fire-archer": 3,
    "river-skald": 2,
    "blood-chains": 2,
    "double-edge": 3,
    "hand-tricks": 1,
    "hidden-power": 3,
    crescendo: 3,
    "final-cry": 2,
    "summon-sleeping-widows": 2,
    "shadow-spirit": 4,
    "sleeping-widow": 6,
    "squall-stallion": 5
  },
  dice: { ceremonial: 3, illusion: 3, sympathy: 4 }
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
