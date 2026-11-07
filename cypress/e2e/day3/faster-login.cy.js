/// <reference types="cypress" />

// DAY 3 - custom commands, cy.session and login WITHOUT the UI
const OPTS = { failOnStatusCode: false }

describe('Faster login', () => {
  it('custom command: cy.loginUI()', () => {
    cy.loginUI()
    cy.url().should('include', '/inventory.html')
  })

  it('cy.session: logs in once, then restores the session', () => {
    cy.login('standard_user')
    cy.visit('/inventory.html', OPTS)
    cy.get('[data-test="title"]').should('have.text', 'Products')
  })

  it('cy.session: second test reuses the cached session', () => {
    cy.login('standard_user')
    cy.visit('/cart.html', OPTS)
    cy.get('[data-test="title"]').should('have.text', 'Your Cart')
  })

  it('without UI: set the cookie and open the page directly', () => {
    cy.loginByCookie('standard_user')
    cy.visit('/inventory.html', OPTS)
    cy.get('[data-test="inventory-item"]').should('have.length', 6)
  })

  it('without login the inventory page is protected', () => {
    cy.visit('/inventory.html', OPTS)
    cy.get('[data-test="error"]').should('contain.text', 'You can only access')
  })
})