import chai, { expect } from "chai"
import { getSnapshot } from "mobx-state-tree"
import "mocha"
import sinon from "sinon"
import sinonChai from "sinon-chai"
import { ChatRoom } from "../ChatRoom"

chai.use(sinonChai)

describe("ChatRoom", () => {
  let channel: sinon.SinonStub
  let lobby: {
    on: sinon.SinonSpy
    push: sinon.SinonSpy
    join: sinon.SinonSpy
  }
  let socket: { channel: sinon.SinonStub }

  beforeEach(() => {
    channel = sinon.stub()
    lobby = { on: sinon.spy(), push: sinon.spy(), join: sinon.spy() }
    channel.withArgs("room:lobby").returns(lobby)

    socket = { channel }
  })

  describe("afterCreate", () => {
    it("connects to the socket and joins the lobby", () => {
      const chatRoom = ChatRoom.create({}, { socket })

      expect(lobby.on).to.have.been.calledWith("new_msg", chatRoom.handleNewMsg)
      expect(lobby.join).to.have.been.calledOnce
    })
  })

  describe("handleNewMsg", () => {
    it("appends the message to the list of messages", async () => {
      const chatRoom = ChatRoom.create({})

      chatRoom.handleNewMsg({ body: "Hello there! Fancy a game?" })

      expect(getSnapshot(chatRoom.messages)).to.deep.equal([
        "Hello there! Fancy a game?"
      ])
    })
  })

  describe("handleInputChange", () => {
    it("sets the inputValue to the incoming value", () => {
      const chatRoom = ChatRoom.create({})

      chatRoom.handleInputChange({ value: "Yes! I'm all fired up!" })

      expect(getSnapshot(chatRoom).inputValue).to.equal(
        "Yes! I'm all fired up!"
      )
    })
  })

  describe("handleInputSubmit", () => {
    it("sends the message to the channel and clears the input", () => {
      const chatRoom = ChatRoom.create(
        {
          inputValue: "I will start a game!"
        },
        { socket }
      )
      const preventDefault: VoidFunction = sinon.spy()

      chatRoom.handleInputSubmit({ preventDefault })

      expect(preventDefault).to.have.been.calledOnce
      expect(lobby.push).to.have.been.calledOnceWithExactly("new_msg", {
        body: "I will start a game!"
      })
      expect(chatRoom.inputValue).to.equal("")
    })
  })
})
