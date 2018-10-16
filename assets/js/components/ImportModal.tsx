import { Box, Button, Modal, TextField } from "gestalt"
import { observer } from "mobx-react"
import * as React from "react"
import { IModel } from "../model"

export default observer(({ model }: { model: IModel }) => {
  const {
    decklist,
    onDecklistChange,
    closeImportModal,
    saveDecklist,
  } = model

  return (
    <Modal
      heading="Import Deck"
      accessibilityCloseLabel="close"
      accessibilityModalLabel="Import Deck"
      onDismiss={closeImportModal}
      size="md"
    >
      <Box padding={2}>
        <Box marginTop={2}>
          <TextField
            id="decklist-input"
            onChange={onDecklistChange}
            value={decklist}
            placeholder="Paste deck text from ashes.live"
            name="Import Decklist"
          />
        </Box>
        <Box marginTop={2}>
          <Button
            onClick={saveDecklist}
            text="Submit"
          />
        </Box>
        <Box marginTop={2}>
          <Button onClick={closeImportModal} text="Cancel" />
        </Box>
      </Box>
    </Modal>
  )
})
