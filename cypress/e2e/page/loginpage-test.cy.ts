describe('Login Service Failure Test Cases', () => {
    before(() => {
        cy.task('excelToJsonConverter', 'cypress/fixtures/loginTestData.xlsx').then((data: any) => {
            let excelData = data.LoginData.slice(1)
            let loginExcelData = excelData.filter(val => val.D)
            Cypress.env('testData', loginExcelData);
        })
        cy.visit('/');
    })

    it('Should Throw Error Message When Username and Password not Entered', () => {
        cy.get('#username').clear()
        cy.get('#password').clear()
        cy.get('#login-button').click()
        cy.contains("Enter UserName")
        cy.contains("Enter Password")
})

    it('Should Fail on Login Service with InValid Credential', () => {
        let excelData = Cypress.env('testData')
        excelData.forEach(({A, B, C, D}) => {
            cy.log("UserName", B)
            cy.log("Password", C)
            cy.log("ErrorMessage", D ? D : "No Error")
            cy.login(B, C)
            cy.get('@loginData').then((data: any) => {
                cy.log(JSON.stringify(data))
                expect(data.StatusCode).to.equals('001');
                expect(data.Status).to.equals(D);
                cy.clearLoginInput()
            })
        })
    })

})

describe('Login Service Success Test Cases', () => {
    before(() => {
        cy.task('excelToJsonConverter', 'cypress/fixtures/loginTestData.xlsx').then((data: any) => {
            let excelData = data.LoginData.slice(1)
            let loginExcelData = excelData.filter(val => val.D == undefined)
            Cypress.env('testData', loginExcelData);
        })
        cy.visit('/');
    })

    it('Should Pass on Login Service with Valid Credential', () => {
        let excelData = Cypress.env('testData')
        excelData.forEach(({B, C, D}) => {
            cy.log("UserName", B)
            cy.log("Password", C)
            cy.login(B, C)
            cy.get('@loginData').then((data: any) => {
                cy.log(JSON.stringify(data))
                expect(data.StatusCode).to.equals('000');
                cy.url().should("include", '/mpin')
            })
        })
    })
})