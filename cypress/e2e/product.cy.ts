describe("product test suite", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");

    cy.fixture("login").then((users) => {
      cy.get("input[type=email]").type(users.adminUser.email);
      cy.get("input[type=password]").type(users.adminUser.password);
      cy.get("button[type=submit]").contains("Sign In").click();
      cy.url().should("eq", "http://localhost:3000/");
    });

    cy.visit("http://localhost:3000/admin/productlist");
  });

  afterEach(() => {
    cy.get("#username").click();
    cy.get(".dropdown-item").contains("Logout").click();
  });

  it("PRODUCT-01: create new product", () => {
    cy.on("window:confirm", () => true);
    cy.get("button").contains("Create Product").click();
  });

  it("PRODUCT-02: edit product fields", () => {
    cy.get("tr")
      .contains("Sample name")
      .first()
      .parent()
      .within(() => {
        cy.get("a.btn-light").click();
      });

    cy.get("#name").clear();
    cy.get("#name").type("Changed name");

    cy.get("#price").clear();
    cy.get("#price").type("99.99");

    cy.get("#brand").clear();
    cy.get("#brand").type("Changed brand");

    cy.get("#countInStock").clear();
    cy.get("#countInStock").type("10");

    cy.get("#category").clear();
    cy.get("#category").type("Changed category");

    cy.get("#description").clear();
    cy.get("#description").type("Changed description");

    cy.get("button[type=submit]").contains("Update").click();
    cy.get(".Toastify__toast-body").should("contain", "Product updated");
    cy.get(".Toastify__close-button").click();
  });

  it("PRODUCT-03: try to put negative values in price and count in stock", () => {
    cy.get("tr")
      .contains("Changed name")
      .first()
      .parent()
      .within(() => {
        cy.get("a.btn-light").click();
      });

    cy.get("#price").clear();
    cy.get("#price").type("-99.99");

    cy.get("#countInStock").clear();
    cy.get("#countInStock").type("-10");

    cy.get("button[type=submit]").contains("Update").click();
    cy.get(".Toastify__toast-body").should(
      "contain",
      "Price can not be negative"
    );
    cy.get(".Toastify__close-button").click();
    cy.get(".Toastify__close-button").click();
  });

  it("PRODUCT-04: delete the new product from the admin product list", () => {
    cy.on("window:confirm", () => true);

    cy.get("tr")
      .contains("Changed name")
      .parent()
      .within(() => {
        cy.get("button.btn-danger").click();
      });

    cy.reload();  

    cy.get("tr").contains("Changed name").should("not.exist");
  });
});
