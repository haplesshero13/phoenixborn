// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "../css/app.css"
import "../elm/src/main.css"
import { Elm } from "../elm/src/Main.elm"

Elm.Main.init({
  node: document.getElementById('elm-root')
})
