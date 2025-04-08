import { readExcelFile } from "../../support/excelReader";
import * as CryptoJS from 'crypto-js';

describe('Check Pending Application in Existing Application Page', () => {
    it('', async () => {
        const _sk = 'faEVc/e+3c=KEgMc3lzYXJjQDEyMzRJTkZPQA==dt7D+EgQD/egEJCAyDAV4HdvR'
        cy.intercept('POST', 'http://172.30.1.116:9093/lendperfect/LOSMobileRestServices/LoginService').as('getLoginDetails');
        cy.visit('/');
        cy.url().should('include', '/login');
        // cy.contains('Welcome Back');
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
        cy.get('#otp1', { timeout: 10000 }).should('be.visible').and('not.be.disabled') .type("8", { delay: 100});
        cy.get('#otp2', { timeout: 10000 }).should('be.visible').and('not.be.disabled') .type("0", { delay: 100});
        cy.get('#otp3', { timeout: 10000 }).should('be.visible').and('not.be.disabled') .type("8", { delay: 100});
        cy.get('#otp4', { timeout: 10000 }).should('be.visible').and('not.be.disabled') .type("0", { delay: 100});
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
            cy.get('#sourcingChannel', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .select(ExcelData.PersonalDetails[2].B.toString());
            cy.get('#title', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .select(ExcelData.PersonalDetails[8].B.toString());
            cy.get('#fatherName', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .type(ExcelData.PersonalDetails[12].B.toString());
            cy.get('#motherName', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .type(ExcelData.PersonalDetails[13].B.toString());
            cy.get('#maritalStatus', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .select(ExcelData.PersonalDetails[14].B.toString());
            cy.get('#spouseName', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .type(ExcelData.PersonalDetails[15].B.toString());
            cy.get('#dob', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .type(ExcelData.PersonalDetails[17].B.toString());
            cy.get('#mobileNo', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .type(ExcelData.PersonalDetails[18].B.toString());
            cy.get('#alternateMobileNo', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .type(ExcelData.PersonalDetails[19].B.toString());
            cy.get('#emailId', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .type(ExcelData.PersonalDetails[20].B.toString());
            cy.get('#distanceFromBranch', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .type(ExcelData.PersonalDetails[22].B.toString());
            cy.get('#monthlyIncome', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .type(ExcelData.PersonalDetails[23].B.toString());
            cy.get('#loanRequested', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .type(ExcelData.PersonalDetails[24].B.toString())
            cy.get('#schemeRequested', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .select(ExcelData.PersonalDetails[25].B.toString())
            cy.get('#differentlyAbled', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .select(ExcelData.PersonalDetails[26].B.toString())
            cy.get('#religion', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .select(ExcelData.PersonalDetails[27].B.toString())
            cy.get('#category', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .select(ExcelData.PersonalDetails[28].B.toString())
            cy.get('#politicallyExposedPerson', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .select(ExcelData.PersonalDetails[29].B.toString())
            cy.get('#qualification', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .select(ExcelData.PersonalDetails[30].B.toString())
            cy.get('#totalWorkExperienceYear', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .select(ExcelData.PersonalDetails[31].B.toString())
            cy.get('#totalWorkExperienceMonth', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .select(ExcelData.PersonalDetails[32].B.toString())
            cy.get('#currentWorkExperienceYear', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .select(ExcelData.PersonalDetails[33].B.toString())
            cy.get('#currentWorkExperienceMonth', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .select(ExcelData.PersonalDetails[34].B.toString());
            cy.get('#personalExpense', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .type(ExcelData.PersonalDetails[35].B.toString())
            cy.get('#occupationMainCategory', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .select(0);
            cy.get('#occupationSubcategory', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .select(ExcelData.PersonalDetails[37].B.toString())
            cy.get('#occupation', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .select(ExcelData.PersonalDetails[38].B.toString())
            cy.get('#totalnoOfYear', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .select(ExcelData.PersonalDetails[39].B.toString())
            cy.get('#totalnoOfMonth', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .select(ExcelData.PersonalDetails[40].B.toString())
            cy.get('#panAvail', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .select(ExcelData.PersonalDetails[43].B.toString())
            cy.get('#voicesmsreq', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .select(ExcelData.PersonalDetails[44].B.toString())
            cy.get('#preferredlanguage', { timeout: 10000 }).should('be.visible').and('not.be.disabled')
                .select(ExcelData.PersonalDetails[45].B.toString())
            cy.intercept('POST', 'http://172.30.1.116:9093/lendperfect/LOSMobileRestServices/goldOnlineApk', (req)=> {
                var decryptedBytes = CryptoJS.AES.decrypt(req.body.data, window.atob(_sk.substring(15,39)));
                if (decryptedBytes) {
                    let decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
                    let personalRequest = JSON.parse(decryptedMessage)
                    console.log("personalRequest", personalRequest);
                    if (personalRequest.pageID == "1") {
                        req.alias == "getPersonalDetails"
                    }
                }
            }).as('getPersonalDetails');
            cy.get('#personal-save-button').click()
            cy.intercept('POST', 'http://172.30.1.116:9093/lendperfect/LOSMobileRestServices/goldOnlineApk', (req)=> {
                var decryptedBytes = CryptoJS.AES.decrypt(req.body.data, window.atob(_sk.substring(15,39)));
                if (decryptedBytes) {
                    let decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
                    let karzaRequest = JSON.parse(decryptedMessage)
                    console.log("karzaRequest", karzaRequest);
                    if (karzaRequest.pageID == "8") {
                        req.alias == "getKarzaDetails"
                    }
                }
            }).as('getKarzaDetails');
            cy.wait('@getPersonalDetails')
            .then((interception) => {
                cy.log("getPersonalDetails", interception)
                var decryptedBytes = CryptoJS.AES.decrypt(interception.response.body.data, window.atob(_sk.substring(15,39)));
                if (decryptedBytes) {
                    let decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
                    let personalResponse = JSON.parse(decryptedMessage)
                    cy.log("personalResponse", personalResponse);
                    cy.writeFile('cypress/fixtures/personalResponse.json', personalResponse);
                }
            });
            cy.wait('@getKarzaDetails')
            .then((interception) => {
                cy.log("getKarzaDetails", interception)
                var decryptedBytes = CryptoJS.AES.decrypt(interception.response.body.data, window.atob(_sk.substring(15,39)));
                if (decryptedBytes) {
                    let decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
                    let karzaResponse = JSON.parse(decryptedMessage)
                    cy.log("karzaResponse", karzaResponse);
                    cy.writeFile('cypress/fixtures/karzaResponse.json', karzaResponse);
                }
            });
            cy.go('back');
            cy.url().should('include', '/dashboard');
            cy.wait(1000)
            cy.intercept('POST', 'http://172.30.1.116:9093/lendperfect/LOSMobileRestServices/getcustdata').as('getApplicationData');
            cy.contains("ExistingApplications").click();
            cy.wait('@getApplicationData')
        })

        cy.fixture("personalResponse.json").then((data) => {
            cy.log("personalJSON", data.responseData.leadId)
            cy.get('#search-application').type(data.responseData.leadId, {delay: 500})
            cy.wait(1000)
            cy.contains(data.responseData.leadId)
        })
    })
})