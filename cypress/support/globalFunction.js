import * as CryptoJS from 'crypto-js';

const _sk = 'faEVc/e+3c=KEgMc3lzYXJjQDEyMzRJTkZPQA==dt7D+EgQD/egEJCAyDAV4HdvR'

export const generateToken = async () => {
    let timestamp = new Date().getTime();
    let RanNum = Math.floor(Math.random() * 90000000) + 10000000;
    let sys_token = (timestamp.toString()) + "_" + (RanNum.toString());
    let encryptedToken = CryptoJS.AES.encrypt(JSON.stringify(sys_token), window.atob(_sk.substring(15,39)));
    let AuthToken = encryptedToken.toString();
    return AuthToken;
}

export const encryptData = async (val) => {
    let encryptedData = CryptoJS.AES.encrypt(JSON.stringify(val), window.atob(_sk.substring(15,39)));
    return encryptedData.toString();
}

export const encryptData2 = async (val) => {
    let encryptedData = CryptoJS.AES.encrypt(JSON.stringify(val), window.atob(_sk.substring(15,39)));
    return encryptedData.toString();
}

export const decryptData = async (val) => {
    var decryptedBytes = CryptoJS.AES.decrypt(val, window.atob(_sk.substring(15,39)));
    if (decryptedBytes) {
        return decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
    }
}