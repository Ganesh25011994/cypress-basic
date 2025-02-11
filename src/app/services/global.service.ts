import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  _sk: string = "faEVc/e+3c=KEgMc3lzYXJjQDEyMzRJTkZPQA==dt7D+EgQD/egEJCAyDAV4HdvR";
  sys_token: string;

  constructor() { }

  generateLeadId() {
    return new Date().getTime().toString();
  }
  
  encMyReq(val) {
    if (val != "" && val != null && val != undefined) {
      let encryptedMessage = CryptoJS.AES.encrypt(JSON.stringify(val), window.atob(this._sk.substring(15,39)));
      return encryptedMessage.toString();
    }
  }

  encryptMyReq(val) {
    if (val != "" && val != null && val != undefined) {
      let encryptedMessage = CryptoJS.AES.encrypt(JSON.stringify(val), window.atob(this._sk.substring(15,39)));
      let req = { data: encryptedMessage.toString() }
      return req;
    }
  }

  genToken() {
    let timestamp = new Date().getTime();
    let RanNum = Math.floor(Math.random() * 90000000) + 10000000;
    this.sys_token = (timestamp.toString()) + "_" + (RanNum.toString());
    return this.encMyReq(this.sys_token);
  }

  getToken() {
    return this.sys_token;
  }

  decryptTokenRes(val) {
    if (val != "" && val != null && val != undefined) {
      var decryptedBytes = CryptoJS.AES.decrypt(val, window.atob(this._sk.substring(15,39)));
      console.log(decryptedBytes);
      if (decryptedBytes) {
        try {
          var decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
          val = decryptedMessage;
          // return val.substring(1, 23);
          return JSON.parse(val);
        } catch (err) {
          // this.globalLodingDismiss();
          console.log(err);
        }
      }

    }
  }

  decryptMyRes(val) {
    if (val != "" && val != null && val != undefined) {
      if (val.data != "" && val.data != null && val.data != undefined) {
        var decryptedBytes = CryptoJS.AES.decrypt(val.data, window.atob(this._sk.substring(15,39)));
        console.log(decryptedBytes);
        if (decryptedBytes) {
          try {
            var decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
            val.data = decryptedMessage;
            return val;
          } catch (err) {
            // this.dismissLoading();
            console.log(err);
            // this.presentAlert('Alert', err);

          }
        }
      }
      else {
        // this.dismissLoading();
        // this.presentAlert('Alert', 'No Proper Response from Server!!');
      }
    }
  }
}
