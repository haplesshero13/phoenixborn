import { expect } from "chai"
import "mocha"
import { importer } from "../DeckImporter"

describe("DeckImporter", () => {
  describe("importer", () => {
    it("uses the map of ID to name to generate a Deck", () => {
      const cardMap = { 1: "Awesome Unit", 2: "Lame Card", 3: "Sweet Spell" }
      const deckString = `2x Awesome Unit
      1x Sweet Spell
      `
      const deck = importer(cardMap)(deckString)

      expect(deck).to.equal({ dice: [], 1: 2, 3: 1 })
    })
  })
})
