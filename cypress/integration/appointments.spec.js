

//cy.request('http://localhost:8001/api/reset')
describe("Booking", () => {
  it("should reset the DB", () => {
    cy.request('http://localhost:8001/api/debug/reset')
  });
  it("should open the form", () => {
    cy.visit("/");
    cy.get(".appointment__add-button").click();
  });
  it("should get a name into the textbox", () => {
    cy.get("input").type('Bob')

  });
  it("should choose an interviewer", () => {
    cy.get("[alt='Sylvia Palmer']").click();

  });
  it("should click the save button", () => {
    cy.get("[class='button button--confirm']").click();

  });
  it("checks the appointment is made", () => {
    cy.contains("h2", "Bob")


  });

});

describe("Editing", () => {
  it("should reset the DB", () => {
    cy.request('http://localhost:8001/api/debug/reset')
  });
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should open the edit form", () => {
    cy.get('[alt="Edit"]').click({ force: true });
  });
  it("should type a new name into the textbox", () => {
    cy.get("input").clear();

    cy.get("input").type('Bobert Robert');
  });
  it("should choose a new interviewer", () => {
    cy.get("[alt='Tori Malcolm']").click();

  });
  it("should click the save button", () => {
    cy.get("[class='button button--confirm']").click();

  });
  it("checks the appointment is made", () => {
    cy.contains("h2", "Bobert Robert")


  });
});

describe("Deleting", () => {
  it("should reset the DB", () => {
    cy.request('http://localhost:8001/api/debug/reset')
  });
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should press the delete button", () => {
    cy.get('[alt="Delete"]').click({ force: true });
  });
  it("should confirm deletion choice", () => {
    cy.get('button').contains("Confirm").click();
  });
  it("checks the appointment deleted", () => {
    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");

  });
});