/// <reference types="Cypress" />

describe("Menu options", function() {
  it("should show game when begin button clicked", function() {
    cy.visit("http://localhost:3000/");

    cy.contains("Begin Game").click();

    cy.contains("Dungeon Game!");
  });
});
