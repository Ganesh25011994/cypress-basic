
var CryptoJS = require("crypto-js");
describe('MPIN Service Failure Test Cases', () => {
    before(() => {
        const _sk = 'faEVc/e+3c=KEgMc3lzYXJjQDEyMzRJTkZPQA==dt7D+EgQD/egEJCAyDAV4HdvR'
        let mpinExcelData: any;
        cy.task('excelToJsonConverter', 'cypress/fixtures/loginTestData.xlsx').then((data: any) => {
            let excelData = data.MpinData.slice(1)
            mpinExcelData = excelData.filter(val => val.B.toString().length == 4)
        })
        cy.intercept('POST', 'http://172.30.1.116:9093/lendperfect/LOSMobileRestServices/getMpinDetails').as('getMpinDetails');
        cy.visit('/mpin');
        cy.url({ timeout: 10000 }).should('include', '/mpin');
        cy.wait('@getMpinDetails').then((interception) => {
            var decryptedBytes = CryptoJS.AES.decrypt(interception.response.body.data, window.atob(_sk.substring(15,39)));
            if (decryptedBytes) {
              let decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
              let finalResponse = JSON.parse(decryptedMessage)
              cy.wrap(finalResponse).as('getMpinData')
              cy.log("mpinExcelData", JSON.stringify(mpinExcelData))
              cy.log("finalResponse.map.currentMpin", finalResponse.map.currentMpin)
              let finalData = mpinExcelData.filter(val => val.B != finalResponse.map.currentMpin)
              cy.log("mpinExcelData-filterData", JSON.stringify(finalData))
              Cypress.env('mpinExcelData', finalData);
              Cypress.env('mpinDetails', finalResponse);
            }
        });
    })

    it('Should Fail Mpin Login and Check Invalid MPIN Alert', () => {
        let mpinExcelData = Cypress.env('mpinExcelData')
        let mpinDetails = Cypress.env('mpinDetails')
        cy.log("mpinDetails", mpinDetails)
        mpinExcelData.forEach(({B, C}) => {
            let PIN = B.toString().split('')
            cy.getMasterData(PIN, mpinDetails)
            cy.get('@MasterData').then((data: any) => {
                cy.log(JSON.stringify(data))
                cy.clearMpinInput()
            })
        })
    })
})

describe('MPIN Page Login Button Disable Test Cases', () => {
    before(() => {
        const _sk = 'faEVc/e+3c=KEgMc3lzYXJjQDEyMzRJTkZPQA==dt7D+EgQD/egEJCAyDAV4HdvR'
        let mpinExcelData: any;
        cy.task('excelToJsonConverter', 'cypress/fixtures/loginTestData.xlsx').then((data: any) => {
            let excelData = data.MpinData.slice(1)
            mpinExcelData = excelData.filter(val => val.B.toString().length != 4)
            Cypress.env('mpinExcelData', mpinExcelData);
        })
    })

    it("Mpin Login Button Should be Disabled Without Mpin all digit fillet", () => {
        let mpinExcelData = Cypress.env('mpinExcelData')
        cy.log("mpinExcelData", mpinExcelData)
        mpinExcelData.forEach(({B, C}) => {
            let PIN = B.toString().split('')
            PIN.forEach((pin, index) => {
                if(!pin){
                    cy.get(`#otp${index + 1}`, { timeout: 10000 }).should('be.visible').and('not.be.disabled') .clear();
                } else {
                    cy.get(`#otp${index + 1}`, { timeout: 10000 }).should('be.visible').and('not.be.disabled') .type(pin);
                }
            })
            cy.get('#mpinSubmit-btn').should('be.disabled')
            cy.clearMpinInput()
        })
    })
})

describe('MPIN Service Success Test Cases', () => {
    before(() => {
        const _sk = 'faEVc/e+3c=KEgMc3lzYXJjQDEyMzRJTkZPQA==dt7D+EgQD/egEJCAyDAV4HdvR'
        let mpinExcelData: any;
        cy.task('excelToJsonConverter', 'cypress/fixtures/loginTestData.xlsx').then((data: any) => {
            let excelData = data.MpinData.slice(1)
            mpinExcelData = excelData.filter(val => val.B.toString().length == 4)
        })
        cy.intercept('POST', 'http://172.30.1.116:9093/lendperfect/LOSMobileRestServices/getMpinDetails').as('getMpinDetails');
        cy.visit('/mpin');
        cy.url({ timeout: 10000 }).should('include', '/mpin');
        cy.wait('@getMpinDetails').then((interception) => {
            var decryptedBytes = CryptoJS.AES.decrypt(interception.response.body.data, window.atob(_sk.substring(15,39)));
            if (decryptedBytes) {
              let decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
              let finalResponse = JSON.parse(decryptedMessage)
              cy.wrap(finalResponse).as('getMpinData')
              cy.log("mpinExcelData", JSON.stringify(mpinExcelData))
              cy.log("finalResponse.map.currentMpin", finalResponse.map.currentMpin)
              let finalData = mpinExcelData.filter(val => val.B == finalResponse.map.currentMpin)
              cy.log("mpinExcelData-filterData", JSON.stringify(finalData))
              Cypress.env('mpinExcelData', finalData);
              Cypress.env('mpinDetails', finalResponse);
            }
        });
    })

    it('Should Pass the Test and Navigate to Dashboard Page', () => {
        cy.clearMpinInput()
        let mpinExcelData = Cypress.env('mpinExcelData')
        let mpinDetails = Cypress.env('mpinDetails')
        cy.log("mpinDetails", mpinDetails)
        mpinExcelData.forEach(({B, C}) => {
            let PIN = B.toString().split('')
            cy.getMasterData(PIN, mpinDetails)
            cy.get('@MasterData').then((data: any) => {
                cy.log(JSON.stringify(data))
                cy.url().should("include", '/dashboard')
                
            })
        })
    })
})

