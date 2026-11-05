class InventoryPage {
  elements = {
    title: () => cy.get('[data-test="title"]'),
    items: () => cy.get('[data-test="inventory-item"]'),
    sort: () => cy.get('[data-test="product-sort-container"]'),
    cartBadge: () => cy.get('[data-test="shopping-cart-badge"]'),
    cartLink: () => cy.get('[data-test="shopping-cart-link"]'),
  }

  shouldBeOpen() {
    cy.url().should('include', '/inventory.html')
    this.elements.title().should('have.text', 'Products')
  }

  addToCart(productName) {
    cy.contains('[data-test="inventory-item"]', productName).find('button').click()
  }

  shouldHaveCartCount(count) {
    this.elements.cartBadge().should('have.text', String(count))
  }

  openCart() {
    this.elements.cartLink().click()
  }
}

export default new InventoryPage()