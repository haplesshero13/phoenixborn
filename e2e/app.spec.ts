Feature('Phoenixborn')

Scenario('Ash and Raven use Phoenixborn', (I) => {
  I.amOnPage("/")

  session("Raven", () => {
    I.amOnPage("/")
    I.dontSee("Hello, are you there?")
  })

  I.fillField("Message", "Hello, are you there?")
  I.pressKey("Enter")
  I.waitForText("Hello, are you there?", 1)

  session("Raven", () => {
    I.waitForText("Hello, are you there?", 1)
  })
})
