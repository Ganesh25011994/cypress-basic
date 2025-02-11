import * as CryptoJS from 'crypto-js';

describe('Intercept with Http service and get Login Response', () => {
    before(() => {
      cy.clearLocalStorage()
    })

    beforeEach(() => {
      cy.visit('/');
      
    })

    it('Test with Empty Username and Password', () => {
      cy.contains('Welcome Back')
      cy.wait(1000)
      cy.get('#login-button').click()
      cy.contains("Enter UserName")
      cy.contains("Enter Password")
    })

    it('Test with Empty Username', () => {
      cy.contains('Welcome Back')
      cy.wait(1000)
      cy.get('#login-button').click()
      cy.contains("Enter UserName")
    })

    it('Test with Empty Password', () => {
      cy.contains('Welcome Back')
      cy.wait(1000)
      cy.get("#username").type("SAIGANESH", { delay: 100})
      cy.get('#login-button').click()
      cy.contains("Enter Password")
    })
    
    it('Login with InValid Token', async () => {
      const username = 'SAIGANESH';
      const password = 'laps';
      const deviceID = '0a5eb22847dec0de';
      const _sk = 'faEVc/e+3c=KEgMc3lzYXJjQDEyMzRJTkZPQA==dt7D+EgQD/egEJCAyDAV4HdvR'
  
      cy.get("#username").type(username, { delay: 100})
      cy.get("#password").type(password, { delay: 100})
      
      cy.contains('Login').click()
  
      // let AuthToken = await generateToken()
      
      let timestamp = new Date().getTime();
      let RanNum = Math.floor(Math.random() * 90000000) + 10000000;
      let sys_token = (timestamp.toString()) + "_" + (RanNum.toString());
      let encryptedToken = CryptoJS.AES.encrypt(JSON.stringify(sys_token), window.atob(_sk.substring(15,39)));
      let AuthToken = encryptedToken.toString();

      let Enctimestamp = new Date().getTime();
      let EncRanNum = Math.floor(Math.random() * 90000000) + 10000000;
      let Encsys_token = (Enctimestamp.toString()) + "_" + (EncRanNum.toString());
      let EncencryptedToken = CryptoJS.AES.encrypt(JSON.stringify(Encsys_token), window.atob(_sk.substring(15,39)));
      let EncAuthToken = EncencryptedToken.toString();
      
      //EncryptDeviceID
      // let EncryptedDeviceID = await encryptData(deviceID)
      let encryptedID = CryptoJS.AES.encrypt(JSON.stringify(deviceID), window.atob(_sk.substring(15,39)));
      let EncryptedDeviceID =  encryptedID.toString();
      
      //EncryptRequest
      let body = {
        "Login": {
          "Loginuser": username,
          "Loginpasswd": password,
          "IMEI": deviceID,
          "LLdate": "",
          "Version": '0.0.1',
          "Brach_code": "",
          "PdTab": "N",
          "Module": "VL"
        },
        "token": AuthToken
      }
  
      // let encrypteBody = CryptoJS.AES.encrypt(JSON.stringify(body), window.atob(_sk.substring(15,39)));
      // let encryptedFinalBody = { data: encrypteBody.toString() }
  
      cy.log("body from globalFunction.js", body)

      let encrypteBody = CryptoJS.AES.encrypt(JSON.stringify(body), window.atob(_sk.substring(15,39)));
      let encryptedFinalBody = { data: encrypteBody.toString() }
  
      // let encrypteBody = await encryptBody(JSON.stringify(body))
      // let encryptedFinalBody = { data: encrypteBody.toString() }

      // cy.encryptBody(body, _sk).then((data) => {
        // let encryptedFinalBody = data
        // cy.log("AuthToken from globalFunction.js", AuthToken)   
        // cy.log("EncryptedDeviceID from globalFunction.js", EncryptedDeviceID) 
        // cy.log("encryptedFinalBody from globalFunction.js", encryptedFinalBody)
        // cy.wait(500)
        cy.request({
          url: 'http://172.30.1.116:9093/lendperfect/LOSMobileRestServices/LoginService', // replace with your GraphQL endpoint
          method: 'POST',
          body: encryptedFinalBody,
          headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "token": EncAuthToken,
          "deviceId": EncryptedDeviceID,
          }
          }).then(async(response: any) => {        
            expect(response.status).to.equal(200);
            let responseStatus = response.body
            // let encrypteBody = await decryptData(responseStatus)
            var decryptedBytes = CryptoJS.AES.decrypt(responseStatus.data, window.atob(_sk.substring(15,39)));
          if (decryptedBytes) {
            let decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
            let finalResponse = JSON.parse(decryptedMessage)
            // let finalResponse = JSON.parse(encrypteBody)
            console.log("finalResponse", finalResponse);
            expect(finalResponse.StatusCode).to.equals('001');
            expect(finalResponse.Status).to.equals('Invalid Token');
          }
        // })
      })
      
  
      
      // // console.log("body", body)
      // // console.log("encryptedFinalBody", encryptedFinalBody)
      // // console.log("AuthToken", AuthToken)
      // // console.log("EncryptedDeviceID", EncryptedDeviceID)
      
    })
  
    it('Login with Invalid credential', () => {
      const username = 'SAIGANESH3';
      const password = 'laps';
      const _sk = 'faEVc/e+3c=KEgMc3lzYXJjQDEyMzRJTkZPQA==dt7D+EgQD/egEJCAyDAV4HdvR'
      const deviceID = '0a5eb22847dec0de'
      cy.get("#username").type(username, { delay: 100})
      cy.get("#password").type(password, { delay: 100})
      cy.contains('Submit').click();
  
        //Toekn Generate
      let timestamp = new Date().getTime();
      let RanNum = Math.floor(Math.random() * 90000000) + 10000000;
      let sys_token = (timestamp.toString()) + "_" + (RanNum.toString());
      let encryptedToken = CryptoJS.AES.encrypt(JSON.stringify(sys_token), window.atob(_sk.substring(15,39)));
      let AuthToken = encryptedToken.toString();
  
      let Enctimestamp = new Date().getTime();
      let EncRanNum = Math.floor(Math.random() * 90000000) + 10000000;
      let Encsys_token = (Enctimestamp.toString()) + "_" + (EncRanNum.toString());
      let EncencryptedToken = CryptoJS.AES.encrypt(JSON.stringify(Encsys_token), window.atob(_sk.substring(15,39)));
      let EncAuthToken = EncencryptedToken.toString();
  
      //EncryptDeviceID
      let encryptedID = CryptoJS.AES.encrypt(JSON.stringify(deviceID), window.atob(_sk.substring(15,39)));
      let EncryptedDeviceID =  encryptedID.toString();
  
      //EncryptRequest
  
      let body = {
        "Login": {
          "Loginuser": username,
          "Loginpasswd": password,
          "IMEI": deviceID,
          "LLdate": "",
          "Version": '0.0.1',
          "Brach_code": "",
          "PdTab": "N",
          "Module": "VL"
        },
        "token": AuthToken
      }
  
      let encrypteBody = CryptoJS.AES.encrypt(JSON.stringify(body), window.atob(_sk.substring(15,39)));
      let encryptedFinalBody = { data: encrypteBody.toString() }
  
      console.log("body", body)
      console.log("encryptedFinalBody", encryptedFinalBody)
      console.log("AuthToken", AuthToken)
      console.log("EncryptedDeviceID", EncryptedDeviceID)
  
      cy.request({
        url: 'http://172.30.1.116:9093/lendperfect/LOSMobileRestServices/LoginService', // replace with your GraphQL endpoint
        method: 'POST',
        body: encryptedFinalBody,
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "token": AuthToken,
        "deviceId": EncryptedDeviceID,
        }
        }).then((response: any) => {        
          expect(response.status).to.equal(200);
          let responseStatus = response.body
          var decryptedBytes = CryptoJS.AES.decrypt(responseStatus.data, window.atob(_sk.substring(15,39)));
          if (decryptedBytes) {
            let  decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
            let finalResponse = JSON.parse(decryptedMessage)
            console.log("finalResponse", finalResponse);
            expect(finalResponse.StatusCode).to.equals('001');
            expect(finalResponse.Status).to.equals('Invalid User Name/Password');
            
          }
        })
    })
  
    it('Login with correct credential', () => {
      const username = 'GLRO';
      const password = 'laps';
      const _sk = 'faEVc/e+3c=KEgMc3lzYXJjQDEyMzRJTkZPQA==dt7D+EgQD/egEJCAyDAV4HdvR'
      const deviceID = '0a5eb22847dec0de'
      cy.get("#username").type(username, { delay: 100})
      cy.get("#password").type(password, { delay: 100})
      cy.contains('Submit').click();
  
        //Toekn Generate
      let timestamp = new Date().getTime();
      let RanNum = Math.floor(Math.random() * 90000000) + 10000000;
      let sys_token = (timestamp.toString()) + "_" + (RanNum.toString());
      let encryptedToken = CryptoJS.AES.encrypt(JSON.stringify(sys_token), window.atob(_sk.substring(15,39)));
      let AuthToken = encryptedToken.toString();
  
      let Enctimestamp = new Date().getTime();
      let EncRanNum = Math.floor(Math.random() * 90000000) + 10000000;
      let Encsys_token = (Enctimestamp.toString()) + "_" + (EncRanNum.toString());
      let EncencryptedToken = CryptoJS.AES.encrypt(JSON.stringify(Encsys_token), window.atob(_sk.substring(15,39)));
      let EncAuthToken = EncencryptedToken.toString();
  
      //EncryptDeviceID
      let encryptedID = CryptoJS.AES.encrypt(JSON.stringify(deviceID), window.atob(_sk.substring(15,39)));
      let EncryptedDeviceID =  encryptedID.toString();
  
      //EncryptRequest
  
      let body = {
        "Login": {
          "Loginuser": username,
          "Loginpasswd": password,
          "IMEI": deviceID,
          "LLdate": "",
          "Version": '0.0.1',
          "Brach_code": "",
          "PdTab": "N",
          "Module": "GL"
        },
        "token": AuthToken
      }
  
      let encrypteBody = CryptoJS.AES.encrypt(JSON.stringify(body), window.atob(_sk.substring(15,39)));
      let encryptedFinalBody = { data: encrypteBody.toString() }
  
      console.log("body", body)
      console.log("encryptedFinalBody", encryptedFinalBody)
      console.log("AuthToken", AuthToken)
      console.log("EncryptedDeviceID", EncryptedDeviceID)
  
      cy.request({
        url: 'http://172.30.1.116:9093/lendperfect/LOSMobileRestServices/LoginService', // replace with your GraphQL endpoint
        method: 'POST',
        body: encryptedFinalBody,
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "token": AuthToken,
        "deviceId": EncryptedDeviceID,
        }
        }).then((response: any) => {        
          expect(response.status).to.equal(200);
          let responseStatus = response.body
          var decryptedBytes = CryptoJS.AES.decrypt(responseStatus.data, window.atob(_sk.substring(15,39)));
          if (decryptedBytes) {
            let decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
            let finalResponse = JSON.parse(decryptedMessage)
            cy.log("finalResponse.LPuserID", finalResponse.LPuserID);
            expect(finalResponse.StatusCode).to.equals('000');
            cy.window().then((window) => {
              window.localStorage.setItem('username', finalResponse.LPuserID);
            });
            cy.url().should('include', '/mpin');
          }
        })
    })

    after(() => {
      cy.window().then((window) => {
        const username = window.localStorage.getItem('username');
        if (username) {
          cy.saveLocalStorage('username', username);
        }
      });
      
    });
})