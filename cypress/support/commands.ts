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
        // encryptBody(val, sk): any;
        // saveLocalStorage(key, value): any;
        // restoreLocalStorage(key): any;

        login(username, password)
        clearLoginInput()
        getMpin()
        getMasterData(pin, mpinDetails)
        clearMpinInput()
    }
}

// Cypress.Commands.add('encryptBody', (val, sk: any) => {
//     let encryptedData = CryptoJS.AES.encrypt(JSON.stringify(val), window.atob(sk.substring(15,39)));
//     return encryptedData.toString();
// })

// Cypress.Commands.add('saveLocalStorage', (key, value) => {
//     cy.window().then((window) => {
//       // Save localStorage to the window
//       window.localStorage.setItem(key, value);
//     });
// });

// Cypress.Commands.add('restoreLocalStorage', (key) => {
//   cy.window().then((window) => {
//     // Restore localStorage from the window
//     const value = window.localStorage.getItem(key);
//     if (value) {
//       window.localStorage.setItem(key, value);
//     }
//   });
// });

Cypress.Commands.add('login', (username, password) => {
  const _sk = 'faEVc/e+3c=KEgMc3lzYXJjQDEyMzRJTkZPQA==dt7D+EgQD/egEJCAyDAV4HdvR'
  cy.intercept('POST', 'http://172.30.1.116:9093/lendperfect/LOSMobileRestServices/LoginService').as('getLoginDetails');
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get('#login-button').click()
  cy.wait('@getLoginDetails')
  .then((interception) => {
      cy.log("getLoginDetails", interception)
      var decryptedBytes = CryptoJS.AES.decrypt(interception.response.body.data, window.atob(_sk.substring(15,39)));
      if (decryptedBytes) {
        let decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
        let finalResponse = JSON.parse(decryptedMessage)
        if(finalResponse.StatusCode == "000") {
          cy.writeFile('cypress/fixtures/loginResponse.json', finalResponse);
          cy.wrap(finalResponse).as('loginData')
        } else {
          cy.wrap(finalResponse).as('loginData')
        }
      }
  });
})

Cypress.Commands.add('clearLoginInput', () => {
  cy.get('#username').clear()
  cy.get('#password').clear()
})

Cypress.Commands.add('getMpin', ()=> {
  const _sk = 'faEVc/e+3c=KEgMc3lzYXJjQDEyMzRJTkZPQA==dt7D+EgQD/egEJCAyDAV4HdvR'
  cy.intercept('POST', 'http://172.30.1.116:9093/lendperfect/LOSMobileRestServices/getMpinDetails').as('getMpinData');
  cy.wait('@getMpinData')
  .then((interception) => {
      cy.log("getMpinData", interception)
      var decryptedBytes = CryptoJS.AES.decrypt(interception.response.body.data, window.atob(_sk.substring(15,39)));
      if (decryptedBytes) {
        let decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
        let finalResponse = JSON.parse(decryptedMessage)
        cy.wrap(finalResponse).as('getMpinData')
      }
  });
})

Cypress.Commands.add('getMasterData', (pin, mpinDetails)=> {
  const _sk = 'faEVc/e+3c=KEgMc3lzYXJjQDEyMzRJTkZPQA==dt7D+EgQD/egEJCAyDAV4HdvR'
  cy.intercept('POST', 'http://172.30.1.116:9093/lendperfect/LOSMobileRestServices/Setupresp').as('getMasterData');
  cy.get('#otp1', { timeout: 10000 }).should('be.visible').and('not.be.disabled') .type(pin[0], { delay: 100});
  cy.get('#otp2', { timeout: 10000 }).should('be.visible').and('not.be.disabled') .type(pin[1], { delay: 100});
  cy.get('#otp3', { timeout: 10000 }).should('be.visible').and('not.be.disabled') .type(pin[2], { delay: 100});
  cy.get('#otp4', { timeout: 10000 }).should('be.visible').and('not.be.disabled') .type(pin[3], { delay: 100});
  cy.get('#mpinSubmit-btn').should('be.visible').click()
  if (mpinDetails.map.currentMpin == pin) {
    cy.log("Wrong MPIN")
    cy.wait('@getMasterData').then((interception) => {
      cy.log("getMasterData", interception)
      var decryptedBytes = CryptoJS.AES.decrypt(interception.response.body.data, window.atob(_sk.substring(15,39)));
      if (decryptedBytes) {
        let decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
        let finalResponse = JSON.parse(decryptedMessage)
        cy.wrap("Wrong MPIN").as('MasterData')
      }
    });
  } else {
    cy.log("Correct MPIN")
    cy.wrap("Correct MPIN").as('MasterData')
    
  }
})

Cypress.Commands.add('clearMpinInput', () => {
  cy.get('#otp1', { timeout: 10000 }).should('be.visible').and('not.be.disabled') .clear();
  cy.get('#otp2', { timeout: 10000 }).should('be.visible').and('not.be.disabled') .clear()
  cy.get('#otp3', { timeout: 10000 }).should('be.visible').and('not.be.disabled') .clear()
  cy.get('#otp4', { timeout: 10000 }).should('be.visible').and('not.be.disabled') .clear()
})