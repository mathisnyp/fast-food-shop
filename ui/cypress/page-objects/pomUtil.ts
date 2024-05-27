export const getElementByTestKey = (value: string) => {
  return cy.get(`[data-test-key=${value}]`)
}
