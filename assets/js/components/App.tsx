import { Box, Button, Heading, Text } from "gestalt"
import { observer } from "mobx-react"
import * as React from "react"
import { IModel } from "../model"
import Lobby from "./Lobby"
import SignUpModal from "./SignUpModal"
import LoginModal from "./LoginModal";

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
    <Heading size="sm">Here are some cards!</Heading>
    {model.cards.map((card, i) => (
      <Box key={i}>
        <Text>{card.name}</Text>
      </Box>
    ))}
  </Box>
))
