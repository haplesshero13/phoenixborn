import { Label, TextField } from "gestalt"
import { observer } from "mobx-react"
import * as React from "react"
import { IChatRoom } from "./model"

export default observer(({ chatRoom }: { chatRoom: IChatRoom }) => (
  <div>
    <h3>Lobby Chat</h3>
    {chatRoom.messages.map((msg, i) => (
      <p key={i}>{msg}</p>
    ))}
    <form onSubmit={chatRoom.handleInputSubmit}>
      <Label htmlFor="lobby-chat-input">Message</Label>
      <TextField
        id="lobby-chat-input"
        onChange={chatRoom.handleInputChange}
        value={chatRoom.inputValue}
      />
    </form>
  </div>
))
