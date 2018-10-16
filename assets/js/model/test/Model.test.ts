import chai, { expect } from "chai"
import fetchMock from "fetch-mock"
import { getSnapshot } from "mobx-state-tree"
import "mocha"
import sinonChai from "sinon-chai"
import { Model } from "../"
import { cards } from "./fixtures"

chai.use(sinonChai)

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

  describe("createAccount", () => {
    it("POSTs a new user account and closes the modal", async () => {
      fetchMock.postOnce("/api/users", { token: "you did it!" })

      const model = Model.create({
        username: "ValidUsername",
        password: "GreatPassword",
      })

      await model.createAccount()

      const [, request] = fetchMock.lastCall("/api/users")

      expect(JSON.parse(request.body as string)).to.deep.equal({
        user: {
          username: "ValidUsername",
          credential: { password: "GreatPassword" },
        },
      })
      expect(model.showCreateAccountModal).to.be.false
      expect(model.username).to.equal("")
      expect(model.password).to.equal("")
      expect(model.token).to.equal("you did it!")
      expect(model.lobby.token).to.equal("you did it!")
    })
  })

  describe("login", () => {
    it("it POSTs to login endpoint and sets the token on the Lobby chat", async () => {
      fetchMock.postOnce("/api/login", { token: "you did it!" })

      const model = Model.create({
        username: "ValidUsername",
        password: "GreatPassword",
      })

      await model.login()

      const [, request] = fetchMock.lastCall("/api/login")

      expect(JSON.parse(request.body as string)).to.deep.equal({
        username: "ValidUsername",
        password: "GreatPassword",
      })
      expect(model.showLoginModal).to.be.false
      expect(model.username).to.equal("")
      expect(model.password).to.equal("")
      expect(model.token).to.equal("you did it!")
      expect(model.lobby.token).to.equal("you did it!")
    })
  })

  describe("usernameError", () => {
    describe("if the username does not start with a letter or number", () => {
      it("returns an error message", () => {
        const excitingUsername = Model.create({ username: "!!!" })

        expect(excitingUsername.usernameError).to.be.a("string")
      })
    })

    describe("if the username is not between 3 and 20 characters long", () => {
      it("returns an error message", () => {
        const shortUsername = Model.create({ username: "ab" })
        const longUsername = Model.create({ username: "123456789012345678901" })

        expect(shortUsername.usernameError).to.be.a("string")
        expect(longUsername.usernameError).to.be.a("string")
      })
    })

    describe("if the username is valid", () => {
      it("returns undefined", () => {
        const validUsername = Model.create({ username: "abc_123" })

        expect(validUsername.usernameError).to.be.undefined
      })
    })
  })

  describe("passwordError", () => {
    describe("if the password is too short or too long", () => {
      it("returns an error message", () => {
        const shortPassword = Model.create({ password: "!!!" })
        const longPassword = Model.create({ password: "x".repeat(101) })

        expect(shortPassword.passwordError).to.be.a("string")
        expect(longPassword.passwordError).to.be.a("string")
      })
    })

    describe("if the password is valid", () => {
      it("returns undefined", () => {
        const validPassword = Model.create({ password: "abc_123!!!" })

        expect(validPassword.passwordError).to.be.undefined
      })
    })
  })

  describe('onDecklistChange', () => {
    it('parses the value of the decklist input', () => {
      const model = Model.create({
        cards: [{ name: "Auto-Win" }]
      })

      model.onDecklistChange({
        value: `Phoenixborn: LOL
        3x Auto-Win`
      })

      expect(getSnapshot(model).parsedDeck).to.deep.equal(
        {
          phoenixborn: 'LOL',
          cards: [{ qty: 3, name: 'Auto-Win' }],
          dice: []
        }
      )
    })
  })
})
