import { Given } from "cypress-cucumber-preprocessor/steps"

Given("the main page is opened", () => {
  cy.visit("/")
})
