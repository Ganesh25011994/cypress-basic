import { Component } from '@angular/core';
import { ValidationConfig, staticMaster } from '../../utility/app-interfaces';
import { SqliteService } from '../../services/sqlite.service';
import { DataUtilityService } from '../../services/data-utility.service';
import { FormControlService } from '../../services/form-control.service';
import { ErrorMessages } from '../../utility/errorMessages';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../modules/sharedModule/shared-module';
import { HelperFunctionService } from '../../services/helper-function.service';
import { CustomAlertService } from '../../services/custom-alert.service';
import { CustomLoadingService } from '../../services/custom-loading.service';
import { AlertErrorLabel } from '../../utility/AlertErrorLabel';
import { FormValidationsService } from '../../utility/form-validations';
import moment from 'moment';
import { FrameRequestsService } from '../../services/frame-requests.service';
import { RestServiceService } from '../../services/rest-service.service'
import { SharedFunctionService } from '../../services/shared-function.service';

@Component({
  selector: 'app-kyc-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  templateUrl: './kyc-details.component.html',
  styleUrl: './kyc-details.component.scss'
})
export class KycDetailsComponent {
  kycDetails: FormGroup;
  kycDocsList: staticMaster[] = [];
  bioMetricFlagList: any[] = [];
  kycDuplicateDocsList: staticMaster[] = [];
  
  validation_messages: { [key: string]: any };

  panMandatoryFlag: boolean = false;
  popoverKYC: boolean = false;
  disableField: boolean = false;
  disableFieldDate: boolean = false;
  disablePassIssueDate: boolean = false;
  kycIdArray: any = [];
  enableVerifyBtn: boolean = false;
  viewDetails: boolean = false;

  KYCDetailsweb: any;
  panIndividual: string;
  maxdate: string;
  mindate: string;
  minExpiryDate: string;
  maxExpiryDate: string;
  textType: string = 'text';
  showAadhar: boolean = true;
  expiryShow: boolean = false;
  showPassportFile: boolean = false;
  vaultStatus: string = 'N';
  maxlengthValue: number = 12;
  disableAadhar: boolean = false;
  personalDetailsStatus: boolean = false;
  personalDetails: any;
  leadId: string;

  appAlreadyAddedKycList = [];

  constructor(
    public sqliteService: SqliteService, public dataUtility: DataUtilityService,
    public formControlService: FormControlService, public errorMessages: ErrorMessages,
    public helperFn: HelperFunctionService, public customAlert: CustomAlertService, 
    public alertErrorLabel: AlertErrorLabel, public formValidation: FormValidationsService,
    public customLoading: CustomLoadingService, public framerequest: FrameRequestsService,
    public restService: RestServiceService, public sharedFunction: SharedFunctionService
  ) {

  }

  async ngOnInit() {
    this.kycDetails = this.formControlService.kycLeadForm();
    this.validation_messages = this.errorMessages.kycdetailsLeadErrorMsg();
    this.kycDocsList = [
      {CODE: "1", NAME: "Aadhaar"},
      {CODE: "2", NAME: "Pan"},
      {CODE: "3", NAME: "Voter ID"},
      {CODE: "4", NAME: "Passport"},
      {CODE: "5", NAME: "Driving License"},
      {CODE: "6", NAME: "NREGA"},
      {CODE: "7", NAME: "Letter PPF"},
      {CODE: "8", NAME: "Others"}
    ]
    this.bioMetricFlagList = [
      {CODE: "2", NAME: "OTP"},
      {CODE: "1", NAME: "Biometric"}
    ]
    this.dataUtility.setKycDocsList(this.kycDocsList);
    this.kycDuplicateDocsList = this.kycDocsList;
    if (this.dataUtility.getPersonalDetails()) {
      this.personalDetailsStatus = true;
      this.personalDetails = this.dataUtility.getPersonalDetails();
      this.checkPanMandotory();
    }
  }

  checkPanMandotory() {
    if (this.personalDetails.panAvail === '1') {
      this.panMandatoryFlag = true;
    } else {
      this.panMandatoryFlag = false;
    }
  }

   /**
   *  * * @method onDocListChg
   * @description This function will clear the validations while changing the drop down and set validtions.
   * @author Rajesh S
   */
   onDocListChg(event) {
    try {
      if (
        event.target.value === this.helperFn.getKycIdCodes().Pan &&
        !this.panMandatoryFlag
      ) {
        this.customAlert.presentCustomAlert(
          this.alertErrorLabel.alertLabels.panAlert,
          this.customAlert.warningAlert(),
        );
        this.formValidation.clearFormValues(this.kycDetails, ['idProof']);
        return;
      }
      this.popoverKYC = false;
      let clearFields = ['idValue', 'issueDate', 'expiryDate'];
      this.formValidation.clearFormValues(this.kycDetails, clearFields);
      this.disableField = false;
      this.disableFieldDate = false;
      this.disablePassIssueDate = false;
      this.kycDetails.controls['idValue'].enable();

      this.filterOutAlreadyAddedKyc();
      this.checkForEnableVerifyBtn();
      this.setValidations(event);
      this.viewDetails = false;
    } catch (error) {
      console.log(error, 'LeadKycComponent-onDocListChg');
    }
  }

  filterOutAlreadyAddedKyc() {
    this.kycIdArray.forEach((data) => {
      this.kycDocsList = this.kycDocsList.filter(
        (val) => val.CODE != data.idProof,
      );
    })
  }

  checkForEnableVerifyBtn() {
    try {
      this.enableVerifyBtn = ['1', '2', '3', '4', '5'].includes(
        this.kycDetails.controls['idProof'].value,
      );
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *  * * @method setValidations
   * @description This function will set the validations based on the selected kyc ids.
   * @author Rajesh S
   */
  async setValidations(event) {
    try {
      this.KYCDetailsweb = this.dataUtility.getKarzaResponse() || '';
      if (this.KYCDetailsweb.customerType == 'E') {
        this.KYCDetailsweb.karzaResponse = this.KYCDetailsweb.AadhaarResponse;
      }
      const selectedId = event.detail.value;
      // if (this.KYCDetailsweb) {
      this.panIndividual = this.KYCDetailsweb.custType;
      let birthday = this.dataUtility.getPersonalDetails()
        ? this.dataUtility.getPersonalDetails().dob
        : '';
      this.mindate = moment(birthday).format('YYYY-MM-DD');
      let clearFields = ['expiryDate', 'fileNo'];
      this.formValidation.clearAllValidations(this.kycDetails, clearFields);
      switch (selectedId) {
        case this.helperFn.getKycIdCodes().Pan:
          this.handlePanValidation();
          break;
        case this.helperFn.getKycIdCodes().Aadhar:
          this.handleAadharValidation();
          break;
        case this.helperFn.getKycIdCodes().VoterId:
          this.handleVoterIdValidation(birthday);
          break;
        case this.helperFn.getKycIdCodes().Passport:
          this.handlePassportValidation();
          break;
        case this.helperFn.getKycIdCodes().DrivingLicense:
          this.handleDlValidation(birthday);
          break;
        case this.helperFn.getKycIdCodes().Nrega:
          this.handleNregaValidation(birthday);
          break;
        case this.helperFn.getKycIdCodes().Letterppf:
          this.handleLetterppfValidation(birthday);
          break;
      }
      // }
    } catch (error) {
      console.log(error, 'LeadKycComponent-setValidations');
    }
  }

  handlePanValidation() {
    try {
      this.resetBooleanValidations();
      this.maxlengthValue = 10;
      const validator =
        this.panIndividual === '2'
          ? this.helperFn.getKycIdNames().NonPan
          : this.helperFn.getKycIdNames().Pan;
      this.kycDetails.controls['idValue'].setValidators(
        this.formValidation.getKycValidators(validator) as any[]
      );
      if (
        this.KYCDetailsweb.idType == this.helperFn.getKycIdNames().Pan &&
        this.KYCDetailsweb.customerType == 'N'
      ) {
        this.kycDetails.controls['idValue'].setValue(
          this.KYCDetailsweb.idValue,
        );

        this.kycDetails.controls['karzaResponse'].setValue(
          this.KYCDetailsweb.karzaResponse,
        );
        this.resetBooleanValidations({ disableField: true, vaultStatus: 'Y' });
      } else if (
        this.KYCDetailsweb.idType == this.helperFn.getKycIdNames().ExistCust
      ) {
        let panPattern = /^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/;
        let PANNumber = this.KYCDetailsweb?.AadhaarResponse?.pan;
        if (panPattern.test(PANNumber)) {
          this.kycDetails.controls['idValue'].setValue(
            this.KYCDetailsweb.AadhaarResponse.pan,
          );
        }
      }
      this.kycDetails.controls['idValue'].updateValueAndValidity();
      this.kycDetails.controls['karzaResponse'].updateValueAndValidity();
    } catch (error) {
      console.log(
        error,
        'LeadKycComponent-handlePanValidation',
      );
    }
  }

  handleAadharValidation() {
    try {
      this.resetBooleanValidations({ textType: 'tel', showAadhar: true });
      this.maxlengthValue = 12;
      this.disableAadhar = false;
      this.kycDetails.controls['idValue'].setValidators(
        this.formValidation.getKycValidators(
          this.helperFn.getKycIdNames().Aadhar
        ) as any[],
      );

      if (this.KYCDetailsweb.idType == this.helperFn.getKycIdNames().Aadhar) {
        this.kycDetails.controls['idValue'].setValue(
          this.KYCDetailsweb.idValue,
        );
        this.kycDetails.controls['idValue'].clearValidators();
        let bioFlag = '';
        if (this.KYCDetailsweb.karzaResponse.aadharFlag === 'OTP') {
          bioFlag = this.bioMetricFlagList.find(
            (val) => val.NAME === 'OTP',
          ).CODE;
        } else {
          bioFlag = this.bioMetricFlagList.find(
            (val) => val.NAME != 'OTP',
          ).CODE;
        }
        this.kycDetails.controls['otpBioFlag'].setValue(bioFlag);
        this.kycDetails.controls['otpBioFlag'].updateValueAndValidity();
        this.disableAadhar = true;
        this.resetBooleanValidations({
          textType: 'tel',
          showAadhar: true,
          vaultStatus: 'Y',
        });
        this.kycDetails.controls['karzaResponse'].setValue(
          this.KYCDetailsweb.karzaResponse,
        );
        this.kycDetails.controls['karzaResponse'].updateValueAndValidity();
      } else if (
        this.KYCDetailsweb.idType == this.helperFn.getKycIdNames().ExistCust
      ) {
        let aadhaarRefNum = this.KYCDetailsweb.AadhaarResponse.aadhar;
        if (aadhaarRefNum) {
          this.kycDetails.controls['idValue'].setValue(aadhaarRefNum);
          this.kycDetails.controls['idValue'].clearValidators();

          this.disableAadhar = true;
          this.resetBooleanValidations({
            textType: 'tel',
            showAadhar: true,
            vaultStatus: 'Y',
          });
        }
      }
      this.kycDetails.controls['idValue'].updateValueAndValidity();
    } catch (error) {
      console.log(
        error,
        'LeadKycComponent-handleAadharValidation',
      );
    }
  }

  handleVoterIdValidation(birthday) {
    try {
      this.resetBooleanValidations();
      this.maxlengthValue = 16;
      this.mindate = moment(birthday).add(18, 'years').format('YYYY-MM-DD');
      this.kycDetails.controls['idValue'].setValidators(
        Validators.compose(
          this.formValidation.getKycValidators(
            this.helperFn.getKycIdNames().VoterId,
          )as any[],
        )
      );
      if (this.KYCDetailsweb.idType == this.helperFn.getKycIdNames().VoterId) {
        this.kycDetails.controls['idValue'].setValue(
          this.KYCDetailsweb.idValue,
        );

        this.kycDetails.controls['karzaResponse'].setValue(
          this.KYCDetailsweb.karzaResponse,
        );
        this.resetBooleanValidations({ disableField: true, vaultStatus: 'Y' });
      } else if (
        this.KYCDetailsweb.idType == this.helperFn.getKycIdNames().ExistCust
      ) {
        let voterIDValue = this.KYCDetailsweb.AadhaarResponse.voterId;
        if (voterIDValue) {
          let panPattern = /^[a-zA-Z0-9]/;
          let VoterIDNumber = this.KYCDetailsweb.AadhaarResponse.voterId;
          if (panPattern.test(VoterIDNumber)) {
            if (VoterIDNumber.length >= 10 && VoterIDNumber.length <= 16) {
              this.kycDetails.controls['idValue'].setValue(VoterIDNumber);
            }
          }
        }
      }
      this.kycDetails.controls['idValue'].updateValueAndValidity();
      this.kycDetails.controls['karzaResponse'].updateValueAndValidity();
    } catch (error) {
      console.log(
        error,
        'LeadKycComponent-handleVoterIdValidation',
      );
    }
  }

  handlePassportValidation() {
    try {
      this.resetBooleanValidations({
        expiryShow: true,
        showPassportFile: true,
      });
      this.maxlengthValue = 8;
      this.kycDetails.controls['expiryDate'].setValidators(
        Validators.compose([Validators.required]),
      );
      this.kycDetails.controls['expiryDate'].updateValueAndValidity();

      this.kycDetails.controls['fileNo'].setValidators(
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z0-9]*'),
        ]),
      );
      this.kycDetails.controls['fileNo'].updateValueAndValidity();

      this.kycDetails.controls['idValue'].setValidators(
        Validators.compose(
          this.formValidation.getKycValidators(
            this.helperFn.getKycIdNames().Passport,
          ) as any[]
        )
      );
      if (this.KYCDetailsweb.idType == this.helperFn.getKycIdNames().Passport) {
        let fileNo = this.KYCDetailsweb.Request.fileNo;
        // let karzaValue = this.KYCDetailsweb.karzaResponse.responseData.passport
        let issueDate =
          this.KYCDetailsweb.karzaResponse?.result?.dateOfIssue
            ?.dispatchedOnFromSource;

        // let issueDate = karzaValue.result.dateOfIssue.dispatchedOnFromSource
        this.kycDetails.controls['idValue'].setValue(
          this.KYCDetailsweb.idValue,
        );

        this.kycDetails.controls['karzaResponse'].setValue(
          this.KYCDetailsweb.karzaResponse,
        );

        this.kycDetails.controls['fileNo'].setValue(fileNo);
        this.kycDetails.controls['fileNo'].updateValueAndValidity();
        this.kycDetails.controls['issueDate'].setValue(
          issueDate ? issueDate.split('/').reverse().join('-') : '',
        );
        this.kycDetails.controls['issueDate'].updateValueAndValidity();

        this.resetBooleanValidations({
          expiryShow: true,
          showPassportFile: true,
          disableField: true,
          vaultStatus: 'Y',
        });
        // this.disableFieldDate = false
        if (issueDate) {
          this.disablePassIssueDate = true;
        } else {
          this.disablePassIssueDate = false;
        }
      }
      this.kycDetails.controls['idValue'].updateValueAndValidity();
      this.kycDetails.controls['karzaResponse'].updateValueAndValidity();
    } catch (error) {
      console.log(
        error,
        'LeadKycComponent-handlePassportValidation',
      );
    }
  }

  handleDlValidation(birthday) {
    try {
      this.resetBooleanValidations({ expiryShow: true });
      this.maxlengthValue = 20;
      this.kycDetails.controls['expiryDate'].setValidators(
        Validators.compose([Validators.required]),
      );
      this.kycDetails.controls['expiryDate'].updateValueAndValidity();
      this.mindate = moment(birthday).add(18, 'years').format('YYYY-MM-DD');
      this.kycDetails.controls['idValue'].setValidators(
        Validators.compose(
          this.formValidation.getKycValidators(
            this.helperFn.getKycIdNames().DrivingLicense,
          ) as any[]
        )
      );
      let clearFields = ['fileNo'];
      this.formValidation.clearAllValidations(this.kycDetails, clearFields);
      if (
        this.KYCDetailsweb.idType ==
        this.helperFn.getKycIdNames().DrivingLicense
      ) {
        this.kycDetails.controls['idValue'].setValue(
          this.KYCDetailsweb.idValue,
        );
        this.kycDetails.controls['karzaResponse'].setValue(
          this.KYCDetailsweb.karzaResponse,
        );
        if (this.KYCDetailsweb.karzaResponse) {
          let karzaData = this.KYCDetailsweb.karzaResponse.result;
          let issueData = karzaData.issueDate
            ? karzaData.issueDate.split('-').reverse().join('-')
            : '';
          this.kycDetails.controls['issueDate'].setValue(issueData);
          this.kycDetails.controls['issueDate'].updateValueAndValidity();
          // let expiryDate = karzaData.validity.nonTransport ? karzaData.validity.nonTransport.split(" ")[2].split("-").reverse().join("-") : "";
          let nonTransport, expiryDate;
          if (karzaData.validity.nonTransport) {
            nonTransport = karzaData.validity.nonTransport.split(' ');
            if (nonTransport.length > 1) {
              expiryDate = karzaData.validity.nonTransport
                .split(' ')[2]
                .split('-')
                .reverse()
                .join('-');
            } else {
              expiryDate = nonTransport[0].split('-').reverse().join('-');
            }
          }
          this.kycDetails.controls['expiryDate'].setValue(
            expiryDate ? expiryDate : '',
          );
          this.kycDetails.controls['expiryDate'].updateValueAndValidity();
        }
        this.resetBooleanValidations({
          expiryShow: true,
          disableField: true,
          vaultStatus: 'Y',
          disableFieldDate: true,
        });

        this.kycDetails.controls['idValue'].disable();
      }
      else if (
        this.KYCDetailsweb.idType == this.helperFn.getKycIdNames().ExistCust
      ) {
        if (this.KYCDetailsweb.karzaResponse.documentCode.toLowerCase() == 'driving license') {
          this.kycDetails.controls['idValue'].setValue(this.KYCDetailsweb.karzaResponse.kycdocumentsNo2)
        }
      }
      this.kycDetails.controls['idValue'].updateValueAndValidity();
      this.kycDetails.controls['karzaResponse'].updateValueAndValidity();
    } catch (error) {
      console.log(error, 'LeadKycComponent-handleDlValidation');
    }
  }

  handleNregaValidation(birthday) {
    try {
      this.resetBooleanValidations();
      this.maxlengthValue = 20;
      this.mindate = moment(birthday).add(18, 'years').format('YYYY-MM-DD');
      this.kycDetails.controls['idValue'].setValidators(
        Validators.compose(
          this.formValidation.getKycValidators(
            this.helperFn.getKycIdNames().DrivingLicense,
          ) as any[]
        )
      );
      this.kycDetails.controls['idValue'].updateValueAndValidity();
      if (this.KYCDetailsweb.idType == 'nrega') {
        this.kycDetails.controls['idValue'].setValue(
          this.KYCDetailsweb.idValue,
        );
        this.kycDetails.controls['idValue'].updateValueAndValidity();
        this.disableField = true;
      }
    } catch (error) {
      console.log(
        error,
        'LeadKycComponent-handleNregaValidation',
      );
    }
  }

  handleLetterppfValidation(birthday) {
    try {
      this.resetBooleanValidations();
      this.maxlengthValue = 20;
      this.mindate = moment(birthday).add(18, 'years').format('YYYY-MM-DD');
      this.kycDetails.controls['idValue'].setValidators(
        Validators.compose(
          this.formValidation.getKycValidators(
            this.helperFn.getKycIdNames().DrivingLicense,
          ) as any[]
        ),
      );
      this.kycDetails.controls['idValue'].updateValueAndValidity();
      if (this.KYCDetailsweb.letter == 'nrega') {
        this.kycDetails.controls['idValue'].setValue(
          this.KYCDetailsweb.idValue,
        );
        this.kycDetails.controls['idValue'].updateValueAndValidity();
        this.disableField = true;
      }
    } catch (error) {
      console.log(
        error,
        'LeadKycComponent-handleLetterppfValidation',
      );
    }
  }

  resetBooleanValidations(config: ValidationConfig = {}) {
    this.textType = config.textType || 'text';
    this.showAadhar = config.showAadhar || false;
    this.expiryShow = config.expiryShow || false;
    this.showPassportFile = config.showPassportFile || false;
    this.vaultStatus = config.vaultStatus || 'N';
    this.disableField = config.disableField || false;
    this.disableFieldDate = config.disableFieldDate || false;
    this.disablePassIssueDate = config.disablePassIssueDate || false;
  }

  async kycDetailsSave(value) {
    try {
      if (this.personalDetailsStatus) {
        this.kycDetailsSaveValue(value);
      } else {
        this.customAlert.presentCustomAlert(
          this.alertErrorLabel.alertLabels.completePersonaldetails,
        );
      }
    } catch (error) {
      console.log(error, 'LeadKycComponent-kycDetailsSave');
    }
  }

  async kycDetailsSaveValue(value) {
    try {
      if (!this.dataUtility.getProfilePicComplete()) {
        this.customAlert.presentCustomAlert(
          this.alertErrorLabel.alertLabels.captureProfilePic,
          this.customAlert.warningAlert(),
        );
        return;
      }
      const idProof = this.kycDetails.controls['idProof'].value;
      if (
        (idProof === this.helperFn.getKycIdCodes().Aadhar ||
          idProof === this.helperFn.getKycIdCodes().Pan ||
          idProof === this.helperFn.getKycIdCodes().VoterId ||
          idProof === this.helperFn.getKycIdCodes().Passport ||
          idProof === this.helperFn.getKycIdCodes().DrivingLicense) &&
        this.vaultStatus == 'N'
      ) {
        let kycidName: any = this.kycDocsList.find(
          (val) => val.CODE === value.idProof,
        );
        this.customAlert.presentCustomAlert(
          `Please validate ${kycidName.NAME}!`,
          this.customAlert.warningAlert(),
        );
        return;
      } else {
        if (
          this.dataUtility.getApplicantType() ==
          this.helperFn.appCustomerTypes().CoApplicant
        ) {
          if (this.appAlreadyAddedKycList.length > 0) {
            let alreadyAdded = this.appAlreadyAddedKycList.filter(
              (val: any) => val.idValue === value.idValue,
            );
            if (alreadyAdded.length > 0) {
              let kycidName: any = this.kycDocsList.find(
                (val) => val.CODE === value.idProof,
              );
              this.customAlert.presentCustomAlert(
                `${kycidName.NAME} already exist!`,
                this.customAlert.warningAlert(),
              );
              return;
            } else {
              this.savingKYCDetails(value);
            }
          }
        } else {
          this.savingKYCDetails(value);
        }
      }
    } catch (error) {
      console.log(
        error,
        'LeadKycComponent-kycDetailsSaveValue',
      );
    }
  }

  async savingKYCDetails(value) {
    let index = this.kycIdArray.indexOf(value);
    try {
      value = this.kycDetails.getRawValue()
      this.customLoading.presentLoading('Saving kyc details...');
      value.vaultStatus = this.vaultStatus;
      value.applicantType = this.dataUtility.getApplicantType()
        ? this.dataUtility.getApplicantType()
        : 'A';
      value.leadId = this.leadId;
      value.karzaResponse = this.helperFn.stringifyData(value.karzaResponse);
      this.kycIdArray.push(value);
      let request = this.framerequest.frameSaveGetRequest(
        'SAVE',
        this.helperFn.pageIds().KycDetails,
        this.kycIdArray,
      );
      let response: any = await this.restService.restApiCall(
        this.helperFn.getServiceNames().GoldOnlineApk,
        request,
      );
      if (response.errorCode === this.helperFn.errorCodes().ErrorCode) {
        this.customLoading.dismissLoading();
        this.kycDetails.reset();
        this.kycIdArray = response.responseData;
        this.filterOutAlreadyAddedKyc();
        this.emitKycTick(this.kycIdArray);
        this.dataUtility.setKycDetails(response.responseData);
        this.showAadhar = false;
        this.textType = 'text';
        this.disableField = false;
        this.disableFieldDate = false;
        this.disablePassIssueDate = false;
        this.vaultStatus = 'N';
        this.customAlert.presentCustomAlert(
          `KYC details ${response.errorDesc}`,
          this.customAlert.successAlert(),
        );
      } else {
        this.kycIdArray.splice(index, 1);
        this.customLoading.dismissLoading();
        this.customAlert.presentCustomAlert(
          `KYC Details ${response.errorDesc}`,
          this.customAlert.warningAlert(),
        );
      }
    } catch (error) {
      this.customLoading.dismissLoading();
      this.kycIdArray.splice(index, 1);
      console.log(error, 'LeadKycComponent-savingKYCDetails');
    }
  }

  emitKycTick(kycIdArray) {
    this.sharedFunction.emitKycCompletedStatus(
      kycIdArray,
      this.panMandatoryFlag,
    );
  }

}
