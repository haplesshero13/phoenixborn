import { Box, Button, Modal, TextField } from "gestalt"
import { observer } from "mobx-react"
import * as React from "react"
import { IModel } from "../model"

export default observer(({ model }: { model: IModel }) => (
  <Modal
    heading="Login"
    accessibilityCloseLabel="close"
    accessibilityModalLabel="Login"
    onDismiss={model.handleCloseLoginModal}
    size="md"
  >
    <Box padding={2}>
      <Box marginTop={2}>
        <TextField
          id="login-username"
          onChange={model.handleUsernameChange}
          value={model.username}
          placeholder="Username"
          name="Login Username"
        />
      </Box>
      <Box marginTop={2}>
        <TextField
          id="login-password"
          onChange={model.handlePasswordChange}
          value={model.password}
          type="password"
          placeholder="Password"
          name="Login Password"
        />
      </Box>
      <Box marginTop={2}>
        <Button
          onClick={model.login}
          text="Submit"
        />
      </Box>
      <Box marginTop={2}>
        <Button onClick={model.handleCloseLoginModal} text="Cancel" />
      </Box>
    </Box>
  </Modal>
))
