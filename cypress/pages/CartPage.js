class CartPage {
  elements = {
    itemNames: () => cy.get('[data-test="inventory-item-name"]'),
    checkoutButton: () => cy.get('[data-test="checkout"]'),
  }

  shouldContain(productNames) {
    this.elements.itemNames().should('have.length', productNames.length)
    productNames.forEach((name) => {
      this.elements.itemNames().should('contain', name)
    })
  }

  checkout() {
    this.elements.checkoutButton().click()
  }
}

export default new CartPage()