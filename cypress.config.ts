import { defineConfig } from "cypress";
import * as fs from 'fs';
const excelToJson = require('convert-excel-to-json');

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    testIsolation: false,
    experimentalRunAllSpecs: true,
    video: true,
    // reporter: "mochawesome",
    // reporterOptions: {
    //   reportDir: "cypress/reports/mochawesome",
    //   overwrite: true,
    //   html: true,
    //   json: true
    // },
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/reports",
      charts: true,
      reportPageTitle: "Angaular Application Consolidate Test Report",
      inlineAssets: true
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      // on("task", {
      //   excelToJsonConverter(filePath) {
      //     const result = excelToJson({
      //       source: fs.readFileSync(filePath)
      //     })
      //     return result;
      //   },
      //   // generateReport: (data) => {
      //   //   const fs = require('fs');
      //   //   const path = require('path');
      //   //   const reportPath = path.join(__dirname, '..', 'results', 'test-report.json');
      //   //   fs.writeFileSync(reportPath, JSON.stringify(data, null, 2));  // Write data to report
      //   //   return null;  // Return nothing
      //   // }
      // })
      
    },
  },
});
