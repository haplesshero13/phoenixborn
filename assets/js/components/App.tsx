import { Box, Button, Heading } from "gestalt"
import { observer } from "mobx-react"
import * as React from "react"
import { IModel } from "../model"
import Lobby from "./Lobby"
import LoginModal from "./LoginModal"
import SignUpModal from "./SignUpModal"

export default observer(({ model }: { model: IModel }) => (
  <Box>
    <Heading>Welcome to Phoenixborn!</Heading>
    <Box>
      <Button onClick={model.handleOpenCreateAccountModal} text="Sign Up" />
      <Button onClick={model.handleOpenLoginModal} text="Login" />
      {model.showCreateAccountModal && <SignUpModal model={model} />}
      {model.showLoginModal && <LoginModal model={model} />}
    </Box>
    <Lobby chatRoom={model.lobby} />
  </Box>
))
