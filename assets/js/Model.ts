import { flow, types } from "mobx-state-tree"

const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
}

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
  .model({
    cards: types.array(Card),
  })
  .actions((self) => ({
    fetchCards: flow(function*() {
      const response = yield fetch("/api/cards", {
        headers,
      })
      const json = yield response.json()

      self.cards = json.cards
    }),
  }))

export type IModel = typeof Model.Type
