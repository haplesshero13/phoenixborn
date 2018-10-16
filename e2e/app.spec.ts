Feature("Phoenixborn")

Scenario("Ash and Raven use Phoenixborn", I => {
  I.amOnPage("/")

  I.click("Sign Up")
  I.waitForElement("#create-account-username", 1)
  I.fillField("#create-account-username", "Ash")
  I.fillField("#create-account-password", "superSekrit")
  I.click("Join")
  I.waitForInvisible("#create-account-username", 1)

  I.click("Login")
  I.waitForElement("#login-username", 1)
  I.fillField("#login-username", "Ash")
  I.fillField("#login-password", "superSekrit")
  I.click("Submit")

  session("Raven", () => {
    I.amOnPage("/")
    I.dontSee("Ash: Hello, are you there?")
  })

  I.fillField("Message", "Hello, are you there?")
  I.pressKey("Enter")
  I.waitForText("Ash: Hello, are you there?", 1)

  session("Raven", () => {
    I.waitForText("Ash: Hello, are you there?", 1)
  })

  I.click("Import Deck")

  I.fillField("Deck Name", "Jericho Widowmaker")
  I.fillField("Decklist",
    `Phoenixborn: Jericho Kill

Dice:
3x Ceremonial
3x Illusion
4x Sympathy

Cards (30/30):

Ready Spells (8):
1x Changing Winds
3x Chant of Revenge
3x Summon Shadow Spirit
1x Summon Squall Stallion`
  )

  I.click("Import")

  within("#decks", () => {
    I.see("Jericho Widowmaker (Jericho Kill)")
    I.seeNumberOfVisibleElements(".ceremonial-die", 3)
    I.seeNumberOfVisibleElements(".illusion-die", 3)
    I.seeNumberOfVisibleElements(".sympathy-die", 4)
  })
})
