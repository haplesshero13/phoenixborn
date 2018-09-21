import { observer } from "mobx-react"
import * as React from "react"
import ReactDOM from "react-dom"
import "../css/app.css"
import { IModel, Model } from "./Model"

const init = () => {
  const model = Model.create({ cards: [] })

  model.fetchCards()

  return model
}

const App = observer(({ model }: { model: IModel }) => (
  <div>
    <h1>Here are some cards!</h1>
    {model.cards.map((card, i) => (
      <div key={i}>{card.name}</div>
    ))}
  </div>
))

const initialModel = init()

ReactDOM.render(<App model={initialModel} />, document.getElementById("root"))
