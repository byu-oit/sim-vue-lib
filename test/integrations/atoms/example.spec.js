const { atoms } = require('../../globals/index.json')

describe('Example', () => {
  it('can visit example page', () => {
    cy.visit(`${atoms}/example`)
    expect(true).to.equal(true)
  })
})
