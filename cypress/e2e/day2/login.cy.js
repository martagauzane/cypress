/// <reference types="cypress" />

describe('day 2 login', () => {
  beforeEach(() => {
    cy.visit('/')
    //cy.get('[data-test="username"]').type('standard_user')
    //cy.get('[data-test="password"]').type('secret_sauce')
    //cy.get('[data-test="login-button"]').click('')
})

  it('logs in with a valid user', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click('')
    cy.get('[data-test="inventory-item"]').should('have.length', 6)
    })

  it('shows an error for a wrong passward', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('wrong_password')
    cy.get('[data-test="login-button"]').click('')
    cy.get('[data-test="error"]').should('have.text', 
        'Epic sadface: Username and password do not match any user in this service')
    })
    
  it('shows an error when fealds are empty', () => {
    cy.get('[data-test="login-button"]').click('')
    cy.get('[data-test="error"]').should('have.text', 
        'Epic sadface: Username is required')
    })

  it('close the error message with the X button', () => {
    cy.get('[data-test="login-button"]').click('')
    cy.get('[data-test="error"]').should('be.visible')
    cy.get('[data-test="error-button"]').click('')
    cy.get('[data-test="error"]').should('not.exist')
    })
    
  it('NEW in cypress 16.2: cy.getByRo', () => {
    cy.getByRole('textbox', {name: 'Username'}).type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click('')
    cy.get('[data-test="inventory-item"]').should('have.length', 6)
    })

})