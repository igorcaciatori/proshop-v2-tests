describe("login test suite", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("LOGIN-01: should fail login with invalid password", () => {
    cy.fixture("login").then((users) => {
      cy.get("input[type=email]").type(users.invalidPasswordUser.email);
      cy.get("input[type=password]").type(users.invalidPasswordUser.password);
      cy.get("button[type=submit]").contains("Sign In").click();
      cy.get(".Toastify__toast-body").should(
        "contain",
        "Invalid email or password"
      );
    });
  });

  it("LOGIN-02: should fail login with invalid email", () => {
    cy.fixture("login").then((users) => {
      cy.get("input[type=email]").type(users.invalidEmailUser.email);
      cy.get("input[type=password]").type(users.invalidEmailUser.password);
      cy.get("button[type=submit]").contains("Sign In").click();
      cy.get(".Toastify__toast-body").should(
        "contain",
        "Invalid email or password"
      );
    });
  });

  it("LOGIN-03: should login with valid credentials", () => {
    cy.fixture("login").then((users) => {
      cy.get("input[type=email]").type(users.validUser.email);
      cy.get("input[type=password]").type(users.validUser.password);
      cy.get("button[type=submit]").contains("Sign In").click();
      cy.url().should("eq", "http://localhost:3000/");
    });
  });
});
