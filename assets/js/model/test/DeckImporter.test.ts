import chai, { expect } from "chai"
import "mocha"
import { importDeck } from "../DeckImporter"
import { cardMap, jerichoDeck, jerichoString } from "./fixtures"

chai.config.truncateThreshold = 0

describe("DeckImporter", () => {
  describe("importer", () => {
    it("uses card data to generate a Deck", () => {
      const fakeCardMap = {
        "Awesome Unit": "awesome-unit",
        "Lame Card": "lame-card",
        "Sweet Spell": "sweet-spell"
      }
      const deckString = `
      Phoenixborn: Magick Personne
      2x Awesome Unit (Special Card!)
      1x Sweet Spell
      Ignore this line (123)
      3x Illusion
      `
      const deck = importDeck(fakeCardMap, deckString)

      expect(deck).to.deep.equal({
        phoenixborn: "Magick Personne",
        dice: { illusion: 3 },
        cards: { "awesome-unit": 2, "sweet-spell": 1 }
      })

      const jerichoImport = importDeck(cardMap, jerichoString)
      expect(jerichoImport).to.deep.equal(jerichoDeck)
    })
  })
})
