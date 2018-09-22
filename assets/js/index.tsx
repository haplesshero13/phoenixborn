// tslint:disable-next-line:no-submodule-imports
import "gestalt/dist/gestalt.css"
import { observer } from "mobx-react"
import * as React from "react"
import ReactDOM from "react-dom"
import "../css/app.css"
import Lobby from "./Lobby"
import { IModel, Model } from "./model"
import socket from "./socket"

const init = () => {
  const model = Model.create({ cards: [] }, { socket })

  model.fetchCards()

  return model
}

const App = observer(({ model }: { model: IModel }) => (
  <div>
    <Lobby chatRoom={model.lobby} />
    <h1>Here are some cards!</h1>
    {model.cards.map((card, i) => (
      <div key={i}>{card.name}</div>
    ))}
  </div>
))

const initialModel = init()

ReactDOM.render(<App model={initialModel} />, document.getElementById("root"))
