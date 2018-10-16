import chai, { expect } from "chai"
import "mocha"
import { importDeck } from "../DeckImporter"
import { cardList, jerichoDeck, jerichoString } from "./fixtures"

chai.config.truncateThreshold = 0

describe("DeckImporter", () => {
  describe("importer", () => {
    it("uses card data to generate a Deck", () => {
      const fakeCardList = [
        "Awesome Unit",
        "Lame Card",
        "Sweet Spell",
      ]
      const deckString = `
      Phoenixborn: Magick Personne
      2x Awesome Unit (Special Card!)
      1x Sweet Spell
      Ignore this line (123)
      3x Illusion
      `
      const deck = importDeck(fakeCardList, deckString)

      expect(deck).to.deep.equal({
        phoenixborn: 'Magick Personne',
        cards:
          [{ name: 'Awesome Unit', qty: 2 },
          { name: 'Sweet Spell', qty: 1 }],
        dice: [{ name: 'Illusion', qty: 3 }]
      })

      const jerichoImport = importDeck(cardList, jerichoString)
      expect(jerichoImport).to.deep.equal(jerichoDeck)
    })
  })
})
