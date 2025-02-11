/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

var CryptoJS = require("crypto-js");



declare namespace Cypress {
    interface Chainable<Subject = any> {
        encryptBody(val, sk): any;
        saveLocalStorage(key, value): any;
        restoreLocalStorage(key): any;
    }
}

Cypress.Commands.add('encryptBody', (val, sk: any) => {
    let encryptedData = CryptoJS.AES.encrypt(JSON.stringify(val), window.atob(sk.substring(15,39)));
    return encryptedData.toString();
})

Cypress.Commands.add('saveLocalStorage', (key, value) => {
    cy.window().then((window) => {
      // Save localStorage to the window
      window.localStorage.setItem(key, value);
    });
  });

  Cypress.Commands.add('restoreLocalStorage', (key) => {
    cy.window().then((window) => {
      // Restore localStorage from the window
      const value = window.localStorage.getItem(key);
      if (value) {
        window.localStorage.setItem(key, value);
      }
    });
  });