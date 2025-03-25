import { readExcelFile } from "../../support/excelReader";
import * as CryptoJS from 'crypto-js';

describe('Check Pending Application in Existing Application Page', () => {
    it('', async () => {
        const _sk = 'faEVc/e+3c=KEgMc3lzYXJjQDEyMzRJTkZPQA==dt7D+EgQD/egEJCAyDAV4HdvR'
        cy.intercept('POST', 'http://172.30.1.116:9093/lendperfect/LOSMobileRestServices/LoginService').as('getLoginDetails');
        cy.visit('/');
        cy.url().should('include', '/login');
        cy.contains('Welcome Back');
        cy.get('#username', { timeout: 10000 }).should('be.visible').and('not.be.disabled') .type("GLRO", { delay: 100});
        cy.get('#password', { timeout: 10000 }).should('be.visible').and('not.be.disabled') .type("laps", { delay: 100});
        cy.contains('Submit').click();
        cy.wait('@getLoginDetails')
            .then((interception) => {
                cy.log("getLoginDetails", interception)
                var decryptedBytes = CryptoJS.AES.decrypt(interception.response.body.data, window.atob(_sk.substring(15,39)));
                if (decryptedBytes) {
                    let decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
                    let finalResponse = JSON.parse(decryptedMessage)
                    cy.log("finalResponse.LPuserID", finalResponse.LPuserID);
                    cy.writeFile('cypress/fixtures/loginResponse.json', finalResponse);
                }
            });
        cy.intercept('POST', 'http://172.30.1.116:9093/lendperfect/LOSMobileRestServices/getMpinDetails').as('getMpinDetails');
        cy.url({ timeout: 10000 }).should('include', '/mpin');
        cy.wait('@getMpinDetails');
        cy.contains('Welcome GLRO!');
        cy.intercept('POST', 'http://172.30.1.116:9093/lendperfect/LOSMobileRestServices/Setupresp').as('getMasterResp');
        cy.get('#otp1', { timeout: 10000 }).should('be.visible').and('not.be.disabled') .type("1", { delay: 100});
        cy.get('#otp2', { timeout: 10000 }).should('be.visible').and('not.be.disabled') .type("2", { delay: 100});
        cy.get('#otp3', { timeout: 10000 }).should('be.visible').and('not.be.disabled') .type("1", { delay: 100});
        cy.get('#otp4', { timeout: 10000 }).should('be.visible').and('not.be.disabled') .type("2", { delay: 100});
        cy.contains('Login').click()
        // cy.wait(2000)
        cy.wait('@getMasterResp')
        cy.url().should('include', '/dashboard');
        cy.wait(1000)
        cy.contains("CreateLead").click()
        cy.contains("New Customer").click()
        cy.contains('New Customer');
        cy.url().should('include', '/new-customer');
        cy.get('#custType').select("Borrower")
        cy.get('#idProof').select("Voter ID")
        cy.get('#idValue').type("H348274386")
        cy.get('#submit-newbtn').click()
        cy.contains("First Name")
        cy.contains("Middle Name")
        cy.contains("Last Name")
        cy.get('#firstName', { timeout: 10000 }).should('be.visible').and('not.be.disabled').select(0);
        cy.get('#middleName', { timeout: 10000 }).should('be.visible').and('not.be.disabled').select(1);
        cy.get('#lastName', { timeout: 10000 }).should('be.visible').and('not.be.disabled').select(2);
        cy.get('#customerName-submit-btn').click()
        cy.contains("Customer Details")
        cy.contains("KYC").click()
        cy.contains("KYC Details")
        cy.contains("Address").click()
        cy.contains("Permanent Address")
        cy.contains("Personal").click()
        cy.contains("Customer Details")

        let ExcelData;
        cy.task('excelToJsonConverter', 'cypress/fixtures/PersonalDetailsVoterID.xlsx')
        .then((binaryData) => {
            ExcelData = binaryData
            cy.log("ExcelData", ExcelData.PersonalDetails[2].B)
            cy.get('#sourcingChannel').select(ExcelData.PersonalDetails[2].B.toString())
            cy.get('#title').select(ExcelData.PersonalDetails[8].B.toString())
            cy.get('#fatherName').type(ExcelData.PersonalDetails[12].B.toString())
            cy.get('#motherName').type(ExcelData.PersonalDetails[13].B.toString())
            cy.get('#maritalStatus').select(ExcelData.PersonalDetails[14].B.toString())
            cy.get('#spouseName').type(ExcelData.PersonalDetails[15].B.toString())
            cy.get('#dob').type(ExcelData.PersonalDetails[17].B.toString())
            cy.get('#mobileNo').type(ExcelData.PersonalDetails[18].B.toString())
            cy.get('#alternateMobileNo').type(ExcelData.PersonalDetails[19].B.toString())
            cy.get('#emailId').type(ExcelData.PersonalDetails[20].B.toString())
            cy.get('#distanceFromBranch').type(ExcelData.PersonalDetails[22].B.toString())
            cy.get('#monthlyIncome').type(ExcelData.PersonalDetails[23].B.toString())
            cy.get('#loanRequested').type(ExcelData.PersonalDetails[24].B.toString())
            cy.get('#schemeRequested').select(ExcelData.PersonalDetails[25].B.toString())
            cy.get('#differentlyAbled').select(ExcelData.PersonalDetails[26].B.toString())
            cy.get('#religion').select(ExcelData.PersonalDetails[27].B.toString())
            cy.get('#category').select(ExcelData.PersonalDetails[28].B.toString())
            cy.get('#politicallyExposedPerson').select(ExcelData.PersonalDetails[29].B.toString())
            cy.get('#qualification').select(ExcelData.PersonalDetails[30].B.toString())
            cy.get('#totalWorkExperienceYear').select(ExcelData.PersonalDetails[31].B.toString())
            cy.get('#totalWorkExperienceMonth').select(ExcelData.PersonalDetails[32].B.toString())
            cy.get('#currentWorkExperienceYear').select(ExcelData.PersonalDetails[33].B.toString())
            cy.get('#currentWorkExperienceMonth').select(ExcelData.PersonalDetails[34].B.toString())
            cy.get('#personalExpense').type(ExcelData.PersonalDetails[35].B.toString())
            cy.get('#occupationMainCategory').select(0)
            cy.get('#occupationSubcategory').select(ExcelData.PersonalDetails[37].B.toString())
            cy.get('#occupation').select(ExcelData.PersonalDetails[38].B.toString())
            cy.get('#totalnoOfYear').select(ExcelData.PersonalDetails[39].B.toString())
            cy.get('#totalnoOfMonth').select(ExcelData.PersonalDetails[40].B.toString())
            cy.get('#panAvail').select(ExcelData.PersonalDetails[43].B.toString())
            cy.get('#voicesmsreq').select(ExcelData.PersonalDetails[44].B.toString())
            cy.get('#preferredlanguage').select(ExcelData.PersonalDetails[45].B.toString())
            cy.intercept('POST', 'http://172.30.1.116:9093/lendperfect/LOSMobileRestServices/goldOnlineApk').as('getPersonalDetails');
            cy.get('#personal-save-button').click()
            cy.wait('@getPersonalDetails')
            .then((interception) => {
                cy.log("getPersonalDetails", interception)
                var decryptedBytes = CryptoJS.AES.decrypt(interception.response.body.data, window.atob(_sk.substring(15,39)));
                if (decryptedBytes) {
                    let decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
                    let finalResponse = JSON.parse(decryptedMessage)
                    cy.log("finalResponse.LPuserID", finalResponse.LPuserID);
                    cy.writeFile('cypress/fixtures/personalResponse.json', finalResponse);
                }
            });
            cy.intercept('POST', 'http://172.30.1.116:9093/lendperfect/LOSMobileRestServices/goldOnlineApk').as('getKarzaDetails');
            cy.wait('@getKarzaDetails')
            .then((interception) => {
                cy.log("getKarzaDetails", interception)
                var decryptedBytes = CryptoJS.AES.decrypt(interception.response.body.data, window.atob(_sk.substring(15,39)));
                if (decryptedBytes) {
                    let decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
                    let finalResponse = JSON.parse(decryptedMessage)
                    cy.log("finalResponse.LPuserID", finalResponse.LPuserID);
                    cy.writeFile('cypress/fixtures/karzaResponse.json', finalResponse);
                }
            });

            cy.visit('/dashboard')
            cy.url().should('include', '/dashboard');
            cy.wait(1000)
            cy.contains("CreateLead").click()
        })
    })
})