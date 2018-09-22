// tslint:disable-next-line:no-submodule-imports
import "gestalt/dist/gestalt.css"
import * as React from "react"
import ReactDOM from "react-dom"
import "../css/app.css"
import App from "./components/App"
import { Model } from "./model"
import socket from "./socket"

const init = () => {
  const model = Model.create({ cards: [] }, { socket })

  model.fetchCards()

  return model
}

const initialModel = init()

ReactDOM.render(<App model={initialModel} />, document.getElementById("root"))
