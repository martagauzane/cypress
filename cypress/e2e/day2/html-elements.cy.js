/// <reference types="cypress" />

// DAY 2 - typical HTML elements on the TDL School practice page

describe('Practice page - HTML elements', () => {
  beforeEach(() => {
    cy.visit('https://sea-turtle-app-phgrt.ondigitalocean.app/')
  })

  it('checkboxes', () => {
    cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
    cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
    cy.get('input[type="checkbox"]').check(['option2', 'option3'])
    cy.get('input[type="checkbox"]:checked').should('have.length', 2)
  })

  it('radio buttons', () => {
    cy.get('[value="radio1"]').check().should('be.checked')
    cy.get('[value="radio2"]').check().should('be.checked')
    cy.get('[value="radio1"]').should('not.be.checked')
  })

  it('dropdown', () => {
    cy.get('#dropdown-class-example').select('option2').should('have.value', 'option2')
    cy.get('#dropdown-class-example').select('Option3').should('have.value', 'option3')
  })

  it('autocomplete', () => {
    cy.get('#autocomplete').type('Lat')
    cy.get('.ui-menu-item').should('have.length', 1).click()
    cy.get('#autocomplete').should('have.value', 'Latvia')
  })

  it('hide / show element', () => {
    cy.get('#displayed-text').should('be.visible')
    cy.get('#hide-textbox').click()
    cy.get('#displayed-text').should('not.be.visible')
    cy.get('#show-textbox').click()
    cy.get('#displayed-text').should('be.visible')
  })

  it('alert - Cypress accepts it automatically, we just check the text', () => {
    cy.on('window:alert', (text) => {
      expect(text).to.contain('Hello Anna')
    })
    cy.get('#name').type('Anna')
    cy.get('#alertbtn').click()
  })

  it('confirm - we can choose Cancel', () => {
    cy.on('window:confirm', (text) => {
      expect(text).to.contain('Are you sure')
      return false // = click "Cancel"
    })
    cy.get('#confirmbtn').click()
  })

  it('new tab link - Cypress works in ONE tab, so we check the link instead', () => {
    cy.get('#opentab')
      .should('have.attr', 'target', '_blank')
      .and('have.attr', 'href', 'https://www.apple.com/')
  })

  it('mouse hover - hidden menu', () => {
    cy.get('.mouse-hover-content').should('not.be.visible')
    cy.get('.mouse-hover-content').invoke('show')
    cy.contains('.mouse-hover-content a', 'Top').should('be.visible')
  })
})