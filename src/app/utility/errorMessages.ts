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

  passportErrorMsg() {
    return {
      firstName: [{ type: 'required', message: 'Name is required.' }],

      dob: [{ type: 'required', message: 'Date of birth is required.' }],

      passortExpiry: [
        { type: 'required', message: 'expiry date is required.' },
      ],
      fileNo: [{ type: 'required', message: 'File Number is required.' }],
    };
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

  kycdetailsLeadErrorMsg() {
    return {
      idProof: [
        // { type: "required", message: `Select ${this.kycLeadLabel['idproof']}` },
      ],
      panNo: [
        // { type: "required", message: `Enter ${this.kycLeadLabel['panno']}` },
      ],
    };
  }

  newCustomerErrorMsg() {
      return {
          custType: [
              { type: "required", message: `Select Customer Type` },
          ],
          idProof: [
              { type: "required", message: `Select ID Proof` },
          ],
          idValue: [
              { type: "required", message: `Enter Id Value` },
              { type: "pattern", message: `Enter valid id` },
          ],
          
      }
  }

  existingCustomerErrorMsg() {
      return {
          cifId: [
              { type: "required", message: `Enter cif Id` },
              { type: "maxlength", message: "Maximum 10 Numbers only allowed" },
              { type: "minlength", message: "Minimum 10 Numbers required" },
          ],
          custName: [
              { type: "required", message: `Enter Customer Name` },
              { type: "maxlength", message: "Maximum 40 Numbers only allowed" },
          ],
          custDob: [
              { type: "required", message: `Enter Customer DOB` },
              { type: "maxlength", message: "Maximum 10 Numbers only allowed" },
          ],
          custPAN: [
              { type: "required", message: `Enter Customer PAN` },
              { type: "maxlength", message: "Maximum 10 Numbers only allowed" },
              { type: "minlength", message: "Minimum 10 Numbers required" },
              { type: "pattern", message: "Enter Valid PAN" }
          ],
          custAadhaar: [
              { type: "required", message: `Enter Customer Aadhaar Number` },
              { type: "maxlength", message: "Maximum 12 Numbers only allowed" },
              { type: "minlength", message: "Minimum 12 Numbers required" },
          ],
          custVoter: [
              { type: "required", message: `Enter Customer Voter ID` },
              { type: "maxlength", message: "Maximum 16 Numbers only allowed" },
              { type: "minlength", message: "Minimum 10 Numbers required" },
              { type: "pattern", message: "Enter Valid Voter ID" }
          ],
      }
  }

  permanentAddressLeadErrorMsg() {
    return {
      DocumentCollectedforPermanentAddress: [
        {
          type: 'required',
          message: `Select Document Collected for Permanent Address`,
        },
      ],
      permAddress1: [
        {
          type: 'required',
          message: `Enter Permanent Address Line 1`,
        },
        { type: 'maxlength', message: 'Maximum 40 characters only allowed' },
        { type: 'pattern', message: `Special character are not allowed` },
      ],
      permAddress2: [
        {
          type: 'required',
          message: `Enter Permanent Address Line 2`,
        },
        { type: 'maxlength', message: 'Maximum 40 characters only allowed' },
        { type: 'pattern', message: `Special character are not allowed` },
      ],
      permAddress3: [
        {
          type: 'required',
          message: `Enter Permanent Address Line 3`,
        },
        { type: 'maxlength', message: 'Maximum 40 Charactes only allowed' },
        { type: 'pattern', message: `Special character are not allowed` },
      ],
      permLandMark: [
        {
          type: 'required',
          message: `Enter Permanent Address LandMark`,
        },
        {
          type: 'pattern',
          message: `Special character are not allowed`,
        },
        { type: 'maxlength', message: 'Maximum 40 Charactes only allowed' },
      ],
      permState: [
        {
          type: 'required',
          message: `Select State`,
        },
      ],
      permCity: [
        {
          type: 'required',
          message: `Select City`,
        },
      ],
      permPincode: [
        {
          type: 'required',
          message: `Enter Permanent Address Pincode`,
        },
        { type: 'maxlength', message: 'Maximum 6 Numbers only allowed' },
        { type: 'minlength', message: 'Minimum 6 Numbers required' },
      ],
    };
  }

  presentAddressLeadErrorMsg() {
    return {
      sameAsDocPerm: [
        {
          type: 'required',
          message: `Select Same as Permanent Address`,
        },
      ],
      DocumentCollectedforPresentAddress: [
        {
          type: 'required',
          message: `Select Document Collected for Present Address`,
        },
      ],
      preAddress1: [
        {
          type: 'required',
          message: `Enter Present Address Line 1`,
        },
        { type: 'maxlength', message: 'Maximum 40 characters only allowed' },
        {
          type: 'pattern',
          message: `Special character are not allowed`,
        },
      ],
      preAddress2: [
        {
          type: 'required',
          message: `Enter Present Address Line 2`
        },
        { type: 'maxlength', message: 'Maximum 40 characters only allowed' },
        {
          type: 'pattern',
          message: `Special character are not allowed`,
        },
      ],
      preAddress3: [
        {
          type: 'required',
          message: `Enter Present Address Line 3`,
        },
        { type: 'maxlength', message: 'Maximum 40 Charactes only allowed' },
        {
          type: 'pattern',
          message: `Special character are not allowed`,
        },
      ],
      preLandMark: [
        {
          type: 'required',
          message: `Enter Present Land Mark`,
        },
        {
          type: 'pattern',
          message: `Special character are not allowed`,
        },
        { type: 'maxlength', message: 'Maximum 40 Charactes only allowed' },
      ],
      preState: [
        {
          type: 'required',
          message: `Select State`,
        },
      ],
      preCity: [
        {
          type: 'required',
          message: `Select City`,
        },
      ],
      prePincode: [
        {
          type: 'required',
          message: `Enter Present Address Pincode`,
        },
        { type: 'maxlength', message: 'Maximum 6 Numbers only allowed' },
        { type: 'minlength', message: 'Minimum 6 Numbers required' },
      ],
    };
  }
}