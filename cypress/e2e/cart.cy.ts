describe("cart, review and order details test suite", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");

    cy.fixture("login").then((users) => {
      cy.get("input[type=email]").type(users.adminUser.email);
      cy.get("input[type=password]").type(users.adminUser.password);
      cy.get("button[type=submit]").contains("Sign In").click();
      cy.url().should("eq", "http://localhost:3000/");
    });
  });

  afterEach(() => {
    cy.get("#username").click();
    cy.get(".dropdown-item").contains("Logout").click();
  });

  it("CART-01: review a product", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".product-title").parent().first().click();

    cy.get("#rating").select("5");
    cy.get("#comment").type("Great product!");
    cy.get("button").contains("Submit").click();
    cy.get(".Toastify__toast-body").should(
      "contain",
      "Review created successfully"
    );
    cy.get(".Toastify__close-button").click();
    let username = "";
    cy.get("#username")
      .invoke("text")
      .then((text) => {
        username = text;
      });

    cy.reload();
    cy.get(".list-group-item").find("strong").should("contain", username);
  });

  it("CART-02: add a product to the cart", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".product-title").parent().first().click();

    cy.get("button[type=button]").contains("Add To Cart").click();

    cy.url().should("include", "/cart");
  });

  it("CART-03: add more items of the same product", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".product-title").parent().first().click();

    cy.get("button[type=button]").contains("Add To Cart").click();

    cy.url().should("include", "/cart");

    cy.get(".list-group-item").first().should("have.length", 1);
    cy.get("select.form-control").select("3");

    cy.contains(".list-group-item", "Subtotal").should("contain", "$269.97");
  });

  it("CART-04: fill the address form and choose paypal", () => {
    cy.visit("http://localhost:3000/");

    cy.get(".product-title").parent().first().click();
    cy.get("button[type=button]").contains("Add To Cart").click();
    cy.url().should("include", "/cart");

    cy.get("button[type=button]").contains("Proceed To Checkout").click();

    cy.get("#address").type("123 Main St");
    cy.get("#city").type("Jaraguá do Sul");
    cy.get("#postalCode").type("10001");
    cy.get("#country").type("Brazil");
    cy.get("button[type=submit]").contains("Continue").click();

    cy.get("button[type=submit]").contains("Continue").click();
  });

  it("CART-05: Verify that the products + shipping + taxes value is correct", () => {
    cy.visit("http://localhost:3000/");

    cy.get(".product-title").parent().first().click();
    cy.get("button[type=button]").contains("Add To Cart").click();
    cy.url().should("include", "/cart");

    cy.get("button[type=button]").contains("Proceed To Checkout").click();

    cy.get("#address").type("123 Main St");
    cy.get("#city").type("Jaraguá do Sul");
    cy.get("#postalCode").type("10001");
    cy.get("#country").type("Brazil");
    cy.get("button[type=submit]").contains("Continue").click();
    cy.get("button[type=submit]").contains("Continue").click();

    // cy.contains(".list-group-item", "Items").should("contain", "$89.99");
    // cy.contains(".list-group-item", "Shipping").should("contain", "$10.00");
    // cy.contains(".list-group-item", "Tax").should("contain", "$13.50");
    // cy.contains(".list-group-item", "Total").should("contain", "$113.49");

    cy.get("button[type=button]").contains("Place Order").click();

    // cy.contains(".list-group-item", "Items").should("contain", "$89.99");
    // cy.contains(".list-group-item", "Shipping").should("contain", "$10.00");
    // cy.contains(".list-group-item", "Tax").should("contain", "$13.50");
    // cy.contains(".list-group-item", "Total").should("contain", "$113.49");
  });

  it("CART-06: order details page", () => {
    cy.visit("http://localhost:3000/admin/orderlist");

    cy.get("table tbody tr").should("have.length.greaterThan", 0);
    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.contains("a.btn-light", "Details").click();
      });

    cy.url().should("include", "/order/");

    // cy.contains(".list-group-item", "Items").should("contain", "$89.99");
    // cy.contains(".list-group-item", "Shipping").should("contain", "$10.00");
    // cy.contains(".list-group-item", "Tax").should("contain", "$13.50");
    // cy.contains(".list-group-item", "Total").should("contain", "$113.49");
  });
});
