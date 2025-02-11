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

  personalLeadForm() {
    return this.formBuilder.group({
      rowId: [null],
      sourcingChannel: ['', Validators.required],
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
      distanceFromBranch: ['', Validators.required],
      monthlyIncome: ['', Validators.required],
      loanRequested: ['', Validators.required],
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
      panAvail: ['', Validators.required]
    });
  }
  
}
