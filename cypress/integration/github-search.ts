describe('GithubSearch', () => {

  function cacheFavoriteRepo(activateIcon: string): void {
    // test favorites repo
    cy.get('app-favorite').first().click();
    cy.get('app-favorite:first-child > mat-icon').contains(activateIcon);
    cy.reload();
    // favorites should be saved
    cy.get('input[name="search-field"]').should('be.visible').clear().type('test');
    cy.get('app-favorite:first-child > mat-icon').contains(activateIcon);
  }

  function testSearchResult(container, switchView = false): void {
    cy.visit('http://localhost:4200/');
    // header && search should be displayed
    cy.get('.header').should('be.visible');
    cy.get('.search-container').should('be.visible');
    cy.get('input[name="search-field"]').should('be.visible').clear().type('test');
    // switch between table and card view
    if (switchView) {
      cy.get('.switch').should('be.visible').click();
    }
    cy.get('.' + container).should('be.visible');
    cy.get('mat-paginator').scrollIntoView().should('be.visible');
    cy.get('app-favorite').should('be.visible');
    // test favorites repo
    cacheFavoriteRepo('favorite'); // added to favorite
    cacheFavoriteRepo('favorite_border'); // removed from favorite

    // clear case
    cy.get('input[name="search-field"]').clear();
    cy.get('.' + container).should('not.be.visible');
    cy.get('p.empty-data').should('be.visible');
  }

  describe('search', () => {
    it('should search for a given repos [table view]', () => {
      testSearchResult('searchResult');
    });

    it('should search for a given repos [card view]', () => {
      testSearchResult('cards__container', true);
    });
  });
});
