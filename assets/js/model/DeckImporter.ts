
export const diceList = [
  "Illusion",
  "Sympathy",
  "Ceremonial",
  "Nature",
  "Divine",
  "Charm",
]

const namedQuantity = (list: string[]) => (line: string) => {
  const qty = parseInt(line.split(/x(.+)/)[0], 10)
  const name = line
    .split(/x(.+)/)[1]
    .replace(/ *\([^)]*\) */g, "")
    .trim()

  return !!list.includes(name) ? { name, qty } : undefined
}

const parseWithList = (list: string[], deck: string) =>
  deck
    .split("\n")
    .filter(str => str.match(/\dx/))
    .map(namedQuantity(list))
    .filter(it => it !== undefined) as Array<{
      name: string
      qty: number
    }>

const parsePhoenixBorn = (deck: string) =>
  deck
    .split("\n")
    .filter(str => str.match(/Phoenixborn: /))[0]
    .trim()
    .split("Phoenixborn: ")
    .filter(s => s)[0]

export const importDeck = (cardList: string[], deck: string) => {
  return {
    phoenixborn: parsePhoenixBorn(deck),
    cards: parseWithList(cardList, deck),
    dice: parseWithList(diceList, deck)
  }
}
