import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControlService } from '../../services/form-control.service';
import { DataUtilityService } from '../../services/data-utility.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperFunctionService } from '../../services/helper-function.service';
import { AppLabelNames } from '../../utility/appLabels';
import { ErrorMessages } from '../../utility/errorMessages';
import { SqliteService } from '../../services/sqlite.service';
import { KarzaApiService } from '../../services/karza-api.service';
import moment from 'moment';
import { SharedModule } from '../../modules/sharedModule/shared-module';

@Component({
  selector: 'app-customer-name',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  templateUrl: './customer-name.component.html',
  styleUrl: './customer-name.component.scss'
})
export class CustomerNameComponent {

  label: { [key: string]: any };
  customerNamesForm: FormGroup;
  drivingLicenseForm: FormGroup;
  passportForm: FormGroup;
  validation_messages: { [key: string]: any };

  custNameList: any;
  leadId: string;
  applicantLeadId: string;
  idType: string;
  custType: string;
  kycIdValue: string;
  karzaFinalSetResponse: any;
  passportRequest: any;

  mindate: any;
  maxdate: any;
  passportMindate: any;
  passportMaxdate: any;

  showNames: boolean = false;
  enableDlForm: boolean = false;
  enablePassportForm: boolean = false;

  newCustomerValues: any;
  AadhaarResponse: any;

  customPopoverOptions = {
    cssClass: 'custom-popover',
  };

  @ViewChild('header') header: HTMLElement;

  constructor(
    public renderer: Renderer2,
    public formControlService: FormControlService,
    public dataUtility: DataUtilityService,
    public router: Router,
    public element: ElementRef,
    public activatedRoute: ActivatedRoute,
    public helperFn: HelperFunctionService,
    public appLabelName: AppLabelNames,
    public errorMessages: ErrorMessages,
    public sqliteService: SqliteService,
    public karzaApi: KarzaApiService,
  ) {
    this.activatedRoute.queryParamMap.subscribe((data) => {
      this.leadId = JSON.parse(data['params'].leadId);
      this.newCustomerValues = data['params'].kycValue
        ? JSON.parse(data['params'].kycValue)
        : '';
      if (this.newCustomerValues) {
        this.kycIdValue = this.newCustomerValues.idValue;
        this.custType = this.newCustomerValues.custType;
        this.karzaFinalSetResponse = data['params'].karzaResponse
          ? JSON.parse(data['params'].karzaResponse)
          : '';
      }

      this.AadhaarResponse = data['params'].aadhaarCustomerName
        ? JSON.parse(data['params'].aadhaarCustomerName)
        : '';
      if (this.AadhaarResponse) {
        this.karzaFinalSetResponse = data['params'].AadhaarOTPResponse
          ? JSON.parse(data['params'].AadhaarOTPResponse)
          : '';
        this.kycIdValue = data['params'].referenceNumber
          ? JSON.parse(data['params'].referenceNumber)
          : '';
        this.custType = data['params'].custType
          ? this.helperFn.parseJson(data['params'].custType)
          : '';
      }
    });
  }

  async ngOnInit() {
    this.customerNamesForm = this.formControlService.customerNamesForm();
    this.drivingLicenseForm = this.formControlService.drivingLicenseForm();
    this.passportForm = this.formControlService.passportForm();
    this.validation_messages = this.errorMessages.passportErrorMsg();

    this.mindate = moment().subtract(60, 'years').format('YYYY-MM-DD');
    this.maxdate = moment().subtract(18, 'years').format('YYYY-MM-DD');
    this.passportMindate = moment().subtract(30, 'years').format('YYYY-MM-DD');
    this.passportMaxdate = moment().subtract(0, 'years').format('YYYY-MM-DD');

    await this.showPassortDLforms();
    await this.setNamesOfCustomer();
  }

  onContentScroll(event) {
    if (event.detail.scrollTop >= 30) {
      this.renderer.setStyle(this.header['el'], 'top', '-76px');
    } else {
      this.renderer.setStyle(this.header['el'], 'top', '0px');
    }
  }

  /**
   * @method showPassortDLforms
   * @description This function will show DL forms or passport forms based on the kyc id selected.
   * @author Rajesh S
   * **/
  showPassortDLforms() {
    if (
      this.newCustomerValues.idProof === this.helperFn.getKycIdCodes().Passport
    ) {
      this.enablePassportForm = true;
    } else if (
      this.newCustomerValues.idProof ===
      this.helperFn.getKycIdCodes().DrivingLicense
    ) {
      this.enableDlForm = true;
    }
  }

  /**
 * @method onNameChg
 * @description This function will check whether the same name is selcted for middle and last name and it will
 set empty if same name is selected.
 * @author Rajesh S
 * **/
  onNameChg(event, formName: string) {
    try {
      if (
        this.customerNamesForm.controls['firstName'].value ===
        this.customerNamesForm.controls['middleName'].value
      ) {
        this.customerNamesForm.controls['middleName'].setValue(null);
        this.customerNamesForm.controls['middleName'].updateValueAndValidity();
      } else if (
        this.customerNamesForm.controls['firstName'].value ===
        this.customerNamesForm.controls['lastName'].value
      ) {
        this.customerNamesForm.controls['lastName'].setValue(null);
        this.customerNamesForm.controls['lastName'].updateValueAndValidity();
      } else if (
        this.customerNamesForm.controls['middleName'].value ===
        this.customerNamesForm.controls['lastName'].value
      ) {
        this.customerNamesForm.controls['lastName'].setValue(null);
        this.customerNamesForm.controls['lastName'].updateValueAndValidity();
      }
    } catch (error) {
      console.log(error, 'customerNamePage-onNameChg');
    }
  }

  /**
   * @method setNamesOfCustomer
   * @description This function will set the customer names based on the kyc id selected.
   * @author Rajesh S
   * **/
  setNamesOfCustomer() {
    try {
      if (this.AadhaarResponse) {
        this.idType = this.helperFn.getKycIdNames().Aadhar;
        let aadharName: any = Object.values(this.AadhaarResponse)[0];
        this.custNameList = aadharName.split(' ');
        if (this.custNameList.length > 3) {
          let lastFullName: any = this.custNameList
            .slice(2, this.custNameList.length)
            .join(' ');
          let NameArray = this.custNameList.slice(0, 2);
          this.custNameList = NameArray.concat(lastFullName);
        }
        this.mapCustomerNames();
      } else if (
        this.newCustomerValues.idProof === this.helperFn.getKycIdCodes().Pan
      ) {
        this.idType = this.helperFn.getKycIdNames().Pan;
        let panResponseNames = {
          firstname: this.karzaFinalSetResponse.panfirstname
            ? this.karzaFinalSetResponse.panfirstname
            : '',
          middlename: this.karzaFinalSetResponse.panMiddleName
            ? this.karzaFinalSetResponse.panMiddleName
            : '',
          lastname: this.karzaFinalSetResponse.panLastName
            ? this.karzaFinalSetResponse.panLastName
            : '',
        };
        this.custNameList = Object.values(panResponseNames);
        this.custNameList = this.custNameList.filter(Boolean);
        this.mapCustomerNames();
      } else if (
        this.newCustomerValues.idProof === this.helperFn.getKycIdCodes().VoterId
      ) {
        this.idType = this.helperFn.getKycIdNames().VoterId;
        let voterIdResponse = JSON.parse(
          this.karzaFinalSetResponse.responseData.VoterId,
        );
        let custName = voterIdResponse.result.name.split(' ');
        let voterResponseNames = {
          firstname: custName[0] ? custName[0] : '',
          middlename: custName[1] ? custName[1] : '',
          lastname: custName[2] ? custName[2] : '',
        };
        this.custNameList = Object.values(voterResponseNames);
        this.custNameList = this.custNameList.filter(Boolean);
        this.mapCustomerNames();
      } else if (
        this.newCustomerValues.idProof ===
        this.helperFn.getKycIdCodes().DrivingLicense
      ) {
        this.idType = this.helperFn.getKycIdNames().DrivingLicense;
      } else if (
        this.newCustomerValues.idProof ===
        this.helperFn.getKycIdCodes().Passport
      ) {
        this.idType = this.helperFn.getKycIdNames().Passport;
      }
      if (this.custNameList.length > 3) {
        let lastFullName: any = this.custNameList
          .slice(2, this.custNameList.length)
          .join(' ');
        let NameArray = this.custNameList.slice(0, 2);
        this.custNameList = NameArray.concat(lastFullName);
      }

      this.setFirstNameValidation();
    } catch (error) {
      console.log(error, 'customerNamePage-setNamesOfCustomer');
    }
  }

  mapCustomerNames() {
    this.custNameList = this.custNameList.map((NAME, index) => ({
      CODE: index + 1,
      NAME,
    }));
  }

  setValidators(controlName: string, isRequired: boolean) {
    const formControls = this.customerNamesForm.controls;
    if (isRequired) {
      formControls[controlName].setValidators(Validators.required);
    } else {
      formControls[controlName].clearValidators();
    }
    formControls[controlName].updateValueAndValidity();
  }

  // /**
  //  * @method setFirstNameValidation
  //  * @description Updates the validation rules for the customer name form fields
  //  * based on the number of names in the `custNameList`.
  //  * @author Rajesh S
  //  * **/
  // setFirstNameValidation() {
  //   try {
  //     const validationRules = [
  //       { controlName: 'firstName', required: true }, // First name is always required
  //       { controlName: 'lastName', required: this.custNameList.length === 2 }, // Last name required if list has 2 entries
  //       { controlName: 'middleName', required: this.custNameList.length >= 3 }, // Middle name required if list has 3 or more entries
  //     ];
  //     validationRules.forEach(({ controlName, required }) => {
  //       this.setValidators(controlName, required);
  //     });
  //   } catch (error) {
  //    console.log(
  //       error,
  //       'customerNamePage-setFirstNameValidation',
  //     );
  //   }
  // }

  /**
 * @method setFirstNameValidation
 * @description This function will set the validations based on the length of custname list.
 * @author Rajesh S
 * **/
  setFirstNameValidation() {
    try {
      if (this.custNameList.length == 1) {
        this.customerNamesForm.controls['lastName'].clearValidators();
        this.customerNamesForm.controls['lastName'].updateValueAndValidity();
        this.customerNamesForm.controls['middleName'].clearValidators();
        this.customerNamesForm.controls['middleName'].updateValueAndValidity();
        this.customerNamesForm.controls['firstName'].setValidators(Validators.required);
        this.customerNamesForm.controls['firstName'].updateValueAndValidity();
      } else if (this.custNameList.length == 2) {
        this.customerNamesForm.controls['middleName'].clearValidators();
        this.customerNamesForm.controls['middleName'].updateValueAndValidity();
        this.customerNamesForm.controls['lastName'].setValidators(Validators.required);
        this.customerNamesForm.controls['lastName'].updateValueAndValidity();
        this.customerNamesForm.controls['firstName'].setValidators(Validators.required);
        this.customerNamesForm.controls['firstName'].updateValueAndValidity();
      } else if (this.custNameList.length == 3) {
        this.customerNamesForm.controls['lastName'].setValidators(Validators.required);
        this.customerNamesForm.controls['lastName'].updateValueAndValidity();
        this.customerNamesForm.controls['middleName'].setValidators(Validators.required);
        this.customerNamesForm.controls['middleName'].updateValueAndValidity();
        this.customerNamesForm.controls['firstName'].setValidators(Validators.required);
        this.customerNamesForm.controls['firstName'].updateValueAndValidity();
      } else {
        this.customerNamesForm.controls['lastName'].setValidators(Validators.required);
        this.customerNamesForm.controls['lastName'].updateValueAndValidity();
        this.customerNamesForm.controls['middleName'].setValidators(Validators.required);
        this.customerNamesForm.controls['middleName'].updateValueAndValidity();
        this.customerNamesForm.controls['firstName'].setValidators(Validators.required);
        this.customerNamesForm.controls['firstName'].updateValueAndValidity();
      }
    } catch (error) {
      console.log(error, "customerNamePage-setFirstNameValidation");
    }
  }

  /**
   * @method submitCustomerNames
   * @description This function set the karza response and navigate to core-lead page.
   * @author Rajesh S
   * **/
  submitCustomerNames(value) {
    try {
      let response = {
        firstName: value.firstName
          ? this.custNameList.find((val) => val.CODE == value.firstName).NAME
          : '',
        lastName: value.lastName
          ? this.custNameList.find((val) => val.CODE == value.lastName).NAME
          : '',
        middleName: value.middleName
          ? this.custNameList.find((val) => val.CODE == value.middleName).NAME
          : '',
      };

      if (this.dataUtility.getApplicantType() == 'A') {
        this.applicantLeadId = this.dataUtility.getApplicantLeadId();
      } else if (this.dataUtility.getApplicantType() == 'C') {
        this.applicantLeadId = this.dataUtility.getCoApplicantLeadId();
      }
      if (this.customerNamesForm.valid) {
        this.dataUtility.setKarzaResponse({
          leadId: this.applicantLeadId,
          idType: this.idType,
          idValue: this.kycIdValue.toString(),
          firstName: response.firstName || '',
          middleName: response.middleName ? response.middleName : '',
          lastName: response.lastName || '',
          karzaResponse: this.karzaFinalSetResponse,
          custType: this.custType,
          customerType: 'N',
          Request: this.dataUtility.getPassportRequest() || '',
        });

        console.log(
          'this.dataUtility.setKarzaResponse',
          this.dataUtility.getKarzaResponse(),
        );
        // this.helperFn.navigateToPage('/core-tabs/personal-details', {
        //   idResponse: JSON.stringify(response),
        //   idTpye: this.idType,
        //   custType: this.custType,
        // });
        this.helperFn.navigateToPage('/core-tabs', {
          idResponse: JSON.stringify(response),
          idTpye: this.idType,
          custType: this.custType,
        });
      } else {
        // Form is invalid, mark all fields as touched
        Object.keys(this.customerNamesForm.controls).forEach((field) => {
          const control: any = this.customerNamesForm.get(field);
          control.markAsTouched();
        });

        // Show error messages and scroll to the first invalid control
        this.scrollToFirstInvalidControl();
      }
    } catch (error) {
      console.log(
        error,
        'customerNamePage-submitCustomerNames',
      );
    }
  }
  private scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement =
      this.element.nativeElement.querySelector('form .ion-invalid');
    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      firstInvalidControl.focus();
    }
  }

  /**
   * @method validateDL
   * @description This function will validate the given driving license number by calling the 
   karza api service and responds with personal infomations such as name,dob,gender, address details etc.
  * @author Rajesh S
  * **/
  async validateDL(value) {
    try {
      let dlresponse: any = await this.karzaApi.validateDL(
        this.kycIdValue,
        this.leadId,
        value.dob,
      );
      if (dlresponse) {
        this.showNames = true;
        this.enableDlForm = false;
        this.karzaFinalSetResponse = dlresponse;
        this.custNameList = dlresponse.result.name.split(' ');
        this.mapCustomerNames();
        this.setFirstNameValidation();
      }
    } catch (error) {
      console.log('customerNamePage-validateDL', error);
    }
  }

  /**
  * @method validatePassport
  * @description This function will validate the given passport number by calling the 
  karza api service and responds with personal infomations such as name,dob,gender etc.
  * @author Rajesh S
  * **/
  async validatePassport(value) {
    try {
      value.idValue = this.kycIdValue;
      let passportResponse: any = await this.karzaApi.validatePassport(
        value,
        this.leadId,
        value.dob,
      );
      if (passportResponse) {
        this.custNameList =
          passportResponse.result.name.nameFromPassport.split(' ');
        if (passportResponse.result.name.surnameFromPassport) {
          this.custNameList.push(
            passportResponse.result.name.surnameFromPassport,
          );
        }
        this.showNames = true;
        this.enablePassportForm = false;
        this.karzaFinalSetResponse = passportResponse;
        this.mapCustomerNames();
        this.setFirstNameValidation();
      }
    } catch (error) {
      console.log('customerNamePage-validatePassport', error);
    }
  }

}
