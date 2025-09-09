describe("user test suite", () => {
  it("USER-01: should fail registration with invalid email", () => {
    cy.visit("http://localhost:3000/register");
    cy.fixture("register").then((users) => {
      cy.get("input[type=name]").type(users.invalidEmailUser.name);
      cy.get("input[type=email]").type(users.invalidEmailUser.email);
      cy.get("#password").type(users.invalidEmailUser.password);
      cy.get("#confirmPassword").type(users.invalidEmailUser.confirmPassword);
      cy.get("button[type=submit]").contains("Register").click();
      cy.get("input[type=email]").then(($input) => {
        expect(($input[0] as HTMLInputElement).checkValidity()).to.be.false;
      });
    });
  });

  it("USER-02: should fail registration with invalid password", () => {
    cy.visit("http://localhost:3000/register");
    cy.fixture("register").then((users) => {
      cy.get("input[type=name]").type(users.invalidPasswordConfirmUser.name);
      cy.get("input[type=email]").type(users.invalidPasswordConfirmUser.email);
      cy.get("#password").type(users.invalidPasswordConfirmUser.password);
      cy.get("#confirmPassword").type(
        users.invalidPasswordConfirmUser.confirmPassword
      );
      cy.get("button[type=submit]").contains("Register").click();
      cy.get(".Toastify__toast-body").should(
        "contain",
        "Passwords do not match"
      );
    });
  });

  it("USER-03: should login with valid credentials", () => {
    cy.visit("http://localhost:3000/register");
    cy.fixture("register").then((users) => {
      cy.get("input[type=name]").type(users.validUser.name);
      cy.get("input[type=email]").type(users.validUser.email);
      cy.get("#password").type(users.validUser.password);
      cy.get("#confirmPassword").type(users.validUser.confirmPassword);
      cy.get("button[type=submit]").contains("Register").click();
      cy.url().should("eq", "http://localhost:3000/");
    });
  });

  it("USER-04: should update successfully their name", () => {
    cy.visit("http://localhost:3000");
    cy.get("body").then(($body) => {
      if ($body.find("#username").length === 0) {
        cy.visit("http://localhost:3000/login");
        cy.fixture("register").then((users) => {
          cy.get("input[type=email]").type(users.validUser.email);
          cy.get("input[type=password]").type(users.validUser.password);
          cy.get("button[type=submit]").contains("Sign In").click();
          cy.url().should("eq", "http://localhost:3000/");
        });
      }
    });

    cy.visit("http://localhost:3000/profile");

    cy.get("#name").clear();
    cy.get("#name").type("Changed");
    cy.get("button[type=submit]").contains("Update").click();

    cy.get(".Toastify__toast-body").should(
      "contain",
      "Profile updated successfully"
    );

    cy.get(".Toastify__close-button").click();
    cy.get("#username").click();
    cy.get(".dropdown-item").contains("Logout").click();
  });

  it("USER-05: should not have access to the admin dashboard", () => {
    cy.visit("http://localhost:3000/admin/productlist");
    cy.url().should("eq", "http://localhost:3000/login");

    cy.fixture("login").then((users) => {
      cy.get("input[type=email]").type(users.validUser.email);
      cy.get("input[type=password]").type(users.validUser.password);
      cy.get("button[type=submit]").contains("Sign In").click();
      cy.url().should("eq", "http://localhost:3000/");
    });

    cy.visit("http://localhost:3000/admin/productlist");
    cy.url().should("eq", "http://localhost:3000/");

    cy.get("#username").click();
    cy.get(".dropdown-item").contains("Logout").click();
  });

  it("USER-06: user must be in the admin user list", () => {
    cy.visit("http://localhost:3000/login");

    cy.fixture("login").then((users) => {
      cy.get("input[type=email]").type(users.adminUser.email);
      cy.get("input[type=password]").type(users.adminUser.password);
      cy.get("button[type=submit]").contains("Sign In").click();
      cy.url().should("eq", "http://localhost:3000/");
    });

    cy.visit("http://localhost:3000/admin/userlist");
    cy.get("td").contains("Changed").should("exist");

    cy.get("#username").click();
    cy.get(".dropdown-item").contains("Logout").click();
  });

  it("USER-07: delete the new user from the admin user list", () => {
    cy.visit("http://localhost:3000/login");

    cy.fixture("login").then((users) => {
      cy.get("input[type=email]").type(users.adminUser.email);
      cy.get("input[type=password]").type(users.adminUser.password);
      cy.get("button[type=submit]").contains("Sign In").click();
      cy.url().should("eq", "http://localhost:3000/");
    });

    cy.visit("http://localhost:3000/admin/userlist");
    cy.get("td").contains("Changed").should("exist");
    cy.on("window:confirm", () => true);
    cy.get("tr")
      .contains("Changed")
      .parent()
      .within(() => {
        cy.get("button.btn-danger").click();
      });
    cy.get("#username").click();
    cy.get(".dropdown-item").contains("Logout").click();
  });
});
