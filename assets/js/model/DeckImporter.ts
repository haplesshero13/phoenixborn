export interface IStringMap {
  [key: string]: string
}

export interface IDeck {
  phoenixborn: string
  cards: {
    [key: string]: number
  }
  dice: {
    [key: string]: number
  }
}

export const diceMap = {
  Illusion: "illusion",
  Sympathy: "sympathy",
  Ceremonial: "ceremonial",
  Nature: "nature",
  Divine: "divine",
  Charm: "charm"
}

const nameToStub = (map: IStringMap) => (line: string) => {
  const quantity = parseInt(line.split(/x(.+)/)[0], 10)
  const cardName = line
    .split(/x(.+)/)[1]
    .replace(/ *\([^)]*\) */g, "")
    .trim()

  return !!map[cardName] ? { [map[cardName]]: quantity } : {}
}

const parseWithMap = (map: IStringMap, deck: string) =>
  deck
    .split("\n")
    .filter(str => str.match(/\dx/))
    .map(nameToStub(map))

const parsePhoenixBorn = (deck: string) =>
  deck
    .split("\n")
    .filter(str => str.match(/Phoenixborn: /))[0]
    .trim()
    .split("Phoenixborn: ")
    .filter(s => s)[0]

export const importDeck = (cardMap: IStringMap, deck: string): IDeck => {
  return {
    phoenixborn: parsePhoenixBorn(deck),
    cards: Object.assign({}, ...parseWithMap(cardMap, deck)),
    dice: Object.assign({}, ...parseWithMap(diceMap, deck))
  }
}
