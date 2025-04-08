import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  constructor(public formBuilder: FormBuilder) { }

  loginForm() {
    return this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  mpinForm() {
    return this.formBuilder.group({
      mpin: ['', Validators.required],
    })
  }
  
  setMpinForm() {
    return this.formBuilder.group({
      pina: ["", Validators.compose([Validators.maxLength(4), Validators.minLength(4), Validators.pattern('[0-9]*'), Validators.required])],
      pinb: ["", Validators.compose([Validators.maxLength(4), Validators.minLength(4), Validators.pattern('[0-9]*'), Validators.required])]
    });
  }

  newCustomerDetailsForm() {
    return this.formBuilder.group({
      custType: ['', Validators.required],
      idProof: ['', Validators.required],
      methodType: [''],
      idValue: ['', Validators.required]
    })
  }

  existingCustomerDetailsForm() {
    return this.formBuilder.group({
      cifId: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])],
      custName: ['', Validators.compose([Validators.maxLength(40), Validators.pattern('[a-zA-Z ]*')])],
      custDob: ['', Validators.maxLength(10)],
      custPAN: ['', Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/)])],
      custAadhaar: ['', Validators.compose([Validators.maxLength(12), Validators.minLength(12), Validators.pattern('[2-9]{1}[0-9]{11}')])],
      custVoter: ['', Validators.compose([Validators.maxLength(16), Validators.minLength(10)])],
    })
  }

  customerNamesForm() {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  drivingLicenseForm() {
    return this.formBuilder.group({
      dob: ['', Validators.required],
    });
  }

  passportForm() {
    return this.formBuilder.group({
      firstName: [''],
      dob: ['', Validators.required],
      passortIssue: [''],
      fileNo: ['', Validators.required],
    });
  }

  personalLeadForm() {
    return this.formBuilder.group({
      rowId: [null],
      sourcingChannel: ['', Validators.required],
      srcId: [''],
      branchName: ['', Validators.required],
      branchCode: ['', Validators.required],
      lgName: ['', Validators.required],
      lgId: ['', Validators.required],
      title: ['', Validators.required],
      firstName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern('[a-zA-Z ]*'),
        ]),
      ],
      middleName: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*')])],
      lastName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z. ]*'),
        ]),
      ],
      fatherName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
        ]),
      ],
      motherName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
        ]),
      ],
      maritalStatus: ['', Validators.required],
      spouseName: [''],
      gender: ['', Validators.required],
      dob: ['', [Validators.required]],
      mobileNo: [
        '',
        [Validators.required, Validators.pattern('[6-9]{1}[0-9]{9}$')],
      ],
      alternateMobileNo: [
        '',
        Validators.compose([Validators.pattern('[6-9]{1}[0-9]{9}$')]),
      ],
      emailId: ['', Validators.compose([Validators.email])],
      leadId: ['', Validators.required],
      distanceFromBranch: ['', 
        Validators.compose([Validators.pattern('[0-9]*'), Validators.required])
      ],
      monthlyIncome: ['', 
        Validators.compose([Validators.pattern('[0-9]*'), Validators.required])
      ],
      loanRequested: ['', 
        Validators.compose([
          Validators.pattern('[0-9]*'),
          Validators.maxLength(7),
          Validators.required,
        ]),
      ],
      schemeRequested: ['', Validators.required],
      differentlyAbled: ['', Validators.required],
      religion: ['', Validators.required],
      category: ['', Validators.required],
      politicallyExposedPerson: ['', Validators.required],
      qualification: ['', Validators.required],
      totalWorkExperienceYear: ['', Validators.required],
      totalWorkExperienceMonth: ['', Validators.required],
      currentWorkExperienceYear: ['', Validators.required],
      currentWorkExperienceMonth: ['', Validators.required],
      personalExpense: [''],
      occupationMainCategory: ['', Validators.required],
      occupationSubcategory: ['', Validators.required],
      occupation: ['', Validators.required],
      totalnoOfMonth: ['', Validators.required],
      totalnoOfYear: ['', Validators.required],
      cifId: [''],
      leadReferal: [
        '',
        Validators.compose([Validators.pattern('[a-zA-Z0-9]*')]),
      ],
      panAvail: ['', Validators.compose([Validators.required])],
      voicesmsreq: ['', Validators.required],
      preferredlanguage: [''],
      personalValueModified: [false]
    });
  }

  kycLeadForm() {
    return this.formBuilder.group({
      idProof: ['', Validators.required],
      idValue: ['', Validators.required],
      issueDate: ['', Validators.required],
      expiryDate: [''],
      fileNo: [''],
      leadId: [''],
      rowId: [null],
      otpBioFlag: [''],
      karzaResponse: [''],
      aadharSeedFlag: [''],
    });
  }

  permanentAddressLeadForm() {
    return this.formBuilder.group({
      rowId: [null],
      documentCollectedForPermanentAddress: ['', Validators.required],
      permAddress1: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern('[a-zA-Z0-9 ]*'),
        ]),
      ],
      permAddress2: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern('[a-zA-Z0-9 ]*'),
        ]),
      ],
      permAddress3: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern('[a-zA-Z0-9 ]*'),
        ]),
      ],
      permLandMark: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern('[a-zA-Z0-9 ]*'),
        ]),
      ],
      permState: ['', Validators.required],
      permCity: ['', Validators.required],
      permPincode: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      permAddrType: [''],
    });
  }
  presentAddressLeadForm() {
    return this.formBuilder.group({
      rowId: [null],
      sameasPermanentAddress: ['', Validators.required],
      documentCollectedForPresentAddress: ['', Validators.required],
      preAddress1: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern('[a-zA-Z0-9 ]*'),
        ]),
      ],
      preAddress2: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern('[a-zA-Z0-9 ]*'),
        ]),
      ],
      preAddress3: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern('[a-zA-Z0-9 ]*'),
        ]),
      ],
      prePincode: ['', Validators.required, Validators.pattern('[0-9]*')],
      preState: ['', Validators.required],
      preCity: ['', Validators.required],
      preLandMark: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern('[a-zA-Z0-9 ]*'),
        ]),
      ],
      preAddrType: [''],
    });
  }
  
}
