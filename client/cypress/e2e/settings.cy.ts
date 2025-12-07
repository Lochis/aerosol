/// <reference types="cypress" />

describe("Settings E2E", () => {
  it("applies theme on click and persists", () => {
    // authenticate first
    cy.visit("http://localhost:3001/auth");

    cy.screenshot("1. before-login");
    cy.wait(2000); // wait for recording
    cy.get('[data-testid="login-tab"]').click();
    cy.get('[data-testid="login-email"]').type("lucas@gmail.com");
    cy.get('[data-testid="login-password"]').type("Lucas123!");
    cy.get('[data-testid="login-submit"]').click();
    cy.screenshot("2. after-login");

    // got to settings page
    cy.get('[data-testid="avatar-button"]').click();
    cy.get('[data-testid="settings-link"]').click();
    cy.wait(2000); // wait for recording
    cy.screenshot("3. on-settings-page");

    // change theme
    cy.get('[data-testid="cupcake-theme"]').click();
    cy.wait(2000); // wait for recording
    cy.screenshot("4. after-theme-change");

    cy.get("html").should("have.attr", "data-theme", "cupcake");
    cy.window()
      .its("localStorage")
      .invoke("getItem", "theme")
      .should("eq", "cupcake");

    // making sure it persists after reload
    cy.reload();
    cy.get("html").should("have.attr", "data-theme", "cupcake");
    cy.wait(2000); // wait for recording
    cy.screenshot("5. after-reload");
  });
});
