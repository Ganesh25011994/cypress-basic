import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../modules/sharedModule/shared-module';
import { FormControlService } from '../../services/form-control.service';
import { ErrorMessages } from '../../utility/errorMessages';
import { GlobalService } from '../../services/global.service';
import { RestServiceService } from '../../services/rest-service.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, SharedModule, LoaderComponent],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class PersonalComponent {

  personalDetails: FormGroup; 
  validation_messages: any;
  leadID: any;

  loading: boolean = false;

  constructor(public formControl: FormControlService, private el: ElementRef,
    public errormsg: ErrorMessages, public global: GlobalService, public rest: RestServiceService) {}

  sourcingChannelList = [
    {CODE: "1", NAME: "Self Sourced"},
    {CODE: "2", NAME: "Contact center"},
    {CODE: "3", NAME: "Staff referal"},
    {CODE: "4", NAME: "Agent banking"},
    {CODE: "5", NAME: "DSA"},
    {CODE: "6", NAME: "Connector"},
    {CODE: "7", NAME: "Custome referal"},
    {CODE: "8", NAME: "IB/MB/PB"},
    {CODE: "9", NAME: "Campaign"}
  ]

  titleList = [
    {CODE: "1", NAME: "MR"},
    {CODE: "2", NAME: "MRS"},
    {CODE: "3", NAME: "MS"}
  ]

  maritalStatusList = [
    {CODE: "1", NAME: "Single"},
    {CODE: "2", NAME: "Married"},
    {CODE: "3", NAME: "Others"}
  ]

  genderList = [
    {CODE: "1", NAME: "Male"},
    {CODE: "2", NAME: "Female"},
    {CODE: "3", NAME: "Others"}
  ]

  yesnoList = [
    {CODE: "Y", NAME: "YES"},
    {CODE: "N", NAME: "NO"}
  ]

  religionList = [
    {CODE: "1", NAME: "Hindu"},
    {CODE: "2", NAME: "Muslim"},
    {CODE: "3", NAME: "Christian"},
    {CODE: "4", NAME: "Others"}
  ]

  categoryList = [
    {CODE: "1", NAME: "SC"},
    {CODE: "2", NAME: "ST"},
    {CODE: "3", NAME: "OBC"},
    {CODE: "4", NAME: "OC"},
    {CODE: "5", NAME: "Others"},
  ]

  qualificationList = [
    {CODE: "1", NAME: "Under Graduate"},
    {CODE: "2", NAME: "Graduate"},
    {CODE: "3", NAME: "Post Graduate"},
    {CODE: "4", NAME: "Others"}
  ]

  occupationMainList = [
    {CODE: "109", NAME: "Salaried"}
  ]

  occupationsubList = [
    {CODE: "219", NAME: "Office Employee"}
  ]
   
  occupation = [
    {CODE: "219101", NAME: "Banking"}
  ]

  yearsList = [
    {CODE: "1", NAME: "1"},
    {CODE: "2", NAME: "2"},
    {CODE: "3", NAME: "3"},
    {CODE: "4", NAME: "4"},
    {CODE: "5", NAME: "5"},
    {CODE: "6", NAME: "6"},
    {CODE: "7", NAME: "7"},
    {CODE: "8", NAME: "8"},
    {CODE: "9", NAME: "9"},
    {CODE: "10", NAME: "10"},
    {CODE: "11", NAME: "11"},
    {CODE: "12", NAME: "12"},
    {CODE: "13", NAME: "13"},
    {CODE: "14", NAME: "14"},
    {CODE: "15", NAME: "15"},
    {CODE: "16", NAME: "16"},
    {CODE: "17", NAME: "17"},
    {CODE: "18", NAME: "18"},
    {CODE: "19", NAME: "19"},
    {CODE: "20", NAME: "20"},
    {CODE: "21", NAME: "21"},
    {CODE: "22", NAME: "22"},
    {CODE: "23", NAME: "23"},
    {CODE: "24", NAME: "24"},
    {CODE: "25", NAME: "25"},
    {CODE: "26", NAME: "26"},
    {CODE: "27", NAME: "27"},
    {CODE: "28", NAME: "28"},
    {CODE: "29", NAME: "29"},
    {CODE: "30", NAME: "30"},
    {CODE: "31", NAME: "31"},
    {CODE: "32", NAME: "32"},
    {CODE: "33", NAME: "33"},
    {CODE: "34", NAME: "34"},
    {CODE: "35", NAME: "35"},
    {CODE: "36", NAME: "36"},
    {CODE: "37", NAME: "37"},
    {CODE: "38", NAME: "38"},
    {CODE: "39", NAME: "39"},
    {CODE: "40", NAME: "40"},
  ]

  monthsList = [
    {CODE: "1", NAME: "1"},
    {CODE: "2", NAME: "2"},
    {CODE: "3", NAME: "3"},
    {CODE: "4", NAME: "4"},
    {CODE: "5", NAME: "5"},
    {CODE: "6", NAME: "6"},
    {CODE: "7", NAME: "7"},
    {CODE: "8", NAME: "8"},
    {CODE: "9", NAME: "9"},
    {CODE: "10", NAME: "10"},
    {CODE: "11", NAME: "11"},
    {CODE: "12", NAME: "0"},
  ]

  ngOnInit() {
    this.personalDetails = this.formControl.personalLeadForm();
    this.validation_messages = this.errormsg.personalLeadErrorMsg();
    this.leadID = this.global.generateLeadId();
    this.personalDetails.controls['leadId'].setValue(this.leadID)
  }
  
  personalDetailsSave() {
    try {
      if (this.personalDetails.valid) {
        let custname;
        if (this.personalDetails.controls['middleName'].value) {
          custname = this.personalDetails.controls['firstName'].value + this.personalDetails.controls['middleName'].value + this.personalDetails.controls['lastName'].value
        } else {
          custname = this.personalDetails.controls['firstName'].value + this.personalDetails.controls['lastName'].value
        }

        let body = {
          "appStatus": "E",
          "applicantId": this.leadID,
          "borrowerType": "B",
          "branchID": "469",
          "custName": custname,
          "jsonData": JSON.stringify(this.personalDetails.value),
          "leadID": this.leadID,
          "loanAmt": this.personalDetails.controls['loanRequested'].value,
          "mobNo": this.personalDetails.controls['mobileNo'].value,
          "pageID": "1",
          "token": this.global.genToken(),
          "type": "SAVE",
          "userID": "GLRO",
          "verticle": "GL"
        }
        this.loading = true
        this.rest.angularHttpService('goldOnlineApk', body).then(async (personalDetailsResponse:any) => {
          console.log("data", personalDetailsResponse)
          if (personalDetailsResponse.errorCode === '000') {
            this.loading = false
            alert('Personal Details saved successfully')
          } else { 
            this.loading = false; 
            alert(personalDetailsResponse.errorDesc);
          }
        })
      } else {
        Object.keys(this.personalDetails.controls).forEach(field => {
          const control: any = this.personalDetails.get(field);
          control.markAsTouched();
        });

        // Show error messages and scroll to the first invalid control
        this.scrollToFirstInvalidControl();
      }
    } catch (error) {
      this.loading = false;
      console.log("error", error)
    }
    
  }

  private scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
      "form .ng-invalid"
    );
    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstInvalidControl.focus();
    }
  }

}
