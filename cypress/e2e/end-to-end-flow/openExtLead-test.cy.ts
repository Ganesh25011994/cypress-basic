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
            // .then((interception) => {
            //     cy.log("getLoginDetails", interception)
            //     var decryptedBytes = CryptoJS.AES.decrypt(interception.response.body.data, window.atob(_sk.substring(15,39)));
            //     if (decryptedBytes) {
            //         let decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
            //         let finalResponse = JSON.parse(decryptedMessage)
            //         cy.log("finalResponse.LPuserID", finalResponse.LPuserID);
            //         cy.writeFile('cypress/fixtures/loginResponse.json', finalResponse);
            //     }
            // });
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
        cy.wait('@getMasterResp')
        cy.url().should('include', '/dashboard');
        cy.wait(1000)
        cy.intercept('POST', 'http://172.30.1.116:9093/lendperfect/LOSMobileRestServices/getcustdata').as('getApplicationData');
        cy.contains("ExistingApplications").click();
        cy.wait('@getApplicationData')

        cy.fixture("personalResponse.json").then((data) => {
            cy.log("personalJSON", data.responseData.leadId)
            cy.get('#search-application').type(data.responseData.leadId, {delay: 500})
            cy.wait(1000)
            // cy.contains(data.responseData.leadId)
            cy.get('#card').should('have.length', 1).contains(data.responseData.leadId).should('be.visible')
            cy.get('#card').click()
            // cy.url().should('include', '/core-tabs')
            cy.wait(1500)
            cy.get('#leadId').should("have.value", data.responseData.leadId)
        })

        
    })
})