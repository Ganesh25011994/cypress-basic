import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../modules/sharedModule/shared-module';
import { FormControlService } from '../../services/form-control.service';
import { ErrorMessages } from '../../utility/errorMessages';
import { GlobalService } from '../../services/global.service';
import { RestServiceService } from '../../services/rest-service.service';
import { LoaderComponent } from '../loader/loader.component';
import { DataUtilityService } from '../../services/data-utility.service';
import { HelperFunctionService } from '../../services/helper-function.service';
import { SharedFunctionService } from '../../services/shared-function.service';
import { FormValidationsService } from '../../utility/form-validations';
import { CustomLoadingService } from '../../services/custom-loading.service';
import { staticMaster } from '../../utility/app-interfaces';
import { CustomAlertService } from '../../services/custom-alert.service';
import { AlertErrorLabel } from '../../utility/AlertErrorLabel';
import { DocumentHandlerService } from '../../services/document-handler.service';
import moment from 'moment';
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
  savedPages: string[] = [];

  selectedYearsfortotalexp: number;
  selectedMonthsfortotalexp: number;
  selectedYearsforcurexp: number;
  selectedMonthsforcurexp: number;
  totalexp: number;
  currentExp: number;

  sourcingIDLabel: string;
  sourceInputType = false;
  sourcedrobdownType = false;

  disableFields = {
    disableFirstName: false,
    disableLastName: false,
    disableMiddleName: false,
    disablePanAvail: false,
    disableDOB: false,
    disableGender: false,
    // disableFatherName: false,
    // disableMotherName: false,
  };

  sourcingMasterList: any[] = [];
  mobNumVerify: boolean = false;
  showPreferredlanguage: boolean = false;
  monthlyIncList: staticMaster[] = [];

  extCustomer: boolean = false;
  mindata: string;
  maxdate: string;

  fullMasterData: any;
  schemeRequestList: any[] = []

  occupationMainList = []
  occupationsubList = []
  occupationList = []
  occupationcodeShow: boolean = false


  constructor(public formControl: FormControlService, private el: ElementRef, public sharedFunction: SharedFunctionService,
    public errormsg: ErrorMessages, public global: GlobalService, public rest: RestServiceService,
    public dataUtility: DataUtilityService, public helperFn: HelperFunctionService, 
    public customAlert: CustomAlertService, public alertErrorLabel: AlertErrorLabel,
    public formValidation: FormValidationsService, public customLoading: CustomLoadingService,
    public documentHandler: DocumentHandlerService
  ) {}

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
    {CODE: "6", NAME: "Single"},
    {CODE: "1", NAME: "Married"},
    {CODE: "7", NAME: "Others"},
    {CODE: "5", NAME: "Divorced"},
    {CODE: "3", NAME: "widow"}
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

  noofYearList:any[] = []

  noofMonthList: any[] = []

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

  languageList = [
    {CODE: "10", NAME: "Bengali"},
    {CODE: "2", NAME: "Tamil"},
    {CODE: "3", NAME: "English"},
    {CODE: "4", NAME: "Telugu"},
    {CODE: "6", NAME: "Hindi"},
    {CODE: "7", NAME: "Marathi"},
    {CODE: "8", NAME: "Kannda"},
    {CODE: "9", NAME: "Gujarati"},
  ]

  fullSourcingMasterList = [
    {seqId: "22", orgId: "10271", userId: "12377", userName: "test1", userType: "4"},
    {seqId: "23", orgId: "10271", userId: "54233", userName: "test2", userType: "5"},
    {seqId: "24", orgId: "10271", userId: "54326", userName: "test3", userType: "6"},
    {seqId: "25", orgId: "10271", userId: "12588", userName: "test4", userType: "4"},
    {seqId: "26", orgId: "10271", userId: "5434", userName: "test5", userType: "5"},
    {seqId: "27", orgId: "10271", userId: "54327", userName: "test6", userType: "6"}
  ]

  ngOnInit() {
    this.personalDetails = this.formControl.personalLeadForm();
    this.validation_messages = this.errormsg.personalLeadErrorMsg();
    this.fullMasterData = JSON.parse(localStorage.getItem("MasterResponse") as any).Setupmaster
    // this.leadID = this.global.generateLeadId();
    // this.personalDetails.controls['leadId'].setValue(this.leadID)
    this.schemeRequestList = this.fullMasterData.ProductMaster
    this.occupationMainList = this.fullMasterData.OccupationCategory.filter(val => val.Level =="1" && val.ParentLink == "0" && val.BizVertival == "16")
    console.log("this.occupationMainList", this.occupationMainList)
    this.mindata = moment().subtract(60, 'years').format('YYYY-MM-DD');
    this.maxdate = moment().subtract(18, 'years').format('YYYY-MM-DD');
    this.getData()
  }

  async getData() {
    console.log('Personal details ionViewWillEnter');
    this.savedPages = this.dataUtility.getSavedPagesList();
    // this.monthlyIncList =
    //   await this.sqliteService.getStaticDataById('monthlyInc');
    if ((this.savedPages && this.savedPages.length > 0) || this.dataUtility.getPersonalDetails()) {
      if (this.dataUtility.getApplicantType() === this.helperFn.appCustomerTypes().Applicant) {
        let personal = this.savedPages.find(
          (val) => val == this.helperFn.pageIds().personalDetails,
        );
        if (personal || this.dataUtility.getPersonalDetails()) {
          await this.getPersonalDetails();
        } else {
          await this.autoPopulateKarzaResponse();
          await this.autoPopulateLoginUserData();
        }
      }
    } else {
      await this.autoPopulateKarzaResponse();
      await this.autoPopulateLoginUserData();
    }

    //Disabled Personal details after submission//
    if (
      this.dataUtility.getSubmitDisable() ||
      this.dataUtility.getPosidexCompleted()
    ) {
      // this.submitDisable = true;
      this.formValidation.disableFormControls(this.personalDetails);
      // this.enableIncomeField();
    }
  }

  async autoPopulateKarzaResponse() {
    try {
      let OnboardKarzaResponse = this.dataUtility.getKarzaResponse();
      OnboardKarzaResponse.lastName = OnboardKarzaResponse.lastName || '.';
      console.log('AutoPopulateBasedOnExistingCustomer', OnboardKarzaResponse);
      if (OnboardKarzaResponse) {
        const fieldsListtoUpdate = [
          'firstName',
          'middleName',
          'lastName',
          'leadId',
        ];
        this.AutoPopulateValueSetandDisable(
          OnboardKarzaResponse,
          fieldsListtoUpdate,
        );
        if (OnboardKarzaResponse.customerType == 'N') {
          this.extCustomer = false;
          if (
            OnboardKarzaResponse.idType == this.helperFn.getKycIdNames().Aadhar
          ) {
            this.AutoPopulateBasedOnAadhaar(OnboardKarzaResponse.karzaResponse);
          } else if (
            OnboardKarzaResponse.idType ==
            this.helperFn.getKycIdNames().DrivingLicense
          ) {
            this.AutoPopulateBasedOnDL(OnboardKarzaResponse.karzaResponse);
          } else if (
            OnboardKarzaResponse.idType == this.helperFn.getKycIdNames().VoterId
          ) {
            this.AutoPopulateBasedOnVoterId(OnboardKarzaResponse.karzaResponse);
          }
        } else {
          this.AutoPopulateBasedOnExistingCustomer(
            OnboardKarzaResponse.AadhaarResponse,
            OnboardKarzaResponse.idValue,
          );
        }
        this.setDisableFieldsData();
      }
    } catch (error) {
      console.log(
        error,
        'PersonalDetailsPage-autoPopulateKarzaResponse',
      );
    }
  }

  AutoPopulateBasedOnAadhaar(karzaResponse) {
    try {
      let AadhaarResponseDate = karzaResponse.KycDetails;
      AadhaarResponseDate.gender = this.helperFn.getGendertype(
        AadhaarResponseDate.gender,
      );
      AadhaarResponseDate.dob = this.helperFn.getDob(AadhaarResponseDate.dob);
      this.AutoPopulateValueSetandDisable(AadhaarResponseDate, [
        'gender',
        'dob',
      ]);
    } catch (error) {
      console.log(
        error,
        'PersonalDetailsPage-AutoPopulateBasedOnAadhaar',
      );
    }
  }

  AutoPopulateBasedOnDL(karzaResponse: any) {
    try {
      let dlResponse = karzaResponse?.result;
      if (!dlResponse.dob) {
        return;
      }
      let dlDob = this.helperFn.formatDateValue(dlResponse.dob);
      this.AutoPopulateValueSetandDisable({ dob: dlDob }, ['dob']);
    } catch (error) {
      console.log(
        error,
        'PersonalDetailsPage-AutoPopulateBasedOnDL',
      );
    }
  }

  AutoPopulateBasedOnVoterId(karzaResponse) {
    try {
      let voterData = JSON.parse(karzaResponse.responseData.VoterId).result;
      if (!voterData.gender) {
        return;
      }
      const genderCode = this.helperFn.getGendertype(voterData.gender);
      this.AutoPopulateValueSetandDisable({ gender: genderCode }, ['gender']);
    } catch (error) {
      console.log(
        error,
        'PersonalDetailsPage-AutoPopulateBasedOnDL',
      );
    }
  }

  AutoPopulateBasedOnExistingCustomer(karzaResponse, idValue) {
    try {
      let exisitingCustomerResponse = karzaResponse;
      this.extCustomer = false;
      const autopopulateValues = {
        gender: this.helperFn.getGendertype(
          exisitingCustomerResponse.gender.toLowerCase() || '',
        ),
        dob: exisitingCustomerResponse.dateOfBirth || '',
        // mobileNo: exisitingCustomerResponse.mobileNumber || "",
        emailId: exisitingCustomerResponse.mail || '',
        //  fatherName: exisitingCustomerResponse.fathersName || '',
        // motherName: exisitingCustomerResponse.mothersName || '',
        cifId: idValue || '',
      };

      this.personalDetails.controls['fatherName'].setValue(
        exisitingCustomerResponse.fathersName,
      );
      this.personalDetails.controls['fatherName'].updateValueAndValidity();

      this.personalDetails.controls['motherName'].setValue(
        exisitingCustomerResponse.mothersName,
      );
      this.personalDetails.controls['motherName'].updateValueAndValidity();

      this.personalDetails.controls['mobileNo'].setValue(
        exisitingCustomerResponse.mobileNumber,
      );
      this.personalDetails.controls['mobileNo'].updateValueAndValidity();

      const fieldsListtoUpdate = [
        'gender',
        'dob',
        'emailId',
        // 'fatherName',
        // 'motherName',
        'cifId',
      ];
      this.AutoPopulateValueSetandDisable(
        autopopulateValues,
        fieldsListtoUpdate,
      );
    } catch (error) {
      console.log(
        error,
        'PersonalDetailsPage-AutoPopulateBasedOnExistingCustomer',
      );
    }
  }

  AutoPopulateValueSetandDisable(OnboardKarzaResponse, fieldsListtoUpdate) {
    try {
      fieldsListtoUpdate.forEach((field) => {
        const value = OnboardKarzaResponse[field] || '';
        this.formValidation.setSingleFormValues(
          this.personalDetails,
          field,
          value,
        );
        if (this.personalDetails.controls[field].value) {
          this.personalDetails.controls[field].disable();
        }
        this.personalDetails.controls['middleName'].disable();
      });
    } catch (error) {
      console.log(
        error,
        'PersonalDetailsPage-AutoPopulateValueSetandDisable',
      );
    }
  }

  setDisableFieldsData() {
    try {
      if (this.personalDetails.controls['firstName'].value)
        this.disableFields.disableFirstName = true;
      if (this.personalDetails.controls['lastName'].value)
        this.disableFields.disableLastName = true;
      // if (this.personalDetails.controls['middleName'].value)
      this.disableFields.disableMiddleName = true;
      if (this.personalDetails.controls['dob'].value) {
        this.disableFields.disableDOB = true;
        this.dobChange();
      }
      if (this.personalDetails.controls['gender'].value)
        this.disableFields.disableGender = true;
      // if (this.personalDetails.controls['fatherName'].value)
      //   this.disableFields.disableFatherName = true;
      // if (this.personalDetails.controls['motherName'].value)
      //   this.disableFields.disableMotherName = true;
    } catch (error) {
      console.log(
        error,
        'PersonalDetailsPage-setDisableFieldsData',
      );
    }
  }

  personalDetailsSave() {
    try {
      if (this.personalDetails.valid) {
        let selectedYearsfortotalexp, selectedMonthsfortotalexp, selectedYearsforcurexp, selectedMonthsforcurexp;
        selectedYearsfortotalexp = this.personalDetails.controls['totalWorkExperienceYear'].value
        selectedMonthsfortotalexp = this.personalDetails.controls['totalWorkExperienceMonth'].value
        selectedYearsforcurexp = this.personalDetails.controls['currentWorkExperienceYear'].value
        selectedMonthsforcurexp = this.personalDetails.controls['currentWorkExperienceMonth'].value

        this.totalexp = +this.helperFn.concatString(selectedYearsfortotalexp, selectedMonthsfortotalexp);
        console.log('this.totalexp', this.totalexp);
        this.currentExp = +this.helperFn.concatString(selectedYearsforcurexp, selectedMonthsforcurexp);
        console.log('this.currentExp', this.currentExp);

        if (+selectedYearsfortotalexp == 0 && +selectedMonthsfortotalexp == 0) {
          this.customAlert.presentAlert(
            this.alertErrorLabel.alertLabels.alert,
            this.alertErrorLabel.alertLabels.Total_Experience_Not_0,
            '',
            'warning',
            'icon-color',
          );
        } else if (+selectedYearsforcurexp == 0 && +selectedMonthsforcurexp == 0) {
          this.customAlert.presentAlert(
            this.alertErrorLabel.alertLabels.alert,
            this.alertErrorLabel.alertLabels.Current_Experience_Not_0,
            '',
            'warning',
            'icon-color',
          );
        } else if (+selectedYearsfortotalexp > +selectedYearsforcurexp) {
          this.callSaveService();
        } else if (
          +selectedYearsfortotalexp == +selectedYearsforcurexp &&
          +selectedMonthsfortotalexp >= +selectedMonthsforcurexp
        ) {
          this.callSaveService();
        } else if (
          +selectedYearsfortotalexp == +selectedYearsforcurexp &&
          +selectedMonthsfortotalexp == +selectedMonthsforcurexp
        ) {
          this.callSaveService();
        } else {
          this.customAlert.presentAlert(
            this.alertErrorLabel.alertLabels.alert,
            this.alertErrorLabel.alertLabels
              .Current_Experience_than_Total_Experience,
            '',
            'warning',
            'icon-color',
          );
        }

        
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

  callSaveService() {
    try {
      let custname;
      if (this.personalDetails.controls['middleName'].value) {
        custname = this.personalDetails.controls['firstName'].value + this.personalDetails.controls['middleName'].value + this.personalDetails.controls['lastName'].value
      } else {
        custname = this.personalDetails.controls['firstName'].value + this.personalDetails.controls['lastName'].value
      }
      let leadID = this.personalDetails.controls['leadId'].value
      let value = this.personalDetails.getRawValue();
      let body = {
        "appStatus": "E",
        "applicantId": leadID,
        "borrowerType": "B",
        "branchID": "469",
        "custName": custname,
        "jsonData": JSON.stringify(value),
        "leadID": leadID,
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
          await this.saveKarzaResponse();
        } else { 
          this.loading = false; 
          alert(personalDetailsResponse.errorDesc);
        }
      })
    } catch (error) {
      this.loading = false;
      console.log("personalDetailsSave", error)
    }
  }

  async saveKarzaResponse() {
    try {
      let karzaResponse = await this.sharedFunction.saveGetKarzaResponse(
        this.helperFn.getMethodTypes().Save,
      );
      if (karzaResponse) {
        if (this.dataUtility.getAppCustomerType() === 'N') {
          this.saveConsentForm();
        } else {
          // if (this.personalDetails.controls['panAvail'].value === '2') {
          //   this.uploadForm60Documents('save');
          // } else {
            // this.setCompletedStatus(true, 'save');
          // }
        }
      } else {
        // this.deleteInsertKarzaResponse();
        // this.deleteInsertConsentForm();
      }
    } catch (error) {
      // this.deleteInsertKarzaResponse();
      // this.deleteInsertConsentForm();
      console.log(
        error,
        'PersonalDetailsPage-saveKarzaResponse',
      );
    }
  }

  async saveConsentForm() {
    try {
      let consentFormResp = await this.documentHandler.callSaveConsentForm();
      if (consentFormResp) {
      //   if (this.personalDetails.controls['panAvail'].value === '2') {
      //     this.uploadForm60Documents('save');
      //   } else {
      //     this.setCompletedStatus(true, 'save');
      //   }
      // } else {
      //   await this.deleteInsertConsentForm();
      }
    } catch (error) {
      // this.deleteInsertConsentForm();
      console.log(
        error,
        'PersonalDetailsPage-saveKarzaResponse',
      );
    }
  }

  async autoPopulateLoginUserData() {
    try {
      // let loginDetails = await this.loginSqlite.getLoginDetails(
      //   localStorage.getItem('username'),
      // );

      let loginData: any = JSON.parse(localStorage.getItem('loginResponse') as any)

      let loginDetails = {
        "seq_id": 1,
        "user_name": loginData.LPuserID,
        "orgscode": loginData.Orgscode,
        "status": loginData.Status,
        "statusCode": loginData.StatusCode,
        "ro_name": loginData.UserName,
        "userID": loginData.LPuserID,
        "ILcremUser": "",
        "UserGroups": loginData.UserGroups,
        "supervoiser": null,
        "supvId": null,
        "supvName": null,
        "Timestamp": "2025-03-23 18:19:49",
        "orgLocationList": loginData.orgLocationList,
        "lastLoginDate": "03/23/2025"
    }
      // let orgDetails = await this.sqliteService.getOrganisationDetails(
      //   loginDetails[0].orgscode,
      // );
      let orgDetails = {
        "ORG_ID": 3046,
        "OrgID": "10271",
        "OrgName": "Chennai - Anna Nagar",
        "OrgBranchCode": "469",
        "OrgCity": "263",
        "OrgState": "33",
        "OrgLevel": "1"
    }
      console.log('loggedInUser', loginDetails);
      console.log('loggedInUser', orgDetails);
      const autopopulateValues = {
        branchName: orgDetails.OrgName,
        branchCode: orgDetails.OrgBranchCode,
        lgName: loginDetails.user_name,
        lgId: loginDetails.userID,
      };
      const fieldsListtoUpdate = ['branchName', 'branchCode', 'lgName', 'lgId'];
      this.AutoPopulateValueSetandDisable(
        autopopulateValues,
        fieldsListtoUpdate,
      );
    } catch (error) {
      console.log('PersonalDetailsPage-autoPopulateLoginUserData', error);
      console.log(
        error,
        'PersonalDetailsPage-autoPopulateLoginUserData',
      );
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

  /**
   * @method getPersonalDetails
   * @description get Personal Details value from Web and map it to the Form.
   * @author Sandhiya A
   */
  async getPersonalDetails() {
    try {
      let personalDetails = this.dataUtility.getPersonalDetails() ? this.dataUtility.getPersonalDetails() : await this.sharedFunction.commonSaveGetDetails(
        'personal',
        this.helperFn.getMethodTypes().Get,
      );
      if (personalDetails) {
        this.selectedYearsfortotalexp = personalDetails.totalWorkExperienceYear;
        this.selectedMonthsfortotalexp =
          personalDetails.totalWorkExperienceMonth;
        this.selectedYearsforcurexp = personalDetails.currentWorkExperienceYear;
        this.selectedMonthsforcurexp =
          personalDetails.currentWorkExperienceMonth;

        this.formValidation.setFormValues(
          this.personalDetails,
          personalDetails,
        );
        this.sourceOfLeadChange(personalDetails.sourcingChannel, 'get');
        this.personalDetails.controls['srcId'].setValue(
          personalDetails.srcId,
        );

        // this.occupationSubcategoryList =
        //   await this.sqliteService.getOccupationMainTypeListFromDb(
        //     '2',
        //     personalDetails.occupationMainCategory,
        //   );
        // this.occupationSubcategoryList = this.occupationSubcategoryList.sort(
        //   (a, b) => a.Description.localeCompare(b.Description),
        // );
        this.occupationsubList =
          this.fullMasterData.OccupationCategory.filter(val => val.Level =="2" && val.ParentLink == personalDetails.occupationMainCategory && val.BizVertival == "16")
          this.occupationsubList = this.occupationsubList.sort(
            (a: any, b: any) => a.Description.localeCompare(b.Description),
          );
        this.personalDetails.controls['occupationSubcategory'].setValue(
          personalDetails.occupationSubcategory,
        );
        this.personalDetails.controls[
          'occupationSubcategory'
        ].updateValueAndValidity();
        // this.occupationList =
        //   await this.sqliteService.getOccupationMainTypeListFromDb(
        //     '3',
        //     personalDetails.occupationSubcategory,
        //   );
        
        this.occupationList =
          this.fullMasterData.OccupationCategory.filter(val => val.Level == "3" && val.ParentLink == personalDetails.occupationSubcategory && val.BizVertival == "16")
        this.personalDetails.controls['occupation'].setValue(
          personalDetails.occupation ? personalDetails.occupation : '',
        );
        this.personalDetails.controls[
          'occupation'
        ].updateValueAndValidity();
        this.mobNumVerify = true;
        // if (this.personalDetails.controls['cifId'].value) {
        //   this.extCustomer = false;
        // }
        // this.onSubChg(personalDetails.occupationSubcategory);
        this.dobChange(personalDetails.dob);
        this.onMontlyIncomeChg(personalDetails.monthlyIncome, 'get')
        this.disableFields = personalDetails.disableFields;
        this.dataUtility.setPersonalDetails(personalDetails);
        this.disableFieldsOnGet();
        // this.autoPopulateLoginUserData();
        this.prefferedlanguageShow(personalDetails.voicesmsreq, 'get');
        // if (personalDetails.panAvail === '2') {
        //   // await this.getDocmentsCount();
        // }
        // if (personalDetails.panAvail === '2') {
        //   if (this.form60DocList[0].imgLength > 0) {
        //     // this.setCompletedStatus(true, 'get');
        //   } else {
        //     // this.setCompletedStatus(false, 'get');
        //   }
        // } else {
        //   // this.setCompletedStatus(true, 'get');
        // }
      }
    } catch (error) {
      console.log(
        error,
        'PersonalDetailsPage-getPersonalDetails',
      );
    }
  }

  disableFieldsOnGet() {
    try {
      this.personalDetails.controls['firstName'].disable();
      this.personalDetails.controls['lastName'].disable();
      this.personalDetails.controls['leadId'].disable();
      // if (this.disableFields.disableMiddleName)
      this.personalDetails.controls['middleName'].disable();
      if (this.disableFields.disableDOB)
        this.personalDetails.controls['dob'].disable();
      if (this.disableFields.disableGender)
        this.personalDetails.controls['gender'].disable();
      // if (this.disableFields.disableFatherName)
      //   this.personalDetails.controls['fatherName'].enable();
      // if (this.disableFields.disableMotherName)
      //   this.personalDetails.controls['motherName'].enable();
    } catch (error) {
      console.log(
        error,
        'PersonalDetailsPage-disableFieldsOnGet',
      );
    }
  }

  /**
   * @method maritalStatus
   * @description Set Spouse Name Mandatory or not.
   * @author GaneshKumar B
   */
  maritalStatus(event, type) {
    try {
      if (event.target.value == '1') {
        this.personalDetails.controls['spouseName'].setValidators(
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(40),
            Validators.pattern('[a-zA-Z ]*'),
          ]),
        ); // Validators.required
        this.personalDetails.controls[
          'spouseName'
        ].updateValueAndValidity();
      } else {
        this.personalDetails.controls['spouseName'].setValue('');
        this.personalDetails.controls['spouseName'].clearValidators();
        this.personalDetails.controls[
          'spouseName'
        ].updateValueAndValidity();
      }
    } catch (error) {
      console.log(error, 'PersonalDetailsPage-maritalStatus');
    }
  }

  async dobChange(event?: any) {
    try {
      let inputValue: any;
      if (event) {
        inputValue = event?.target ? event.target.value : event;
      } else {
        inputValue = this.personalDetails.get('dob')?.value;
      }
      console.log('inputValue', inputValue);
      if (!inputValue || inputValue.length < 4) {
        this.customAlert.presentCustomAlert(
          this.alertErrorLabel.alertLabels.invalidDateInput,
          this.customAlert.warningAlert(),
        );
        return;
      }
      const dobYear = parseInt(inputValue.slice(0, 4), 10);
      const currentYear = new Date().getFullYear();
      const yearDiff = currentYear - dobYear;
      await this.orderYearsMonthList(yearDiff);
    } catch (error) {
      console.log(error, 'PersonalDetailsPage-dobChange');
    }
  }

  async orderYearsMonthList(yearDiff: number) {
    try {
      if (this.yearsList.length > 0) {
        this.yearsList = this.helperFn.sortOrder(this.yearsList);
        this.yearsList = this.yearsList.slice(0, yearDiff);
      }

      // this.monthsList =
      //   await this.sqliteService.getStaticDataById('glExpInMonths');
      if (this.monthsList.length > 0) {
        this.monthsList = this.helperFn.sortOrder(this.monthsList);
      }

      this.noofYearList = this.yearsList
        // await this.sqliteService.getStaticDataById('glExpInYrs');
      this.noofMonthList = this.monthsList
        // await this.sqliteService.getStaticDataById('glExpInMonths');
      this.noofYearList = this.helperFn.sortOrder(this.noofYearList);
      this.noofYearList = this.noofYearList.slice(0, yearDiff);
      this.noofMonthList = this.helperFn.sortOrder(this.noofMonthList);
    } catch (error) {
      console.log(
        error,
        'PersonalDetailsPage-orderYearsMonthList',
      );
    }
  }

   /**
   * @method prefferedlanguageShow
   * @description If the value is 'N',"preferredlanguage" the field is hidden,
   * @author Sandhiya A
   */
   prefferedlanguageShow(event, type) {
    let sms;
    if (type == 'set') {
      sms = event.target.value;
    } else {
      sms = event;
    }
    if (sms === 'N') {
      this.showPreferredlanguage = false;
      this.personalDetails.controls['preferredlanguage'].setValue('');
      this.personalDetails.controls['preferredlanguage'].clearValidators();
    } else {
      this.showPreferredlanguage = true;
      this.personalDetails.controls['preferredlanguage'].setValidators(
        Validators.compose([Validators.required]),
      );
    }
    this.personalDetails.controls[
      'preferredlanguage'
    ].updateValueAndValidity();
  }

  async onMainChg(event) {
    try {
      let parentLink = event.target.value;
      this.occupationsubList =
      this.fullMasterData.OccupationCategory.filter(val => val.Level =="2" && val.ParentLink == parentLink && val.BizVertival == "16")
      this.occupationsubList = this.occupationsubList.sort(
        (a: any, b: any) => a.Description.localeCompare(b.Description),
      );
      this.formValidation.clearFormValues(this.personalDetails, [
        'occupationSubcategory',
        'occupation',
      ]);
    } catch (error) {
      console.log(error, 'PersonalDetailsPage-onMainChg');
    }
  }

  async onSubChg(event) {
    try {
      let parentLink = event.target.value;
      this.occupationList =
      this.fullMasterData.OccupationCategory.filter(val => val.Level =="3" && val.ParentLink == parentLink && val.BizVertival == "16")
      if (this.occupationList.length > 0) {
        this.occupationcodeShow = true;
        this.personalDetails.controls['occupation'].setValidators(
          Validators.compose([Validators.required]),
        );
        this.personalDetails.controls[
          'occupation'
        ].updateValueAndValidity();
      } else {
        this.occupationcodeShow = false;
        this.personalDetails.controls['occupation'].setValue('');
        this.personalDetails.controls['occupation'].clearValidators();
        this.personalDetails.controls[
          'occupation'
        ].updateValueAndValidity();
      }
      console.log(this.occupationList, 'this.occupationCode');
    } catch (error) {
      console.log(error, 'PersonalDetailsPage-onSubChg');
    }
  }

  onMontlyIncomeChg(event, type?) {
    try {
      let monthlyIncome;
      if (type == "get") {
        monthlyIncome = event
      } else {
        monthlyIncome = event.detail.value
      }
      if (+monthlyIncome > +this.monthlyIncList[0].NAME) {
        this.personalDetails.controls['panAvail'].setValue('1');
        this.personalDetails.controls['panAvail'].updateValueAndValidity();
        this.personalDetails.controls['panAvail'].disable();
        // this.onForm60Chg(this.personalDetails.controls['panAvail'].value);
      } else {
        if (type != 'get') {
          this.personalDetails.controls['panAvail'].setValue('');
          this.personalDetails.controls['panAvail'].enable();
        }
      }
      this.personalDetails.controls['panAvail'].updateValueAndValidity();
    } catch (error) {
      console.log(
        error,
        'PersonalDetailsPage-onMontlyIncomeChg',
      );
    }
  }

  // async onForm60Chg(value) {
  //   try {
  //     // 2 -Yes 1 -No
  //     let panMandatoryFlag;
  //     if (value === '2') {
  //       panMandatoryFlag = false;
  //       if (this.dataUtility.getKycDetails().length > 0) {
  //         let kycDetailsList: any[] = this.dataUtility.getKycDetails();
  //         if (
  //           kycDetailsList.find(
  //             (val) => val.idProof === this.helperFn.getKycIdCodes().Pan,
  //           )
  //         ) {
  //           this.customAlert.presentCustomAlert(
  //             this.alertErrorLabel.alertLabels.deletePan,
  //             this.customAlert.warningAlert(),
  //           );
  //           this.personalDetails.controls['panAvail'].setValue('1');
  //           this.personalDetails.controls[
  //             'panAvail'
  //           ].updateValueAndValidity();
  //         }
  //       }
  //       if (this.personalDetails.controls['panAvail'].value === '2') {
  //         // if (this.dataUtility.getPersonalDetailsCompleted()) {
  //         if (this.form60DocList[0].imgLength <= 0) {
  //           this.setCompletedStatus(false, 'get');
  //           // }
  //         }
  //       }
  //     } else {
  //       panMandatoryFlag = true;
  //       if (this.form60DocList[0].imgLength > 0) {
  //         let selectedValue = await this.customAlert.confirmationCustomAlert(
  //           this.alertErrorLabel.alertLabels.confirmAlertDocumentsWillDelete,
  //           this.customAlert.deleteAlert(),
  //         );
  //         if (selectedValue === 'confirm') {
  //           this.customLoading.presentLoading(
  //             this.alertErrorLabel.alertLabels.deletingDocument,
  //           );
  //           let request = this.framerequest.frameDocumentUploadRequest(
  //             'DELETE',
  //             '',
  //             this.form60DocList[0],
  //             this.helperFn.getDocumentId().businessDocument,
  //             [{ CODE: 'FORM60', NAME: 'FORM60' }],
  //           );
  //           let response =
  //             await this.documentHandler.callUploadDocumentService(request);
  //           if (response) {
  //             this.customLoading.dismissLoading();
  //             this.form60DocList[0].imgs = [];
  //             this.form60DocList[0].imgLength = 0;
  //           }
  //         } else {
  //           this.personalDetails.controls['panAvail'].setValue('2');
  //           this.personalDetails.controls[
  //             'panAvail'
  //           ].updateValueAndValidity();
  //           panMandatoryFlag = false;
  //         }
  //       }
  //     }
  //     if (this.dataUtility.getKycDetails()) {
  //       this.sharedFunction.emitKycCompletedStatus(
  //         this.dataUtility.getKycDetails(),
  //         panMandatoryFlag,
  //       );
  //     }
  //   } catch (error) {
  //     this.customLoading.dismissLoading();
  //     console.log(error, 'PersonalDetailsPage-onForm60Chg');
  //   }
  // }

  sourceOfLeadChange(event, type) {
    let source: any;
    if (type == "set") {
      source = event.target.value;
    } else {
      source = event;
    }
    
    this.sourcingIDLabel = this.sourceLeadLableSet(source);
    this.personalDetails.controls['srcId'].setValue('');
    if (source == '1') {
      this.sourceInputType = false;
      this.sourcedrobdownType = false;
      this.personalDetails.controls['srcId'].clearValidators();
    } else {
      this.personalDetails.controls['srcId'].setValidators(
        this.sourceLeadValidationSet(source) as any[]
      );
      if (
        source == '2' ||
        source == '3' ||
        source == '7' ||
        source == '8' ||
        source == '9'
      ) {
        this.sourceInputType = true;
        this.sourcedrobdownType = false;
      } else {
        this.sourceInputType = false;
        this.sourcedrobdownType = true;
        this.sourcingMasterList = this.fullSourcingMasterList.filter(
          (val:any) => val.userType == source,
        );
      }
    }
    this.personalDetails.controls['srcId'].updateValueAndValidity();
  }

  sourceLeadValidationSet(type) {
    try {
      switch (type) {
        case '2':
          return [
            Validators.maxLength(10),
            Validators.minLength(10),
            // Validators.pattern(
            //   /^[a-zA-Z]{3}[pPhH]{1}[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{1}$/,
            // ),
            Validators.pattern('[0-9]{10}$'),
            Validators.required,
          ];
        case '3':
          return [
            Validators.maxLength(8),
            Validators.minLength(8),
            // Validators.pattern(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/),
            Validators.pattern('^UJJ[0-9]*'),
            Validators.required,
          ];
        case '4':
          return [Validators.required];
        case '5':
          return [Validators.required];
        case '6':
          return [Validators.required];
        case '7':
          return [
            // Validators.pattern(/^[A-Za-z]{1}[0-9]{7}$/),
            Validators.pattern('[0-9]{10}$'),
            Validators.maxLength(10),
            Validators.minLength(10),
            Validators.required,
          ];
        case '8':
          return [
            // Validators.pattern(/^[A-Za-z]{1}[0-9]{7}$/),
            // Validators.maxLength(8),
            // Validators.minLength(8),
            Validators.required,
          ];
        case '9':
          return [
            // Validators.pattern(/^[A-Za-z]{1}[0-9]{7}$/),
            // Validators.maxLength(8),
            // Validators.minLength(8),
            Validators.required,
          ];
      }
    } catch (error) {
      console.error(`Error in getKycValidators: ${error.message}`);
      return [];
    }
  }

  sourceLeadLableSet(type) {
    try {
      switch (type) {
        case '1':
          return '';
        case '2':
          return this.sourcingChannelList['contCentere'];
        case '3':
          return this.sourcingChannelList['staffRef'];
        case '4':
          return this.sourcingChannelList['agentBank'];
        case '5':
          return this.sourcingChannelList['dsa'];
        case '6':
          return this.sourcingChannelList['connector'];
        case '7':
          return this.sourcingChannelList['custRef'];
        case '8':
          return this.sourcingChannelList['IB'];
        case '9':
          return this.sourcingChannelList['campaign'];
      }
    } catch (error) {
      console.error(`Error in getKycValidators: ${error.message}`);
      return [];
    }
  }

}
