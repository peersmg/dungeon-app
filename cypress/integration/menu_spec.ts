/// <reference types="Cypress" />

describe("Menu options", function() {
  it("should show begin game button on menu", function() {
    cy.visit("http://localhost:3000/");

    cy.contains("Begin Game");
  });
});
