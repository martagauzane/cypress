/// <reference types="cypress" />

describe('saucedemo - first test', () => {
  beforeEach(() => {
     
})

  it('logs in with valid user and sees the Products page', () => {
    cy.visit('/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click('')

    cy.get('[data-test="title"]').should('have.text', 'Products')
    cy.url().should('include', '/inventory.html')
    })
})

