describe('AFazenda', () => {
  let countItem = 0;
  
  beforeEach(() => cy.visit('/'));

  it('Request of the list', () => {
    cy.request('fazenda.json')
      .then( resp => {
        const {body, status} = resp;
        
        expect(status).to.equal(200)
        expect(body.data).to.exist
        expect(body.data).not.to.be.empty

        countItem = body.data.length;
      })
  })

  it('List of person', () => {
    cy.get('.List__Body .Person').its('length').should('be.gte', countItem)
  })
});
