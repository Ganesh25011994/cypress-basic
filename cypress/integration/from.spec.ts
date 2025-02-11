import { readExcelFile } from '../support/excelReader';

describe('Form Submission', () => {
  before(() => {
    cy.visit('http://localhost:4200'); // Update with your Angular app URL
  });
  it('fills the form with data from Excel and submits', () => {
    const data = readExcelFile('cypress/fixtures/data.xlsx'); // Adjust path as necessary
    data.forEach((row: any) => {
      cy.get('input[formControlName="name"]').type(row.name);
      cy.get('input[formControlName="email"]').type(row.email);
      cy.get('button[type="submit"]').click();
    });
  });
});