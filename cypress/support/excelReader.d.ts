import { readExcelFile } from "../support/excelReader.js";

declare module '../support/excelReader.js' {
    export function readExcelFile(filePath: string): any; // Adjust 'any' to a more specific type if you know it
}