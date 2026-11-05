/// <reference types="cypress" />

describe('day 2 inventory', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click('')
})

  it('shows 6 products, each with name and price', () => {
    cy.get('[data-test="inventory-item"]').should('have.length', 6).each(($item) => {
        cy.wrap($item).within(() => {
            cy.get('[data-test="inventory-item-name"]').should('not.be.empty')
            cy.get('[data-test="inventory-item-price"]').should('contain', '$')
        })
    })
  })

  it('sorts products by price: low to high', () => {
    cy.get('[data-test="product-sort-container"]').select('lohi')
    cy.get('[data-test="active-option"]').should('have.text', 'Price (low to high)')

    cy.get('[data-test="inventory-item-price"]').then(($prices) => {
      const prices = [...$prices].map((el) => Number(el.innerText.replace('$', '')))
      const sorted = [...prices].sort((a, b) => a - b)
      expect(prices).to.deep.equal(sorted)
    })
  })

  it('sorts products by name: Z to A', () => {
    cy.get('[data-test="product-sort-container"]').select('Name (Z to A)')
    cy.get('[data-test="inventory-item-name"]').first().should('have.text', 'Test.allTheThings() T-Shirt (Red)')
    cy.get('[data-test="inventory-item-name"]').last().should('have.text', 'Sauce Labs Backpack')
  })

  it('adds and removes items - the cart badge updates', () => {
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist')

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2')

    cy.get('[data-test="remove-sauce-labs-backpack"]').click()
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')
  })

  it('finds a product by its text with cy.contains', () => {
    cy.contains('[data-test="inventory-item"]', 'Fleece Jacket').within(() => {
      cy.get('[data-test="inventory-item-price"]').should('have.text', '$49.99')
      cy.contains('button', 'Add to cart').click()
      cy.contains('button', 'Remove').should('be.visible')
    })
  })


})