import { Box, Button, Modal, TextField } from "gestalt"
import { observer } from "mobx-react"
import * as React from "react"
import { IModel } from "../model"

export default observer(({ model }: { model: IModel }) => (
  <Modal
    heading="Sign Up"
    accessibilityCloseLabel="close"
    accessibilityModalLabel="Sign Up"
    onDismiss={model.closeCreateAccountModal}
    size="md"
  >
    <Box padding={2}>
      <Box marginTop={2}>
        <TextField
          id="create-account-username"
          onChange={model.onUsernameChange}
          value={model.username}
          errorMessage={model.usernameError}
          idealErrorDirection="down"
          placeholder="Username"
          name="Sign Up Username"
        />
      </Box>
      <Box marginTop={2}>
        <TextField
          id="create-account-password"
          onChange={model.onPasswordChange}
          value={model.password}
          type="password"
          errorMessage={model.passwordError}
          idealErrorDirection="down"
          placeholder="Password"
          name="Sign Up Password"
        />
      </Box>
      <Box marginTop={2}>
        <Button
          disabled={!!model.passwordError || !!model.usernameError}
          onClick={model.createAccount}
          text="Join"
        />
      </Box>
      <Box marginTop={2}>
        <Button onClick={model.closeCreateAccountModal} text="Cancel" />
      </Box>
    </Box>
  </Modal>
))
