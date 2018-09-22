import { flow, types } from "mobx-state-tree"
import { get, post } from "../http"
import { ChatRoom, IChatRoom } from "./ChatRoom"

export { ChatRoom, IChatRoom }

export const Cost = types.union(types.string, types.array(types.string))

export const StringOrNumber = types.union(types.string, types.number)

export const Images = types.model({
  compressed: types.string,
  full: types.string,
  thumbnail: types.string,
})

export const CardText = types.model({
  cost: types.array(Cost),
  text: types.string,
  name: types.maybe(types.string),
  inexhaustible: false,
  betweenRealms: false,
})

export const Card = types.model({
  id: types.number,
  name: types.string,
  cost: types.maybe(types.array(Cost)),
  images: Images,
  placement: types.maybe(types.string),
  stub: types.string,
  text: types.array(CardText),
  type: types.string,
  attack: types.maybe(StringOrNumber),
  life: types.maybe(StringOrNumber),
  recover: types.maybe(StringOrNumber),
  phoenixborn: types.maybe(types.string),
  conjurations: types.optional(types.array(types.string), []),
  battlefield: types.maybe(StringOrNumber),
  spellboard: types.maybe(StringOrNumber),
})

export const Model = types
  .model("Model", {
    cards: types.array(Card),
    lobby: types.optional(ChatRoom, {}),
    showCreateAccountModal: false,
    showLoginModal: false,
    username: "",
    password: "",
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
  }))
  .actions(self => ({
    fetchCards: flow(function*() {
      const response = yield get("/api/cards")

      self.cards = response.cards
    }),
    createAccount: flow(function*() {
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

    login: flow(function*() {
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

    handleCloseCreateAccountModal() {
      self.showCreateAccountModal = false
    },
    handleOpenCreateAccountModal() {
      self.showCreateAccountModal = true
    },
    handleCloseLoginModal() {
      self.showLoginModal = false
    },
    handleOpenLoginModal() {
      self.showLoginModal = true
    },
    handleUsernameChange({ value }: { value: string }) {
      self.username = value
    },
    handlePasswordChange({ value }: { value: string }) {
      self.password = value
    },
  }))

export type IModel = typeof Model.Type
