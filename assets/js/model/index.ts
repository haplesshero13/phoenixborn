import { cast, flow, types } from "mobx-state-tree"
import { get, post } from "../http"
import { ChatRoom, IChatRoom } from "./ChatRoom"
import { importDeck } from "./DeckImporter"

export { ChatRoom, IChatRoom }

export const Cost = types.union(types.string, types.array(types.string))

export const StringOrNumber = types.union(types.string, types.number)

export const Images = types.model({
  compressed: "",
  full: "",
  thumbnail: "",
})

export const CardText = types.model("CardText", {
  cost: types.array(Cost),
  text: types.string,
  name: types.maybe(types.string),
  inexhaustible: false,
  betweenRealms: false,
})

export const Card = types.model("Card", {
  id: 0,
  name: "",
  cost: types.maybe(types.array(Cost)),
  images: types.optional(Images, {}),
  placement: types.maybe(types.string),
  stub: "",
  text: types.array(CardText),
  type: "",
  attack: types.maybe(StringOrNumber),
  life: types.maybe(StringOrNumber),
  recover: types.maybe(StringOrNumber),
  phoenixborn: types.maybe(types.string),
  conjurations: types.maybe(types.array(types.string)),
  battlefield: types.maybe(StringOrNumber),
  spellboard: types.maybe(StringOrNumber),
})

export const NamedQuantity = types.model({
  qty: 0,
  name: "",
})

export const Deck = types
  .model("Deck", {
    phoenixborn: "",
    cards: types.array(NamedQuantity),
    dice: types.array(NamedQuantity)
  })

export const Model = types
  .model("Model", {
    cards: types.array(Card),
    lobby: types.optional(ChatRoom, {}),
    showCreateAccountModal: false,
    showLoginModal: false,
    showImportModal: false,
    username: "",
    password: "",
    decklist: "",
    parsedDeck: types.maybe(Deck),
    token: types.maybe(types.string),
  })
  .views(self => ({
    get usernameError() {
      return self.username.match(/^[^_]\w{2,19}$/)
        ? undefined
        : "Username must start with a letter or number and be between 3 and 20 characters"
    },
    get passwordError() {
      return 100 >= self.password.length && self.password.length >= 8
        ? undefined
        : "Password must be between 8 and 100 characters"
    },
    get cardList() {
      return self.cards.map((card) => (card.name))
    }
  }))
  .actions(self => ({
    fetchCards: flow(function* () {
      const response = yield get("/api/cards")

      self.cards = response.cards
    }),
    createAccount: flow(function* () {
      const { token } = yield post("/api/users", {
        user: {
          username: self.username,
          credential: { password: self.password },
        },
      })
      self.token = token
      self.lobby.token = token

      self.showCreateAccountModal = false
      self.username = ""
      self.password = ""
    }),

    login: flow(function* () {
      const { token } = yield post("/api/login", {
        username: self.username,
        password: self.password,
      })
      self.token = token
      self.lobby.token = token

      self.showLoginModal = false
      self.username = ""
      self.password = ""
    }),

    closeCreateAccountModal() {
      self.showCreateAccountModal = false
    },
    openCreateAccountModal() {
      self.showCreateAccountModal = true
    },
    closeLoginModal() {
      self.showLoginModal = false
    },
    openLoginModal() {
      self.showLoginModal = true
    },
    closeImportModal() {
      self.showImportModal = false
    },
    openImportModal() {
      self.showImportModal = true
    },
    onUsernameChange({ value }: { value: string }) {
      self.username = value
    },
    onPasswordChange({ value }: { value: string }) {
      self.password = value
    },
    onDecklistChange({ value }: { value: string }) {
      self.decklist = value
      self.parsedDeck = cast<typeof Deck.Type>(importDeck(self.cardList, self.decklist))
    },
  }))

export type IModel = typeof Model.Type
