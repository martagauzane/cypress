// Day 3: custom commands

// Login through the UI (slow, but tests the real login form)
Cypress.Commands.add('loginUI', (username = 'standard_user', password = 'secret_sauce') => {
  cy.visit('/')
  cy.get('[data-test="username"]').type(username)
  cy.get('[data-test="password"]').type(password, { log: false })
  cy.get('[data-test="login-button"]').click()
})

// Login once, then reuse the session (cookies + localStorage) between tests
Cypress.Commands.add('login', (username = 'standard_user') => {
  cy.session(username, () => {
    cy.loginUI(username)
    cy.url().should('include', '/inventory.html')
  })
})

// Login without UI: SauceDemo keeps the logged-in user in a cookie
Cypress.Commands.add('loginByCookie', (username = 'standard_user') => {
  cy.setCookie('session-username', username)
})