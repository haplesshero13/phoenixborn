import { Box, Heading, Label, Text, TextField } from "gestalt"
import { observer } from "mobx-react"
import * as React from "react"
import { IChatRoom } from "../model"

export default observer(({ chatRoom }: { chatRoom: IChatRoom }) => (
  <Box>
    <Heading size="sm">Lobby Chat</Heading>
    {chatRoom.messages.map((msg, i) => (
      <Text key={i}>{msg}</Text>
    ))}
    <form onSubmit={chatRoom.handleInputSubmit}>
      <Box marginBottom={2} marginTop={2}>
        <Label htmlFor="lobby-chat-input">
          <Text>Message</Text>
        </Label>
      </Box>
      <TextField
        id="lobby-chat-input"
        onChange={chatRoom.handleInputChange}
        value={chatRoom.inputValue}
      />
    </form>
  </Box>
))
