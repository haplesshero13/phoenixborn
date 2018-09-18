// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "../css/app.css"
import "../elm/src/main.css"
import { Main } from "../elm/src/Main.elm"

Main.embed(document.getElementById('elm-root'));

