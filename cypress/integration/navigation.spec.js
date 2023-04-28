

describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")
  });
});

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



