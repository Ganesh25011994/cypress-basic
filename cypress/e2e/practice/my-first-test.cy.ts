// import { readExcelFile } from "../support/excelReader";
// import { generateToken, encryptData, encryptData2, decryptData } from "../support/globalFunction";
// import 'cypress-file-upload';
// import * as CryptoJS from 'crypto-js';
// // // describe('Excel Upload Test', () => {
// // //     it('should read data from an Excel file', () => {
// // //       const filePath = 'cypress/fixtures/testData.xlsx'; // Path to your Excel file
  
// // //       cy.readFile(filePath).then((data) => {
// // //         // Use the data from the Excel file
// // //         data.forEach((user: any) => {
// // //           cy.log(`Testing user: ${user.usernasubstringme}`);
  
// // //           // Example: Perform a login or any action based on the user data
// // //           cy.visit('/login'); // Replace with your actual login URL
// // //           cy.get('input[name="username"]').type(user.username);
// // //           cy.get('input[name="password"]').type(user.password);
// // //           cy.get('button[type="submit"]').click();
  
// // //           // Add assertions here to check for expected outcomes
// // //           cy.url().should('include', '/dashboard'); // Replace with your expected URL
// // //         });
// // //       });
// // //     });
// // //   });

// // describe('my first test case', () => {
// // //     let testdata: any;
// // //     beforeEach('load home page url', () => {
// // //         cy.visit('http://localhost:4200')
// // //     })

// // //     it('look the word', () => {
// // //         cy.fixture("request.json").then((data) => {
// // //             testdata = data.userloginReqData
// // //             testdata.forEach((user: any) => {
// // //                 cy.get("#username").type(user.username)
// // //                 cy.get("#password").type(user.password)
// // //                 cy.get('#login-button').click()
// // //                 cy.get("#username").clear()
// // //                 cy.get("#password").clear()
// // //             });
// // //         })
        
// // //     })
// // // })

// // describe('Simple Excel Read File test', () => {
// //     // it('Logs in a user and checks for a welcome message', () => {
    
// //     // cy.get('#username').type('username')
// //     // cy.get('#password').type('password')
// //     const filePath = 'UserData.ods'; // Specify the path to your test Excel file

// //     it('fills the form with data from Excel and submits', async () => {
// //         cy.visit('http://localhost:4200')
// //         // const data = readExcelFile('cypress/fixtures/UserData1.xlsx'); // Adjust path as necessary
// //         const data = await readExcelFile('cypress/fixtures/UserData1.xlsx')
// //         cy.log("read data", data)
// //         data.forEach((row: any) => {
// //           cy.get('#username').type(row.username);
// //           cy.get('#password').type(row.Password);
// //         //   cy.get('button[type="submit"]').click();
// //         });
// //       });
// //     // cy.get('input[type="file"]').attachFile(filePath)
// //     // cy.get('#tableData').should('be.visible')

// //     // cy.get('#tableData tbody tr').each(($row, index) => {
// //     //     // Assuming the table has three columns
// //     //     const rowData: any[] = [];
// //     //     cy.wrap($row).find('td').each(($cell) => {
// //     //       rowData.push($cell.text().trim());
// //     //     }).then(() => {
// //     //       // Now rowData contains the data from the current row
// //     //       // For example, typing the first column data into an input field
// //     //       cy.get(`#inputField${index + 1}`).type(rowData[0]); // Replace with your input field selector
// //     //       // If you need to type other columns, you can add more logic here
// //     //     });
// //     //   });

// //     // cy.get('#tableData tbody tr').should('have.length.greaterThan', 0); // Check if there's at least one row

// //     // // Optionally, check for specific content in the table
// //     // cy.get('#tableData tbody tr').first().contains('Username');



// //     //   .should('be.visible').contains('Username')
// //     //   .and('contain', 'laps');
// //     // cy.get('#login-button').click()
// //     // cy.url().should('include', '/dashboard')
// //     // cy.contains('Welcome, username')
// //     // })
// // })

// // genToken() {
// //   let timestamp = new Date().getTime();
// //   let RanNum = Math.floor(Math.random() * 90000000) + 10000000;
// //   this.sys_token = (timestamp.toString()) + "_" + (RanNum.toString());
// //   return this.encMyReq(this.sys_token);
// // }


// // describe('Read Excel and show the data', () => {

// //   const mockLoginResponse = {
// //     "StatusCode": "000",
// //     "UserName": "GANESH KUMAR B",
// //     "Status": "Success",
// //     "Orgscode": "469",
// //     "LPuserID": "SAIGANESH",
// //     "UserGroups": [
// //       "1556669",
// //       "1556648",
// //       "1556728",
// //       "1556690",
// //       "1556684"
// //     ],
// //     "supervoiser": "N",
// //     "token": "U2FsdGVkX18QFEslMeGH5HX6JEzXHXzHZWqc+gD1C1ijWsrIm2LV+6qgo28U5Cj9",
// //     "orgLocationList": [
// //       "10001",
// //       "10271",
// //       "11103"
// //     ]
// //   };
  
// //   beforeEach(() => {
// //     cy.visit('http://localhost:4200')
// //     cy.intercept('post', 'http://172.30.1.116:9092/lendperfect/LOSMobileRestServices/LoginService', (req) => {
// //       req.reply({
// //         statusCode: 200,
// //         body: mockLoginResponse
// //       })
// //     }).as('loginRequest');
// //     cy.window().then((win) => {
// //       cy.stub(win, 'alert').as('alert');  // Stubbing alert method
// //     });
// //   })

  
// //   // it('should show an error for empty credentials', () => {
// //   //   cy.contains('Login').click()
// //   //   cy.get('@alert').should('be.calledWith', 'Username and Password is wrong');
// //   // })

// //   // it('should show an error for invalid credentials', () => {
// //   //   const username = 'validUser';
// //   //   const password = 'validPassword';
// //   //   cy.get("#username").type(username, { delay: 300})
// //   //   cy.get("#password").type(password, { delay: 300})
// //   //   cy.contains('Login').click()
// //   //   cy.get('@alert').should('be.calledWith', 'Username and Password is wrong');
// //   // })

// //   // it('should log in successfully with valid credentials', () => {
// //   //   const username = 'SAIGANESH';
// //   //   const password = 'akzsk';
// //   //   cy.get("#username").type(username, { delay: 300})
// //   //   cy.get("#password").type(password, { delay: 300})
// //   //   cy.contains('Login').click()
// //   //   cy.get('@alert').should('be.calledWith', 'Password is wrong');
// //   // })

// //   // it('should log in successfully with valid credentials', () => {
// //   //   const username = 'sgrfgsfr';
// //   //   const password = 'laps';
// //   //   cy.get("#username").type(username, { delay: 300})
// //   //   cy.get("#password").type(password, { delay: 300})
// //   //   cy.contains('Login').click()
// //   //   cy.get('@alert').should('be.calledWith', 'Username is wrong');
// //   // })

// //   it('should log in successfully with valid credentials', () => {
// //     const username = 'SAIGANESH';
// //     const password = 'laps';
// //     cy.get("#username").type(username, { delay: 200})
// //     cy.get("#password").type(password, { delay: 200})
// //     cy.contains('Login').click()
// //     cy.wait('@loginRequest');
// //     cy.get('@loginRequest').should((xhr: any) => {
// //       expect(xhr.response.body.StatusCode).to.equal('000');
// //     });

// //     // cy.window().then((window) => {
// //     //   expect(window.localStorage.getItem('username')).to.equal('SAIGANESH');
// //     //   expect(window.localStorage.getItem('BranchCode')).to.equal('469');
// //     //   expect(window.localStorage.getItem('roname')).to.equal('GANESH KUMAR B');
// //     // });
// //     // cy.url().should('eq', 'http://localhost:4200/dashboard');
// //   })

// //   // it('should call the login API with valid credentials', () => {
// //   //   const username = 'SAIGANESH';
// //   //   const password = 'laps';

// //   //   // Stub the login API request
// //   //   cy.intercept('POST', '/api/login', {
// //   //     statusCode: 200,
// //   //     body: { token: 'validToken' },
// //   //   }).as('loginRequest');

// //   //   // Type the username and password into the respective fields
// //   //   cy.get('input[name="username"]').type(username);
// //   //   cy.get('input[name="password"]').type(password);

// //   //   // Click the login button
// //   //   cy.get('button[type="submit"]').click();

// //   //   // Wait for the login request to complete
// //   //   cy.wait('@loginRequest');

// //   //   // Check that the login API was called
// //   //   cy.get('@loginRequest').its('request.body').should('deep.include', {
// //   //     username: username,
// //   //     password: password,
// //   //   });

// //   //   // Optionally, check if the user is redirected after successful login
// //   //   cy.url().should('include', '/dashboard');
// //   // });
// // })

// // function generateToken (sk) {
// //   let timestamp = new Date().getTime();
// //   let RanNum = Math.floor(Math.random() * 90000000) + 10000000;
// //   let sys_token = (timestamp.toString()) + "_" + (RanNum.toString());
// //   let encryptedToken = CryptoJS.AES.encrypt(JSON.stringify(sys_token), window.atob(sk.substring(15,39)));
// //   let AuthToken = encryptedToken.toString();
// //   return AuthToken;
// // }

// describe('Intercept with Http service and get Login Response', () => {
//   beforeEach(() => {
//     cy.visit('/');
//   })

//   // it('InValid Token with correct credential', async () => {
//   //   const username = 'SAIGANESH';
//   //   const password = 'laps';
//   //   const deviceID = '0a5eb22847dec0de';
//   //   const _sk = 'faEVc/e+3c=KEgMc3lzYXJjQDEyMzRJTkZPQA==dt7D+EgQD/egEJCAyDAV4HdvR'

//   //   cy.get("#username").type(username)
//   //   cy.get("#password").type(password)
    
//   //   cy.contains('Login').click()

//   //   let AuthToken = await generateToken()
    
    
//   //   //EncryptDeviceID
//   //   let EncryptedDeviceID = await encryptData(deviceID)
    

//   //   //EncryptRequest
//   //   let body = {
//   //     "Login": {
//   //       "Loginuser": username,
//   //       "Loginpasswd": password,
//   //       "IMEI": deviceID,
//   //       "LLdate": "",
//   //       "Version": '0.0.1',
//   //       "Brach_code": "",
//   //       "PdTab": "N",
//   //       "Module": "VL"
//   //     },
//   //     "token": AuthToken
//   //   }

//   //   // let encrypteBody = CryptoJS.AES.encrypt(JSON.stringify(body), window.atob(_sk.substring(15,39)));
//   //   // let encryptedFinalBody = { data: encrypteBody.toString() }

//   //   cy.log("body from globalFunction.js", body)
//   //   // let encrypteBody = await encryptBody(JSON.stringify(body))
//   //   // let encryptedFinalBody = { data: encrypteBody.toString() }
//   //   cy.encryptBody(body, _sk).then((data) => {
//   //     let encryptedFinalBody = data
//   //     cy.log("AuthToken from globalFunction.js", AuthToken)   
//   //     cy.log("EncryptedDeviceID from globalFunction.js", EncryptedDeviceID) 
//   //     cy.log("encryptedFinalBody from globalFunction.js", encryptedFinalBody)
//   //     cy.wait(500)
//   //     cy.request({
//   //       url: 'http://172.30.1.116:9092/lendperfect/LOSMobileRestServices/LoginService', // replace with your GraphQL endpoint
//   //       method: 'POST',
//   //       body: encryptedFinalBody,
//   //       headers: {
//   //       "Accept": "application/json",
//   //       "Content-Type": "application/json",
//   //       "token": AuthToken,
//   //       "deviceId": EncryptedDeviceID,
//   //       }
//   //       }).then(async(response: any) => {        
//   //         expect(response.status).to.equal(200);
//   //         let responseStatus = response.body
//   //         let encrypteBody = await decryptData(responseStatus)
//   //         let finalResponse = JSON.parse(encrypteBody)
//   //         console.log("finalResponse", finalResponse);
//   //         expect(finalResponse.StatusCode).to.equals('001');
//   //         expect(finalResponse.Status).to.equals('Invalid Token');
          
//   //       })
//   //   })
    

    
//   //   // // console.log("body", body)
//   //   // // console.log("encryptedFinalBody", encryptedFinalBody)
//   //   // // console.log("AuthToken", AuthToken)
//   //   // // console.log("EncryptedDeviceID", EncryptedDeviceID)
    
//   // })

//   // it('Login with Invalid credential', () => {
//   //   const username = 'SAIGANESH3';
//   //   const password = 'laps';
//   //   const _sk = 'faEVc/e+3c=KEgMc3lzYXJjQDEyMzRJTkZPQA==dt7D+EgQD/egEJCAyDAV4HdvR'
//   //   const deviceID = '0a5eb22847dec0de'
//   //   cy.get("#username").type(username, { delay: 200})
//   //   cy.get("#password").type(password, { delay: 200})
//   //   cy.contains('Login').click();

//   //     //Toekn Generate
//   //   let timestamp = new Date().getTime();
//   //   let RanNum = Math.floor(Math.random() * 90000000) + 10000000;
//   //   let sys_token = (timestamp.toString()) + "_" + (RanNum.toString());
//   //   let encryptedToken = CryptoJS.AES.encrypt(JSON.stringify(sys_token), window.atob(_sk.substring(15,39)));
//   //   let AuthToken = encryptedToken.toString();

//   //   let Enctimestamp = new Date().getTime();
//   //   let EncRanNum = Math.floor(Math.random() * 90000000) + 10000000;
//   //   let Encsys_token = (Enctimestamp.toString()) + "_" + (EncRanNum.toString());
//   //   let EncencryptedToken = CryptoJS.AES.encrypt(JSON.stringify(Encsys_token), window.atob(_sk.substring(15,39)));
//   //   let EncAuthToken = EncencryptedToken.toString();

//   //   //EncryptDeviceID
//   //   let encryptedID = CryptoJS.AES.encrypt(JSON.stringify(deviceID), window.atob(_sk.substring(15,39)));
//   //   let EncryptedDeviceID =  encryptedID.toString();

//   //   //EncryptRequest

//   //   let body = {
//   //     "Login": {
//   //       "Loginuser": username,
//   //       "Loginpasswd": password,
//   //       "IMEI": deviceID,
//   //       "LLdate": "",
//   //       "Version": '0.0.1',
//   //       "Brach_code": "",
//   //       "PdTab": "N",
//   //       "Module": "VL"
//   //     },
//   //     "token": AuthToken
//   //   }

//   //   let encrypteBody = CryptoJS.AES.encrypt(JSON.stringify(body), window.atob(_sk.substring(15,39)));
//   //   let encryptedFinalBody = { data: encrypteBody.toString() }

//   //   console.log("body", body)
//   //   console.log("encryptedFinalBody", encryptedFinalBody)
//   //   console.log("AuthToken", AuthToken)
//   //   console.log("EncryptedDeviceID", EncryptedDeviceID)

//   //   cy.request({
//   //     url: 'http://172.30.1.116:9092/lendperfect/LOSMobileRestServices/LoginService', // replace with your GraphQL endpoint
//   //     method: 'POST',
//   //     body: encryptedFinalBody,
//   //     headers: {
//   //     "Accept": "application/json",
//   //     "Content-Type": "application/json",
//   //     "token": AuthToken,
//   //     "deviceId": EncryptedDeviceID,
//   //     }
//   //     }).then((response: any) => {        
//   //       expect(response.status).to.equal(200);
//   //       let responseStatus = response.body
//   //       var decryptedBytes = CryptoJS.AES.decrypt(responseStatus.data, window.atob(_sk.substring(15,39)));
//   //       if (decryptedBytes) {
//   //         let  decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
//   //         let finalResponse = JSON.parse(decryptedMessage)
//   //         console.log("finalResponse", finalResponse);
//   //         expect(finalResponse.StatusCode).to.equals('001');
//   //         expect(finalResponse.Status).to.equals('Invalid User Name/Password');
          
//   //       }
//   //     })
//   // })

//   it('Login with correct credential', () => {
//     const username1 = 'SAIGANESH';
//     const username = 'SAIGANESH';
//     const password = 'laps';
//     const _sk = 'faEVc/e+3c=KEgMc3lzYXJjQDEyMzRJTkZPQA==dt7D+EgQD/egEJCAyDAV4HdvR'
//     const deviceID = '0a5eb22847dec0de'
//     cy.get("#username").type(username, { delay: 200})
//     cy.get("#password").type(password, { delay: 200})
//     cy.contains('Login').click();

//       //Toekn Generate
//     let timestamp = new Date().getTime();
//     let RanNum = Math.floor(Math.random() * 90000000) + 10000000;
//     let sys_token = (timestamp.toString()) + "_" + (RanNum.toString());
//     let encryptedToken = CryptoJS.AES.encrypt(JSON.stringify(sys_token), window.atob(_sk.substring(15,39)));
//     let AuthToken = encryptedToken.toString();

//     let Enctimestamp = new Date().getTime();
//     let EncRanNum = Math.floor(Math.random() * 90000000) + 10000000;
//     let Encsys_token = (Enctimestamp.toString()) + "_" + (EncRanNum.toString());
//     let EncencryptedToken = CryptoJS.AES.encrypt(JSON.stringify(Encsys_token), window.atob(_sk.substring(15,39)));
//     let EncAuthToken = EncencryptedToken.toString();

//     //EncryptDeviceID
//     let encryptedID = CryptoJS.AES.encrypt(JSON.stringify(deviceID), window.atob(_sk.substring(15,39)));
//     let EncryptedDeviceID =  encryptedID.toString();

//     //EncryptRequest

//     let body = {
//       "Login": {
//         "Loginuser": username,
//         "Loginpasswd": password,
//         "IMEI": deviceID,
//         "LLdate": "",
//         "Version": '0.0.1',
//         "Brach_code": "",
//         "PdTab": "N",
//         "Module": "VL"
//       },
//       "token": AuthToken
//     }

//     let encrypteBody = CryptoJS.AES.encrypt(JSON.stringify(body), window.atob(_sk.substring(15,39)));
//     let encryptedFinalBody = { data: encrypteBody.toString() }

//     console.log("body", body)
//     console.log("encryptedFinalBody", encryptedFinalBody)
//     console.log("AuthToken", AuthToken)
//     console.log("EncryptedDeviceID", EncryptedDeviceID)

//     cy.request({
//       url: 'http://172.30.1.116:9092/lendperfect/LOSMobileRestServices/LoginService', // replace with your GraphQL endpoint
//       method: 'POST',
//       body: encryptedFinalBody,
//       headers: {
//       "Accept": "application/json",
//       "Content-Type": "application/json",
//       "token": AuthToken,
//       "deviceId": EncryptedDeviceID,
//       }
//       }).then((response: any) => {        
//         expect(response.status).to.equal(200);
//         let responseStatus = response.body
//         var decryptedBytes = CryptoJS.AES.decrypt(responseStatus.data, window.atob(_sk.substring(15,39)));
//         if (decryptedBytes) {
//           let  decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
//           let finalResponse = JSON.parse(decryptedMessage)
//           cy.log("finalResponse.LPuserID", finalResponse.LPuserID);
//           expect(finalResponse.StatusCode).to.equals('000');
//           cy.window().then((window) => {
//             window.localStorage.setItem('username', finalResponse.LPuserID);
//           });
//         }
//       })
//   })
// })

// describe('Check MPIN Screen', () =>{
// //   beforeEach(() => {
// //     // Get the saved auth token before visiting the page
// //     cy.window().then((window) => {
// //         const authToken = window.localStorage.getItem('username');
// //         if (authToken) {
// //             window.localStorage.setItem('username', authToken);
// //         }
// //     });
// //     cy.visit('/mpin');
// // });

// beforeEach(() => {
//   cy.window().then((window) => {
//     const username = window.localStorage.getItem('username');
//     if (username) {
//       window.localStorage.setItem('username', username);
//     }
//   });
//   cy.wait(2000);
//   cy.visit('/mpin');
//    // Give time for API calls or UI rendering
// });


//   it ('Check Mpin Status', () => {
//     const _sk = 'faEVc/e+3c=KEgMc3lzYXJjQDEyMzRJTkZPQA==dt7D+EgQD/egEJCAyDAV4HdvR'
//     const deviceID = '0a5eb22847dec0de'
//     const username = 'SAIGANESH';
//     cy.log("username", username);
//     let timestamp = new Date().getTime();
//     let RanNum = Math.floor(Math.random() * 90000000) + 10000000;
//     let sys_token = (timestamp.toString()) + "_" + (RanNum.toString());
//     let encryptedToken = CryptoJS.AES.encrypt(JSON.stringify(sys_token), window.atob(_sk.substring(15,39)));
//     let AuthToken = encryptedToken.toString();

//     let encryptedID = CryptoJS.AES.encrypt(JSON.stringify(deviceID), window.atob(_sk.substring(15,39)));
//     let EncryptedDeviceID =  encryptedID.toString();

//     let body = {
//       "userId": username,
//       "requestType": "GET",
//       "token": AuthToken
//     }

//     let encrypteBody = CryptoJS.AES.encrypt(JSON.stringify(body), window.atob(_sk.substring(15,39)));
//     let encryptedFinalBody = { data: encrypteBody.toString() }
    
//     cy.request({
//       url: 'http://172.30.1.116:9092/lendperfect/LOSMobileRestServices/getMpinDetails', // replace with your GraphQL endpoint
//       method: 'POST',
//       body: encryptedFinalBody,
//       headers: {
//       "Accept": "application/json",
//       "Content-Type": "application/json",
//       "token": AuthToken,
//       "deviceId": EncryptedDeviceID,
//       }
//       }).then((response: any) => {        
//         expect(response.status).to.equal(200);
//         let responseStatus = response.body
//         var decryptedBytes = CryptoJS.AES.decrypt(responseStatus.data, window.atob(_sk.substring(15,39)));
//         if (decryptedBytes) {
//           let  decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
//           let finalResponse = JSON.parse(decryptedMessage)

//           expect(finalResponse.map.errorCode).to.equals('000');
//         }
//       })
//     // cy.get('Welcome to our test project').should('be.visible');
//   })
// })











// // describe('Login Flow', () => {
// //   it('should log in successfully and store user info in localStorage', () => {
// //     const username = 'SAIGANESH';
// //     const password = 'laps';

// //     // Visit the login page of your app
// //     cy.visit('/http://localhost:4200');  // Adjust the URL if needed for your login page

// //     // Fill out the login form
// //     cy.get('input[name="username"]').type(username);  // Adjust if the name attribute is different
// //     cy.get('input[name="password"]').type(password);  // Adjust if the name attribute is different

// //     // Submit the form by clicking the login button
// //     cy.get('button[type="submit"]').click();  // Adjust this selector if necessary

// //     // Wait for the login API call (POST /LoginService)
// //     cy.intercept('post', 'http://172.30.1.116:9092/lendperfect/LOSMobileRestServices/LoginService').as('loginApi');  // Make sure the URL matches your API endpoint

// //     // Wait for the login response to finish
// //     cy.wait('@loginApi').then((interception) => {
// //       // You can assert here that the API call was successful
// //       expect(interception.response.statusCode).to.eq(200);

// //       // Check the response body (if needed for validation)
// //       const loginResponse = interception.response.body;
// //       expect(loginResponse.StatusCode).to.equal('000');  // Assuming '000' means success

// //       // Validate localStorage updates
// //       cy.window().then((win) => {
// //         const usernameStored = win.localStorage.getItem('username');
// //         const branchCodeStored = win.localStorage.getItem('BranchCode');
// //         const ronameStored = win.localStorage.getItem('roname');

// //         // Assert that the values are correctly stored in localStorage
// //         expect(usernameStored).to.equal(loginResponse.LPuserID);
// //         expect(branchCodeStored).to.equal(loginResponse.Orgscode);
// //         expect(ronameStored).to.equal(loginResponse.UserName || username);
// //       });

// //       // Check for redirection to the dashboard or another page after successful login
// //       cy.url().should('include', '/dashboard');  // Adjust URL based on your app's behavior
// //     });
// //   });

// //   it('should show an alert if login fails with incorrect credentials', () => {
// //     const username = 'wronguser';
// //     const password = 'wrongpassword';

// //     // Visit the login page of your app
// //     cy.visit('/login');  // Adjust URL if necessary

// //     // Fill out the login form with incorrect credentials
// //     cy.get('input[name="username"]').type(username);
// //     cy.get('input[name="password"]').type(password);

// //     // Submit the form
// //     cy.get('button[type="submit"]').click();

// //     // Wait for the login API response
// //     cy.intercept('POST', '/LoginService').as('loginApiError');

// //     // Wait for the response and check if it's an error
// //     cy.wait('@loginApiError').then((interception) => {
// //       const responseBody = interception.response.body;
// //       expect(interception.response.statusCode).to.eq(200); // Ensure the response is OK, but has errors
// //       expect(responseBody.StatusCode).to.equal('999');  // Assuming '999' indicates an error, adjust as needed

// //       // Check if an alert appears with the correct message
// //       cy.on('window:alert', (alertText) => {
// //         expect(alertText).to.equal('Invalid credentials');
// //       });
// //     });
// //   });

// //   it('should show an alert if login response is undefined', () => {
// //     // Simulate an undefined response by intercepting the API with no response body
// //     cy.intercept('POST', '/LoginService', {
// //       statusCode: 200,
// //       body: undefined,
// //     }).as('loginApiError');

// //     // Visit the login page
// //     cy.visit('/login');

// //     // Fill out the login form
// //     cy.get('input[name="username"]').type('testuser');
// //     cy.get('input[name="password"]').type('password123');
// //     cy.get('button[type="submit"]').click();

// //     // Wait for the login response
// //     cy.wait('@loginApiError').then(() => {
// //       // Check if an alert appears for the undefined response
// //       cy.on('window:alert', (alertText) => {
// //         expect(alertText).to.equal('login Response Undefined');
// //       });
// //     });
// //   });
// // });
