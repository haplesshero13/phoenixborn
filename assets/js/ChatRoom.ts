import { getEnv, types } from "mobx-state-tree"
import { Channel } from "phoenix"

interface IInputArgs {
  value: string
}

export const ChatRoom = types
  .model({
    messages: types.optional(types.array(types.string), []),
    inputValue: "",
  })
  .actions((self) => ({
    handleNewMsg(payload: { body: string }) {
      self.messages.push(payload.body)
    },
    handleInputChange({ value }: IInputArgs) {
      self.inputValue = value
    },
  }))
  .actions((self) => {
    let lobby: Channel

    const afterCreate = () => {
      if (getEnv(self).socket) {
        lobby = getEnv(self).socket.channel("room:lobby")
        lobby.join()
        lobby.on("new_msg", self.handleNewMsg)
      }
    }
    const handleInputSubmit = (event: { preventDefault: VoidFunction }) => {
      event.preventDefault()

      lobby.push("new_msg", { body: self.inputValue })
      self.inputValue = ""
    }

    return {
      afterCreate,
      handleInputSubmit,
    }
  })

export type IChatRoom = typeof ChatRoom.Type
