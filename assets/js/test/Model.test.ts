import chai, { expect } from "chai"
import fetchMock from "fetch-mock"
import { getSnapshot } from "mobx-state-tree"
import "mocha"
import sinon from "sinon"
import sinonChai from "sinon-chai"
import { Model } from "../Model"

chai.use(sinonChai)

const cards = [
  {
    cost: ["[[main]]", "1 [[illusion:class]]"],
    id: 1,
    images: {
      compressed: "/images/cards/abundance.jpg",
      full: "/images/cards/abundance.png",
      thumbnail: "/images/cards/abundance-slice.jpg",
    },
    name: "Abundance",
    placement: "Spellboard",
    stub: "abundance",
    text: [
      {
        cost: ["[[main]]", "[[exhaust]]"],
        text: "Draw and stuff",
      },
      {
        name: "Focus 1",
        text:
          "Reduce the damage your Phoenixborn receives from this spell by 1.",
      },
      {
        name: "Focus 2",
        text:
          "Reduce the damage your Phoenixborn receives from this spell by an additional 1.",
      },
    ],
    type: "Ready Spell",
  },
]

describe("Model", () => {
  describe("fetchCards", () => {
    it("GETs the cards from the API", async () => {
      fetchMock.getOnce("/api/cards", {
        cards,
      })

      const model = Model.create({ cards: [] })
      await model.fetchCards()

      expect(getSnapshot(model.cards)[0].name).to.equal("Abundance")
    })
  })
})
