import Papa from 'papaparse';

describe('Personal Details Page Fill', () =>{   
    beforeEach(() => {
      cy.window().then((window) => {
        // const username = window.localStorage.getItem('username');
        // if (username) {
          window.localStorage.setItem('username', 'GLRO');
          window.localStorage.setItem("personalgo", "true")
        // }
      });
      cy.wait(2000);
      cy.visit('/personal');
    });

    it("Submit the Form with all fields Empty Data", () => {
      cy.wait(1000);
      cy.get('#save-button').click()
      cy.contains('Enter FirstName');
      cy.contains('Enter Last Name');
      cy.contains('Enter Father Name');
      cy.contains('Enter Mother Name');
      cy.contains('Select Marital Status');
      cy.contains('Select Gender');
      cy.contains('Select Date of Birth');
      cy.contains('Enter Mobile Number');
      cy.contains('Enter Distance From Branch');
      cy.contains('Enter Monthly Income');
      cy.contains('Enter Loan Requested');
      cy.contains('Select Scheme Requested');
      cy.contains('Select Differently Abled');
      cy.contains('Select Religion');
      cy.contains('Select Category');
      cy.contains('Select Qualification');
      cy.contains('Select Occupation Main Category');
      cy.contains('Select Occupation Sub Category');
      cy.contains('Select Occupation');
      cy.contains('Select Total Number of Years in Working Experience');
      cy.contains('Select Total Number of Months in Working Experience');
      cy.contains('Select Current Number of Years in Working Experience');
      cy.contains('Select Current Number of Months in Working Experience');
      cy.contains('Select Total Number of Years in City');
      cy.contains('Select Total Number of Months in City');
    })

    it('TestCases for Firstname', () => {
      cy.get('#firstName').type('Gan3747', {delay: 100})
      cy.contains('Enter Valid FirstName')
      cy.get('#firstName').clear()
      cy.get('#firstName').type('aljsaslkhdalksdalkshdlkasdlkasdkjaskdjalksjd', {delay: 50})
      cy.contains('Maximum 40 Charactes only allowed')
      cy.get('#firstName').clear()
      cy.get('#firstName').type("Ramesh")
    })

    it('TestCases for Middlename', () => {
      cy.get('#middleName').type('Gan3747', {delay: 100})
      cy.contains('Enter valid Middle Name')
      cy.get('#middleName').clear()
      cy.get('#middleName').type('aljsaslkhdalksdalkshdlkasdlkasdkjaskdjalksjdlkajsdlkasdlkj', {delay: 50})
      cy.contains('Maximum 40 Charactes only allowed')
    })
        
    it('Read Google Sheets Data', () => {
        // sourcingChannel
        // branchName
        // branchCode
        // lgName
        // lgId
        
        // cy.get('#firstName').type('Ravi')
        // cy.get('#title').select('MR')
        // cy.get('#middleName').type('Amar')
        // cy.get('#lastName').type('Vinoth')
        // cy.get('#fatherName').type('Arun')
        // cy.get('#motherName').type('Avantika')
        // cy.get('#maritalStatus').select('Single')
        // cy.get('#gender').select('Male')
        // cy.get('#dob').type('1994-01-25')
        // cy.get('#mobileNo').type('7865271893')
        // cy.get('#alternateMobileNo').type('6532187981')
        // cy.get('#emailId').type('ravi23@gmail.com')
        // cy.get('#leadId').type('7513289186')
        // cy.get('#distanceFromBranch').type('43.72')
        // cy.get('#monthlyIncome').type('38500')
        // cy.get('#loanRequested').type('415650')
        // cy.get('#schemeRequested').select('MR')
        // cy.get('#differentlyAbled').select('NO')
        // cy.get('#religion').select('Hindu')
        // cy.get('#category').select('OBC')
        // cy.get('#politicallyExposedPerson').select('NO')
        // cy.get('#Qualification').select('Graduate')
        // cy.get('#totalWorkExperienceYear').select('2')
        // cy.get('#totalWorkExperienceMonth').select('8')
        // cy.get('#currentWorkExperienceYear').select('2')
        // cy.get('#currentWorkExperienceMonth').select('2')
        // cy.get('#personalExpense').type('22850')
        // cy.get('#occupationMainCategory').select('YES')
        // cy.get('#occupationSubcategory').select('NO')
        // cy.get('#occupation').select('YES')
        // cy.get('#totalnoOfYear').select('30')
        // cy.get('#totalnoOfMonth').select('2')
        // cy.get('#cifId').type('1067984985')

        const googlesheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVUkU7QoXCbYSquIpqFoiwlDCkq9RhEfdmV_u63OuFnYELWrtsmvvxHeRi9qLaOuplwa2XgTCAp8QP/pub?output=csv'
        const googlesheetURLPersonal = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSZt0bGFBVni2l5Dsp58PByWuQJhF8Alo0-hwne8TipP_kKA0S9XH7mxs3zbw6tP__JUWEwwRwECyFj/pub?gid=1058205899&single=true&output=csv'
        cy.request({
            url: googlesheetURLPersonal,
            method: 'GET',
            encoding: 'utf8',
          }).then((response) => {
            // Parse the CSV data with PapaParse
            cy.log("request-response", response)
            Papa.parse(response.body, {
              complete: (result) => {
                console.log('Parsed Data:', result.data);
                cy.log('final-Parsed Data:', result.data);
                expect(result.data).to.have.length.greaterThan(0); // Example assertion
      
                let PersonalDetailsSheet = result.data
                cy.log("PersonalDetailsSheet", PersonalDetailsSheet[7])
                cy.get('#branchName').type(PersonalDetailsSheet[1].FieldValue.toString())
                cy.get('#sourcingChannel').type(PersonalDetailsSheet[0].FieldValue.toString())
                cy.get('#branchCode').type(PersonalDetailsSheet[2].FieldValue.toString())
                cy.get('#lgName').type(PersonalDetailsSheet[3].FieldValue.toString())
                cy.get('#lgId').type(PersonalDetailsSheet[4].FieldValue.toString())
                cy.get('#firstName').type(PersonalDetailsSheet[6].FieldValue.toString())
                cy.get('#title').select(PersonalDetailsSheet[5].FieldValue.toString())
                PersonalDetailsSheet[7].FieldValue ? cy.get('#middleName').type(PersonalDetailsSheet[7].FieldValue.toString()) : cy.get('#middleName').clear()
                cy.get('#lastName').type(PersonalDetailsSheet[8].FieldValue.toString())
                cy.get('#fatherName').type(PersonalDetailsSheet[9].FieldValue.toString())
                cy.get('#motherName').type(PersonalDetailsSheet[10].FieldValue.toString())
                cy.get('#maritalStatus').select(PersonalDetailsSheet[11].FieldValue.toString())
                cy.get('#gender').select(PersonalDetailsSheet[12].FieldValue.toString())
                cy.get('#dob').type(PersonalDetailsSheet[13].FieldValue.toString())
                cy.get('#mobileNo').type(PersonalDetailsSheet[14].FieldValue.toString())
                cy.get('#alternateMobileNo').type(PersonalDetailsSheet[15].FieldValue.toString())
                cy.get('#emailId').type(PersonalDetailsSheet[16].FieldValue.toString())
                cy.get('#leadId').type(PersonalDetailsSheet[17].FieldValue.toString())
                cy.get('#distanceFromBranch').type(PersonalDetailsSheet[18].FieldValue.toString())
                cy.get('#monthlyIncome').type(PersonalDetailsSheet[19].FieldValue.toString())
                cy.get('#loanRequested').type(PersonalDetailsSheet[20].FieldValue.toString())
                cy.get('#schemeRequested').select(PersonalDetailsSheet[21].FieldValue.toString())
                cy.get('#differentlyAbled').select(PersonalDetailsSheet[22].FieldValue.toString())
                cy.get('#religion').select(PersonalDetailsSheet[23].FieldValue.toString())
                cy.get('#category').select(PersonalDetailsSheet[24].FieldValue.toString())
                cy.get('#politicallyExposedPerson').select(PersonalDetailsSheet[25].FieldValue.toString())
                cy.get('#qualification').select(PersonalDetailsSheet[26].FieldValue.toString())
                cy.get('#totalWorkExperienceYear').select(PersonalDetailsSheet[27].FieldValue.toString())
                cy.get('#totalWorkExperienceMonth').select(PersonalDetailsSheet[28].FieldValue.toString())
                cy.get('#currentWorkExperienceYear').select(PersonalDetailsSheet[29].FieldValue.toString())
                cy.get('#currentWorkExperienceMonth').select(PersonalDetailsSheet[30].FieldValue.toString())
                cy.get('#personalExpense').type(PersonalDetailsSheet[31].FieldValue.toString())
                cy.get('#occupationMainCategory').select(PersonalDetailsSheet[32].FieldValue.toString())
                cy.get('#occupationSubcategory').select(PersonalDetailsSheet[33].FieldValue.toString())
                cy.get('#occupation').select(PersonalDetailsSheet[34].FieldValue.toString())
                cy.get('#totalnoOfYear').select(PersonalDetailsSheet[35].FieldValue.toString())
                cy.get('#totalnoOfMonth').select(PersonalDetailsSheet[36].FieldValue.toString())
                cy.get('#cifId').type(PersonalDetailsSheet[37].FieldValue.toString())
              },
              header: true, // If you want the first row to be treated as headers
            });
          });
    })
})






        // sourcingChannel
        // branchName
        // branchCode
        // lgName
        // lgId
        // title
        // firstName
        // middleName
        // lastName
        // fatherName
        // motherName
        // maritalStatus
        // gender
        // dob
        // mobileNo
        // alternateMobileNo
        // emailId
        // leadId
        // distanceFromBranch
        // monthlyIncome
        // loanRequested
        // schemeRequested
        // differentlyAbled
        // religion
        // category
        // politicallyExposedPerson
        // Qualification
        // totalWorkExperienceYear
        // totalWorkExperienceMonth
        // currentWorkExperienceYear
        // currentWorkExperienceMonth
        // personalExpense
        // occupationMainCategory
        // occupationSubcategory
        // occupation
        // totalnoOfMonth
        // totalnoOfYear
        // cifId

        after(() => {
          cy.window().then((window) => {
            window.localStorage.removeItem('personalgo');
          });
        })