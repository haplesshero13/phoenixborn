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
})
