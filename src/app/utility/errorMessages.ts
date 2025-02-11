import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ErrorMessages {

    personalLeadLabel: { [key: string]: string } = {};
    
    loginErrorMsg() {
        return {
            username: [
                { type: "required", message: `Enter UserName` }
            ],
            password: [
                { type: "required", message: `Enter Password` }
            ]
        }
    }

    personalLeadErrorMsg() {
        return {
          sourcingChannel: [
            {
              type: 'required',
              message: `Select ${this.personalLeadLabel['sourcingChannel']}`,
            },
          ],
          branchName: [
            {
              type: 'required',
              message: `Enter ${this.personalLeadLabel['branchName']}`,
            },
          ],
          branchCode: [
            {
              type: 'required',
              message: `Enter ${this.personalLeadLabel['branchCode']}`,
            },
          ],
          lgName: [
            {
              type: 'required',
              message: `Enter ${this.personalLeadLabel['lgName']}`,
            },
          ],
          lgId: [
            {
              type: 'required',
              message: `Enter ${this.personalLeadLabel['lgId']}`,
            },
          ],
          title: [
            {
              type: 'required',
              message: `Select ${this.personalLeadLabel['title']}`,
            },
          ],
          firstName: [
            {
              type: 'required',
              message: `Enter FirstName`,
            },
            {
              type: 'pattern',
              message: `Enter Valid FirstName`,
            },
            { type: 'maxlength', message: 'Maximum 40 Charactes only allowed' },
          ],
          middleName: [
            {
              type: 'required',
              message: `Enter Middle Name`,
            },
            {
              type: 'pattern',
              message: `Enter valid Middle Name`,
            },
            { type: 'maxlength', message: 'Maximum 40 Charactes only allowed' },
          ],
          lastName: [
            {
              type: 'required',
              message: `Enter Last Name`,
            },
            {
              type: 'pattern',
              message: `Enter valid Last Name`,
            },
            { type: 'maxlength', message: 'Maximum 40 Charactes only allowed' },
          ],
          fatherName: [
            {
              type: 'required',
              message: `Enter Father Name`,
            },
            { type: 'maxlength', message: 'Maximum 40 Charactes only allowed' },
            {
              type: 'pattern',
              message: `Enter valid Father Name`,
            },
          ],
          motherName: [
            {
              type: 'required',
              message: `Enter Mother Name`,
            },
            { type: 'maxlength', message: 'Maximum 40 Charactes only allowed' },
            {
              type: 'pattern',
              message: `Enter valid Mother Name`,
            },
          ],
          maritalStatus: [
            {
              type: 'required',
              message: `Select Marital Status`,
            },
          ],
          gender: [
            {
              type: 'required',
              message: `Select Gender`,
            },
          ],
          dob: [
            {
              type: 'required',
              message: `Select Date of Birth`,
            },
            { type: 'maxlength', message: 'Maximum 8 Charactes only allowed' },
          ],
          mobileNo: [
            {
              type: 'required',
              message: `Enter Mobile Number`,
            },
            { type: 'maxlength', message: 'Maximum 10 Numbers only allowed' },
            { type: 'minlength', message: 'Minimum 10 Numbers required' },
            { type: 'pattern', message: 'Enter valid mobile number' },
          ],
          emailId: [
            { type: 'email', message: `Please enter Correct Email Address` },
          ],
          leadId: [
            {
              type: 'required',
              message: `Enter Lead ID`,
            },
          ],
          distanceFromBranch: [
            {
              type: 'required',
              message: `Enter Distance From Branch`,
            },
          ],
          monthlyIncome: [
            {
              type: 'required',
              message: `Enter Monthly Income`,
            },
          ],
          loanRequested: [
            {
              type: 'required',
              message: `Enter Loan Requested`,
            },
          ],
          schemeRequested: [
            {
              type: 'required',
              message: `Select Scheme Requested`,
            },
          ],
          differentlyAbled: [
            {
              type: 'required',
              message: `Select Differently Abled`,
            },
          ],
          religion: [
            {
              type: 'required',
              message: `Select Religion`,
            },
          ],
          category: [
            {
              type: 'required',
              message: `Select Category`,
            },
          ],
          politicallyExposedPerson: [
            {
              type: 'required',
              message: `Select Politically Exposed`,
            },
          ],
          qualification: [
            {
              type: 'required',
              message: `Select Qualification`,
            },
          ],
          totalWorkExperienceYear: [
            {
              type: 'required',
              message: `Select Total Number of Years in Working Experience`,
            },
          ],
          totalWorkExperienceMonth: [
            {
              type: 'required',
              message: `Select Total Number of Months in Working Experience`,
            },
          ],
          currentWorkExperienceYear: [
            {
              type: 'required',
              message: `Select Current Number of Years in Working Experience`,
            },
          ],
          currentWorkExperienceMonth: [
            {
              type: 'required',
              message: `Select Current Number of Months in Working Experience`,
            },
          ],
          personalExpense: [
            {
              type: 'required',
              message: `Enter Personal Expense`,
            },
          ],
          occupationMainCategory: [
            {
              type: 'required',
              message: `Select Occupation Main Category`,
            },
          ],
          occupationSubcategory: [
            {
              type: 'required',
              message: `Select Occupation Sub Category`,
            },
          ],
          occupation: [
            {
              type: 'required',
              message: `Select Occupation`,
            },
          ],
          totalnoOfYear: [
            {
              type: 'required',
              message: `Select Total Number of Years in City`,
            },
          ],
          totalnoOfMonth: [
            {
              type: 'required',
              message: `Select Total Number of Months in City`,
            },
          ],
          panAvail: [
            {
              type: 'required',
              message: `Select Form 60`,
            },
          ]
        };
      }
}