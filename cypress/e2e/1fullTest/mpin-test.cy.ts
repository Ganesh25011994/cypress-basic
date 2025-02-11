import * as CryptoJS from 'crypto-js';
import Papa from 'papaparse';

describe('Check MPIN Screen', () =>{    
  beforeEach(() => {
    cy.window().then((window) => {
      // const username = window.localStorage.getItem('username');
      // if (username) {
        localStorage.removeItem("personalgo")
        localStorage.setItem('username', "GLRO");
        localStorage.setItem('loginResponse', '{"StatusCode":"000","UserName":"GOLD RO","Status":"Success","Orgscode":"469","LPuserID":"GLRO","UserGroups":["1556700"],"token":"U2FsdGVkX1/4WNXs5iI0H0jLvM756WdLFQfPmgAj6/beId8eYRrP00Sj6/uMIXZ+","orgLocationList":["10281","10271"]}')
      // }
    });
    cy.wait(2000);
    cy.visit('/mpin');

    const _sk = 'faEVc/e+3c=KEgMc3lzYXJjQDEyMzRJTkZPQA==dt7D+EgQD/egEJCAyDAV4HdvR'
    const deviceID = '0a5eb22847dec0de'
    const username = window.localStorage.getItem('username');
    cy.log("username", username);
    
    let timestamp = new Date().getTime();
    let RanNum = Math.floor(Math.random() * 90000000) + 10000000;
    let sys_token = (timestamp.toString()) + "_" + (RanNum.toString());
    let encryptedToken = CryptoJS.AES.encrypt(JSON.stringify(sys_token), window.atob(_sk.substring(15,39)));
    let AuthToken = encryptedToken.toString();

    let encryptedID = CryptoJS.AES.encrypt(JSON.stringify(deviceID), window.atob(_sk.substring(15,39)));
    let EncryptedDeviceID =  encryptedID.toString();

    let body = {
      "userId": username,
      "requestType": "GET",
      "token": AuthToken
    }

    let encrypteBody = CryptoJS.AES.encrypt(JSON.stringify(body), window.atob(_sk.substring(15,39)));
    let encryptedFinalBody = { data: encrypteBody.toString() }
    
    cy.request({
      url: 'http://172.30.1.116:9093/lendperfect/LOSMobileRestServices/getMpinDetails', // replace with your GraphQL endpoint
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
        cy.log("finalResponse-mpinStatus", finalResponse);
        // expect(finalResponse.map.errorCode).to.equals('000');
        // cy.contains(`Welcome ${username}`)
      }
    })
  });
    
  it ('Check With InCorrect Mpin', () => {
    const googlesheetURLMpin = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSZt0bGFBVni2l5Dsp58PByWuQJhF8Alo0-hwne8TipP_kKA0S9XH7mxs3zbw6tP__JUWEwwRwECyFj/pub?gid=403546112&single=true&output=csv'
    
    cy.request({
      url: googlesheetURLMpin,
      method: 'GET',
      encoding: 'utf8'
    }).then((data) => {
      cy.log("data-googlesheetURL", data)
      Papa.parse(data.body, {
        complete: (result) => {
          cy.log("Papa.parse", result)
          expect(result.data).to.have.length.greaterThan(0); // Example assertion
          let MpinDetailsSheetData = result.data
          let Mpin: string = MpinDetailsSheetData[1][2]
          cy.log("Papa.parse-Mpin", Mpin)
          cy.get('#otp1').type(Mpin.charAt(0), {delay: 100})
          cy.get('#otp2').type(Mpin.charAt(1), {delay: 100})
          cy.get('#otp3').type(Mpin.charAt(2), {delay: 100})
          cy.get('#otp4').type(Mpin.charAt(3), {delay: 100})
          cy.contains('Login').click()
          cy.wait(1000)
          // cy.window().then((win) => {
          //   cy.stub(win, 'alert').as('Incorrect MPIN!');  // Stubbing alert method
          // });
          cy.on('window:alert', (str) => {
            expect(str).to.equal('Incorrect MPIN!');
          });
        }
      })
    })
  })

  it ('Check With Correct Mpin', () => {
    const googlesheetURLMpin = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSZt0bGFBVni2l5Dsp58PByWuQJhF8Alo0-hwne8TipP_kKA0S9XH7mxs3zbw6tP__JUWEwwRwECyFj/pub?gid=403546112&single=true&output=csv'
    
    cy.request({
      url: googlesheetURLMpin,
      method: 'GET',
      encoding: 'utf8'
    }).then((data) => {
      cy.log("data-googlesheetURL", data)
      Papa.parse(data.body, {
        complete: (result) => {
          cy.log("Papa.parse", result)
          expect(result.data).to.have.length.greaterThan(0); // Example assertion
          let MpinDetailsSheetData = result.data
          let Mpin: string = MpinDetailsSheetData[2][2]
          cy.log("Papa.parse-Mpin", Mpin)
          cy.get('#otp1').type(Mpin.charAt(0), {delay: 100})
          cy.get('#otp2').type(Mpin.charAt(1), {delay: 100})
          cy.get('#otp3').type(Mpin.charAt(2), {delay: 100})
          cy.get('#otp4').type(Mpin.charAt(3), {delay: 100})
          cy.contains('Login').click()
          cy.wait(1000)
          // cy.window().then((win) => {
          //   cy.stub(win, 'alert').as('Incorrect MPIN!');  // Stubbing alert method
          // });
          // cy.on('window:alert', (str) => {
          //   expect(str).to.equal('Incorrect MPIN!');
          // });
        }
      })
    })
  })
})