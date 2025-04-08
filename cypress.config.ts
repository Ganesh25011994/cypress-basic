import { defineConfig } from "cypress";
import * as fs from 'fs';
const excelToJson = require('convert-excel-to-json');

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    testIsolation: false, // Set true to Clear Local Storage for every testcases. Default value is True
    experimentalRunAllSpecs: true, // Set True to test All Test Cases in cypress test runner
    video: true, // To Captrue Video

    // reporter: "mochawesome",
    // reporterOptions: {
    //   reportDir: "cypress/reports/mochawesome",
    //   overwrite: true,
    //   html: true,
    //   json: true
    // },
    reporter: "cypress-mochawesome-reporter", // Test Coverage Report Generate Plugin
    reporterOptions: {
      reportDir: "cypress/reports",  // Report Generate Path
      charts: true, // To Add Chart in Report
      reportPageTitle: "Angaular Application Consolidate Test Report",
      inlineAssets: true
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here

      require('cypress-mochawesome-reporter/plugin')(on); // Its convert Test Coverage Report into Single HTML File

      // Convert Excel File into JSON File
      
      on("task", {
        excelToJsonConverter(filePath) {
          const result = excelToJson({
            source: fs.readFileSync(filePath)
          })
          return result;
        }
      })
    }
  },
});
