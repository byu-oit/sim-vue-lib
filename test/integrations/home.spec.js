const { home } = require('../globals/index.json')

describe('Home page', () => {
  it('can visit home page', () => {
    cy.visit(home)
  })
  it('can click to the example component', () => {
    cy.visit(home) // Visit home page
    cy.get('.v-app-bar__nav-icon').click() // get DOM element by CSS selector
    cy.contains('Atoms').click() // Get DOM element by text "Atoms"
    cy.contains('Example').click() // Get DOM element by text "Example"

    cy.url().should('include', '/atoms/example') // Current URL should include "/atoms/example"
  })
})
