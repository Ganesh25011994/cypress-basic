import { generateToken, encryptData, encryptData2, decryptData } from '../support/globalFunction.js';

declare module '../support/globalFunction.js' {
    export function generateToken(): any; // Adjust 'any' to a more specific type if you know it
    export function encryptData(data: any): any; // Adjust 'any' to a more specific type if you know it
    export function encryptData2(data: any): any; // Adjust 'any' to a more specific type if you know it
    export function decryptData(data: any): any;
}