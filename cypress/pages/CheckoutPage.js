class CheckoutPage {
  elements = {
    firstName: () => cy.get('[data-test="firstName"]'),
    lastName: () => cy.get('[data-test="lastName"]'),
    postalCode: () => cy.get('[data-test="postalCode"]'),
    continueButton: () => cy.get('[data-test="continue"]'),
    finishButton: () => cy.get('[data-test="finish"]'),
    itemTotal: () => cy.get('[data-test="subtotal-label"]'),
    completeHeader: () => cy.get('[data-test="complete-header"]'),
    error: () => cy.get('[data-test="error"]'),
  }

  fillInformation({ firstName, lastName, postalCode }) {
    if (firstName) this.elements.firstName().type(firstName)
    if (lastName) this.elements.lastName().type(lastName)
    if (postalCode) this.elements.postalCode().type(postalCode)
    this.elements.continueButton().click()
  }

  shouldHaveItemTotal(amount) {
    this.elements.itemTotal().should('have.text', `Item total: $${amount}`)
  }

  finish() {
    this.elements.finishButton().click()
  }

  shouldBeComplete() {
    cy.url().should('include', '/checkout-complete.html')
    this.elements.completeHeader().should('have.text', 'Thank you for your order!')
  }
}

export default new CheckoutPage()