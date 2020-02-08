/// <reference types="Cypress" />

describe("Game screen content", function() {
  it("should show header and footer on game screen", function() {
    cy.visit("http://localhost:3000/");

    cy.contains("Begin Game").click();

    cy.contains("FPS:");
    cy.contains("Author:");
  });
});
