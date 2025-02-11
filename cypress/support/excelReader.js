// cypress/support/excelReader.js
import * as XLSX from 'xlsx';

// export const readExcelFile = (filePath) => {
//   cy.log("filePath", filePath)
//   const file = XLSX.readFile(filePath);
//   cy.log("file", file)
//   const sheetName = file.SheetNames[0];
  
//   const data = XLSX.utils.sheet_to_json(file.Sheets[sheetName]);
//   return data;
// };

export const readExcelFile = async (file) => {
  // try {
  //   const fileReader = await new FileReader()
  //   fileReader.readAsArrayBuffer(file)
  
  //   fileReader.onload = (e) => {
  //     const bufferArray = e?.target.result
  //     const wb = XLSX.read(bufferArray, { type: "buffer" })
  //     const wsname = wb.SheetNames[0]
  //     // const ws = wb.Sheets[wsname]
  
  //     // const data = XLSX.utils.sheet_to_json(ws)
  //     // const fileName = file.name.split(".")[0]
  //     const data = XLSX.utils.sheet_to_json(file.Sheets[sheetName]);
  //     console.log(data)
  //     resolve(data);
  //   }
  // } catch (error) {
  //   reject(error)
  // }

  try {
    console.log("document picked")
    const file = file;
    const reader = new FileReader();

    reader.onload = (file) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0]; // Get the first sheet
      const worksheet = workbook.Sheets[sheetName];

      this.exceldata = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Convert to JSON
      console.log("exceldata", this.exceldata); // Output the data for verification
      this.specificColumnData = this.exceldata
      console.log("exceldata", this.specificColumnData); 
    };

    if (file) {
      reader.readAsBinaryString(file);
    }
  } catch (error) {
    console.log("onFileChange-error", error)
  }
  
}

// Cypress.Commands.add('getExcelCell', (filePath, cellAddress, sheetName = '') => {
//   return new Cypress.Promise((resolve, reject) => {
//     try {
//       const workbook = XLSX.readFile(filePath);
//       const selectedSheet = sheetName || workbook.SheetNames[0]; // Use the first sheet by default
//       const worksheet = workbook.Sheets[selectedSheet];
//       const cell = worksheet[cellAddress];

//       // Return the cell value or undefined if not found
//       resolve(cell ? cell.v : undefined);
//     } catch (error) {
//       reject(error);
//     }
//   });
// })