const XLSX = require('xlsx');
const fs = require('fs');
const excelToJson = require('convert-excel-to-json');

// function readExcel(filePath) {
// //   const fileBuffer = fs.readFileSync(filePath);
// //   const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
// //   const worksheet = sheetName
// //     ? workbook.Sheets[sheetName]
// //     : workbook.Sheets[workbook.SheetNames[0]];
// //   return XLSX.utils.sheet_to_json(worksheet);
// console.log("filepath", filePath)
// const result = excelToJson({
//     source: fs.readFileSync(filePath)
//     // sourceFile: filePath
//   })
//   console.log("result", result)
//   return result;
// }

// module.exports = { readExcel };

export const readExcel = async (file) => {

  console.log("filepath", file)
const result = excelToJson({
    source: fs.readFileSync(file)
    // sourceFile: filePath
  })
  console.log("result", result)
  return result;
}