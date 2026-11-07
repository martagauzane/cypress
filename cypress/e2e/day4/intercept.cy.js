/// <reference types="cypress" />

// DAY 4 - cy.intercept(): spy on and mock the requests the PAGE makes

describe('Network: spy and stub with cy.intercept', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/network-requests')
  })

  it('SPY: wait for the real request and check it', () => {
    cy.intercept('GET', '**/comments/*').as('getComment')

    cy.get('.network-btn').click()

    cy.wait('@getComment').then(({ request, response }) => {
      expect(request.method).to.eq('GET')
      expect(response.statusCode).to.eq(200)
      expect(response.body).to.have.property('email')
    })
    cy.get('.network-comment').should('not.be.empty')
  })

  it('STUB: replace the server answer with a fixture', () => {
    cy.intercept('GET', '**/comments/*', { fixture: 'comment.json' }).as('getComment')

    cy.get('.network-btn').click()
    cy.wait('@getComment')

    cy.get('.network-comment').should('contain', 'This response came from a fixture')
  })

  it('STUB: simulate a server error (hard to do manually!)', () => {
    cy.intercept('GET', '**/comments/*', { statusCode: 500, body: {} }).as('getComment')

    cy.get('.network-btn').click()

    cy.wait('@getComment').its('response.statusCode').should('eq', 500)
  })

  it('check what the page SENDS in a POST', () => {
    cy.intercept('POST', '**/comments').as('postComment')

    cy.get('.network-post').click()

    cy.wait('@postComment').then(({ request, response }) => {
      expect(request.body).to.include('email')
      expect(response.statusCode).to.eq(201)
    })
    cy.get('.network-post-comment').should('contain', 'POST successful!')
  })
})