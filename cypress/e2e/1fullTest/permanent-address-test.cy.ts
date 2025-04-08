import * as CryptoJS from 'crypto-js';

describe('Permanent Address Validation', () => {
    beforeEach(() => {
        cy.visit('/core-tabs');
        cy.contains('Address').click()
        // cy.task('excelToJsonConverter', 'cypress/fixtures/PermanentAddressData.xlsx')
        //     .then((binaryData: any) => {
        //         cy.wrap(binaryData.PermAddress1).as('ExcelData');
        //     })
    })

    // it('Permanent Document Collect Validation Check', () => {
    //     cy.get('@ExcelData').then((ExcelData: any) => {
    //         expect(ExcelData).to.not.be.undefined;
    //         console.log("ExcelData-select Documemt", ExcelData[2])
    //         if (ExcelData[2].B == "" || ExcelData[2].B == undefined || ExcelData[2].B == null) {
    //             cy.log("Document Collect Select Fail Here")
    //             cy.get('#documentCollectedForPermanentAddress').blur();
    //         } else {
    //             cy.log("Document Collect Select Pass Here")
    //             cy.get('#permAddress1').clear().blur();
    //             cy.get('#documentCollectedForPermanentAddress').select(ExcelData[2].B);
    //         }

    //         if (ExcelData[2].C == "TRUE") {
    //             cy.log("Document Collect Error Visible Here")
    //             cy.get('#documentCollectederror').should('be.visible').and('contain', ExcelData[2].D);
    //         } else {
    //             cy.log("Document Collect Error Hidden Here")
    //             cy.get('#documentCollectederror').should('be.hidden'); // No error should be shown for valid input
    //         }
    //     })
    // })

    // it('Permanent Address Line 1 Validation Check', () => {
    //     cy.get('@ExcelData').then((ExcelData: any) => {
    //         expect(ExcelData).to.not.be.undefined;
    //         console.log("ExcelData-first IT", ExcelData[3])
    //         if (ExcelData[3].B == "" || ExcelData[3].B == undefined || ExcelData[3].B == null) {
    //             cy.log("Address Line 1 Fail Here")
    //             cy.get('#permAddress1').focus().blur()
    //         } else {
    //             cy.log("Address Line 1 Pass Here")
    //             cy.get('#permAddress1').clear().type(ExcelData[3].B).blur();
    //         }

    //         if (ExcelData[3].C == "TRUE") {
    //             cy.log("Address Line 1 Error Visible Here")
    //             cy.get('#permAddress1error').should('be.visible').and('contain', ExcelData[3].D);
    //         } else {
    //             cy.log("Address Line 1 Error Hidden Here")
    //             cy.get('#permAddress1error').should('be.hidden'); // No error should be shown for valid input
    //         }
    //     })
    // })

    // it('Permanent Address Line 2 Validation Check', () => {
    //     cy.get('@ExcelData').then((ExcelData: any) => {
    //         expect(ExcelData).to.not.be.undefined;
    //         cy.log("ExcelData-2 IT", ExcelData[4])
    //         if (ExcelData[4].B == "" || ExcelData[4].B == undefined || ExcelData[4].B == null) {
    //             cy.log("Address Line 2 Fail Here")
    //             cy.get('#permAddress2').focus().blur()
    //         } else {
    //             cy.log("Address Line 2 Pass Here")
    //             cy.get('#permAddress2').clear().type(ExcelData[4].B).blur();
    //         }

    //         if (ExcelData[4].C == "TRUE") {
    //             cy.log("Address Line 2 Error Visible Here")
    //             cy.get('#permAddress2error').should('be.visible').and('contain', ExcelData[4].D);
    //         } else {
    //             cy.log("Address Line 2 Error Hidden Here")
    //             cy.get('#permAddress2error').should('be.hidden'); // No error should be shown for valid input
    //         }
    //     })
    // })

    // it('Permanent Address Line 3 Validation Check', () => {
    //     cy.get('@ExcelData').then((ExcelData: any) => {
    //         expect(ExcelData).to.not.be.undefined;
    //         cy.log("ExcelData-3 IT", ExcelData[5])
    //         if (ExcelData[5].B == "" || ExcelData[5].B == undefined || ExcelData[5].B == null) {
    //             cy.log("Address Line 3 Fail Here")
    //             cy.get('#permAddress3').focus().blur()
    //         } else {
    //             cy.log("Address Line 3 Pass Here")
    //             cy.get('#permAddress3').clear().type(ExcelData[5].B).blur();
    //         }

    //         if (ExcelData[5].C == "TRUE") {
    //             cy.log("Address Line 3 Error Visible Here")
    //             cy.get('#permAddress3error').should('be.visible').and('contain', ExcelData[5].D);
    //         } else {
    //             cy.log("Address Line 3 Error Hidden Here")
    //             cy.get('#permAddress3error').should('be.hidden'); // No error should be shown for valid input
    //         }
    //     })
    // })

    // it('Permanent Address LandMark Validation Check', () => {
    //     cy.get('@ExcelData').then((ExcelData: any) => {
    //         expect(ExcelData).to.not.be.undefined;
    //         console.log("ExcelData-landmark IT", ExcelData[6])
    //         if (ExcelData[6].B == "" || ExcelData[6].B == undefined || ExcelData[6].B == null) {
    //             cy.log("Address LandMark Fail Here")
    //             // cy.get('#permLandMark').clear().blur();
    //             cy.get('#permLandMark').focus().type(' ').blur()
    //         } else {
    //             cy.log("Address LandMark Pass Here")
    //             cy.get('#permLandMark').clear().type(ExcelData[6].B).blur();
    //         }

    //         if (ExcelData[6].C == "TRUE") {
    //             cy.log("Address LandMark Error Visible Here")
    //             cy.get('#permLandmarkerror').should('be.visible').and('contain', ExcelData[6].D);
    //         } else {
    //             cy.log("Address LandMark Error Hidden Here")
    //             cy.get('#permLandmarkerror').should('be.hidden'); // No error should be shown for valid input
    //         }
    //     })
    // })

    // it('Permanent Address Pincode Validation Check', () => {
    //     const _sk = 'faEVc/e+3c=KEgMc3lzYXJjQDEyMzRJTkZPQA==dt7D+EgQD/egEJCAyDAV4HdvR'
    //     cy.get('@ExcelData').then((ExcelData: any) => {
    //         expect(ExcelData).to.not.be.undefined;
    //         cy.log("ExcelData-3 IT", ExcelData[9])
    //         if (ExcelData[9].B == "" || ExcelData[9].B == undefined || ExcelData[9].B == null) {
    //             cy.log("Address Pincode Fail Here")
    //             cy.get('#permPincode').focus().blur()
    //         } else {
    //             cy.log("Address Pincode Pass Here")
    //             cy.get('#permPincode').clear().type(ExcelData[9].B).blur();
    //         }

    //         if (ExcelData[9].C == "TRUE") {
    //             cy.log("Address Pincode Error Visible Here")
    //             cy.get('#permPincodeerror').should('be.visible').and('contain', ExcelData[9].D);
    //         } else {
    //             cy.log("Address Pincode Error Hidden Here")
    //             cy.get('#permPincodeerror').should('be.hidden'); // No error should be shown for valid input
    //         }
    //         cy.log("ExcelData[9].C", ExcelData[9].C)
    //         if (ExcelData[9].C != "TRUE") {
    //             cy.intercept('POST', 'http://172.30.1.116:9093/lendperfect/LOSMobileRestServices/stateccity').as('getStateCity');
    //             cy.get('#permPinvfyBtn').should('be.enabled').click();
    //             cy.wait('@getStateCity').then((interception) => {
    //                 cy.log("getLoginDetails", interception)
    //                 var decryptedBytes = CryptoJS.AES.decrypt(interception.response.body.data, window.atob(_sk.substring(15,39)));
    //                 if (decryptedBytes) {
    //                     let decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
    //                     let finalResponse = JSON.parse(decryptedMessage)
    //                     console.log("finalResponse-statecity", finalResponse);
    //                     let stateData, cityData;
    //                     stateData = finalResponse.stateName
    //                     cityData = finalResponse.cityName
    //                     cy.get('#permState').should('be.visible').select(stateData).should('have.value', finalResponse.stateCode)
    //                     cy.get('#permcity').should('be.visible').select(cityData).should('have.value', finalResponse.cityCode)
    //                 }
    //             });
    //         }
    //     })
    // })


    // it('', () => {
    //     const _sk = 'faEVc/e+3c=KEgMc3lzYXJjQDEyMzRJTkZPQA==dt7D+EgQD/egEJCAyDAV4HdvR'
    //     let btnInvalid
    //     cy.get('@ExcelData').then((ExcelData: any) => {
    //     expect(ExcelData).to.not.be.undefined;
    //     console.log("ExcelData-select Documemt", ExcelData)
    //         if (!ExcelData[2].B) {
    //             cy.log("Document Collect Select Fail Here")
    //             cy.get('#documentCollectedForPermanentAddress').blur();
    //         } else {
    //             cy.log("Document Collect Select Pass Here")
    //             cy.get('#documentCollectedForPermanentAddress').select(ExcelData[2].B);
    //         }

    //         if (ExcelData[3].B == "" || ExcelData[3].B == undefined || ExcelData[3].B == null) {
    //             cy.log("Address Line 1 Fail Here")
    //             cy.get('#permAddress1').focus().blur()
    //         } else {
    //             cy.log("Address Line 1 Pass Here")
    //             cy.get('#permAddress1').clear().type(ExcelData[3].B).blur();
    //         }

    //         if (ExcelData[4].B == "" || ExcelData[4].B == undefined || ExcelData[4].B == null) {
    //             cy.log("Address Line 2 Fail Here")
    //             cy.get('#permAddress2').focus().blur()
    //         } else {
    //             cy.log("Address Line 2 Pass Here")
    //             cy.get('#permAddress2').clear().type(ExcelData[4].B).blur();
    //         }

    //         if (ExcelData[5].B == "" || ExcelData[5].B == undefined || ExcelData[5].B == null) {
    //             cy.log("Address Line 3 Fail Here")
    //             cy.get('#permAddress3').focus().blur()
    //         } else {
    //             cy.log("Address Line 3 Pass Here")
    //             cy.get('#permAddress3').clear().type(ExcelData[5].B).blur();
    //         }

    //         if (ExcelData[6].B == "" || ExcelData[6].B == undefined || ExcelData[6].B == null) {
    //             cy.log("Address LandMark Fail Here")
    //             cy.get('#permLandMark').focus().blur()
    //         } else {
    //             cy.log("Address LandMark Pass Here")
    //             cy.get('#permLandMark').clear().type(ExcelData[6].B).blur();
    //         }
            
    //         if (ExcelData[9].B == "" || ExcelData[9].B == undefined || ExcelData[9].B == null) {
    //             cy.log("Address Pincode Fail Here")
    //             cy.get('#permPincode').focus().blur()
    //         } else {
    //             cy.log("Address Pincode Pass Here")
    //             cy.get('#permPincode').clear().type(ExcelData[9].B).blur();
    //         }

    //         if (ExcelData[9].C != "TRUE") {
    //             cy.intercept('POST', 'http://172.30.1.116:9093/lendperfect/LOSMobileRestServices/stateccity').as('getStateCity');
    //             cy.get('#permPinvfyBtn').should('be.enabled').click();
    //             cy.wait('@getStateCity').then((interception) => {
    //                 cy.log("getLoginDetails", interception)
    //                 var decryptedBytes = CryptoJS.AES.decrypt(interception.response.body.data, window.atob(_sk.substring(15,39)));
    //                 if (decryptedBytes) {
    //                     let decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
    //                     let finalResponse = JSON.parse(decryptedMessage)
    //                     console.log("finalResponse-statecity", finalResponse);
    //                     let stateData, cityData;
    //                     stateData = finalResponse.stateName
    //                     cityData = finalResponse.cityName
    //                     cy.get('#permState').should('be.visible').select(stateData).should('have.value', finalResponse.stateCode)
    //                     cy.get('#permcity').should('be.visible').select(cityData).should('have.value', finalResponse.cityCode)
    //                 }
    //             });
    //         }

    //         cy.get('#btn-submit-permAddress').click()

    //         if (ExcelData[2].C == "TRUE") {
    //             cy.log("Document Collect Error Visible Here")
    //             cy.get('#documentCollectederror').should('be.visible').and('contain', ExcelData[2].D);
    //         } else {
    //             cy.log("Document Collect Error Hidden Here")
    //             cy.get('#documentCollectederror').should('be.hidden'); // No error should be shown for valid input
    //         }

    //         if (ExcelData[3].C == "TRUE") {
    //             cy.log("Document Collect Error Visible Here")
    //             cy.get('#permAddress1error').should('be.visible').and('contain', ExcelData[3].D);
    //         } else {
    //             cy.log("Document Collect Error Hidden Here")
    //             cy.get('#permAddress1error').should('be.hidden'); // No error should be shown for valid input
    //         }

    //         if (ExcelData[4].C == "TRUE") {
    //             cy.log("Document Collect Error Visible Here")
    //             cy.get('#permAddress2error').should('be.visible').and('contain', ExcelData[4].D);
    //         } else {
    //             cy.log("Document Collect Error Hidden Here")
    //             cy.get('#permAddress2error').should('be.hidden'); // No error should be shown for valid input
    //         }

    //         if (ExcelData[5].C == "TRUE") {
    //             cy.log("Document Collect Error Visible Here")
    //             cy.get('#permAddress3error').should('be.visible').and('contain', ExcelData[5].D);
    //         } else {
    //             cy.log("Document Collect Error Hidden Here")
    //             cy.get('#permAddress3error').should('be.hidden'); // No error should be shown for valid input
    //         }

    //         if (ExcelData[6].C == "TRUE") {
    //             cy.log("Document Collect Error Visible Here")
    //             cy.get('#permLandmarkerror').should('be.visible').and('contain', ExcelData[6].D);
    //         } else {
    //             cy.log("Document Collect Error Hidden Here")
    //             cy.get('#permLandmarkerror').should('be.hidden'); // No error should be shown for valid input
    //         }

    //         if (ExcelData[9].C == "TRUE") {
    //             cy.log("Document Collect Error Visible Here")
    //             cy.get('#permPincodeerror').should('be.visible').and('contain', ExcelData[9].D);
    //         } else {
    //             cy.log("Document Collect Error Hidden Here")
    //             cy.get('#permPincodeerror').should('be.hidden'); // No error should be shown for valid input
    //         }

 
    //     })

    // })
    

    // it('', () => {
        // cy.log("passng here")
        const testCases = [
            // [
                { value: "", shouldFail: true, error: "Enter Permanent Address Line 1" },  // Required validation
                { value: "dlnfsdnflsndflnsdlfnsnflsdnfsndfkjsnfdknsakjdfbfkjbdfkbsakjfdbskdbfjsdbfsabdfkbskdfbksadbfksabdfsabfkbsakfdbsakdbfkjsfdjsfdkjn", shouldFail: true, error: "Maximum 40 characters only allowed" }, // Min length
                { value: "abc!", shouldFail: true, error: "Special character are not allowed" }, // Pattern validation
                { value: "validUser123", shouldFail: false }

                // ],
            // [{ value: "", shouldFail: true, error: "Enter Permanent Address Line 1" },  // Required validation
            //     { value: "dlnfsdnflsndflnsdlfnsnflsdnfsndfkjsnfdknsakjdfbfkjbdfkbsakjfdbskdbfjsdbfsabdfkbskdfbksadbfksabdfsabfkbsakfdbsakdbfkjsfdjsfdkjn", shouldFail: true, error: "Maximum 40 characters only allowed" }, // Min length
            //     { value: "abc!", shouldFail: true, error: "Special character are not allowed" }, // Pattern validation
            //     { value: "validUser123", shouldFail: false }]
        ];
        // cy.log("testcases", JSON.stringify(testCases))
// Check multiple validation errors in one step
        testCases.forEach(({ value, shouldFail, error }) => {
            it(`Should ${shouldFail ? "fail" : "pass"} validation for input: "${value}"`, () => {
                if (value == "" || value == undefined || value == null) {
                    cy.get('#permAddress1').clear().blur();
                } else {
                    cy.get('#permAddress1').clear().type(value).blur();
                }
            
                if (shouldFail) {
                    cy.get('.text-danger').should('be.visible').and('contain', error);
                } else {
                    cy.get('.text-danger').should('be.hidden'); // No error should be shown for valid input
                }
            });
        });
    // })


})