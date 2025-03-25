import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../modules/sharedModule/shared-module';
import { FormControlService } from '../../services/form-control.service';
import { ErrorMessages } from '../../utility/errorMessages';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MediaHandlerService } from '../../services/media-handler.service';
import { HelperFunctionService } from '../../services/helper-function.service';
import { DataUtilityService } from '../../services/data-utility.service';
import { SharedFunctionService } from '../../services/shared-function.service';
import { CustomAlertService } from '../../services/custom-alert.service';
import { FormValidationsService } from '../../utility/form-validations';
import { staticMaster } from '../../utility/app-interfaces';
import { KarzaApiService } from '../../services/karza-api.service';
import { AlertErrorLabel } from '../../utility/AlertErrorLabel';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.scss'
})

export class NewCustomerComponent {
  leadId: string;
  newCustomerForm: FormGroup;
  validation_messages: { [key: string]: any };

  applicantType: string;

  customerTypes = [
    {MAS_ID: "444", CODE: "B", NAME: "Borrower", TYPE: "CustomerType"}
  ]

  kycDocList = [
    {MAS_ID: "471", CODE: "1", NAME: "Aadhaar", TYPE: "Idproof"},
    {MAS_ID: "472", CODE: "2", NAME: "Pan", TYPE: "Idproof"},
    {MAS_ID: "473", CODE: "3", NAME: "Voter ID", TYPE: "Idproof"},
    {MAS_ID: "474", CODE: "4", NAME: "Passport", TYPE: "Idproof"},
    {MAS_ID: "475", CODE: "5", NAME: "Driving License", TYPE: "Idproof"},
    {MAS_ID: "476", CODE: "6", NAME: "NREGA", TYPE: "Idproof"},
    {MAS_ID: "477", CODE: "7", NAME: "Letter PPF", TYPE: "Idproof"},
    {MAS_ID: "478", CODE: "8", NAME: "Others", TYPE: "Idproof"}
  ]

  methodList = [
    {MAS_ID: "494", CODE: "2", NAME: "OTP", TYPE: "BioMetricFlag"},
    {MAS_ID: "495", CODE: "1", NAME: "Biometric", TYPE: "BioMetricFlag"}
  ]

  uploadSuccess: boolean = true;

  textType: string = 'text';
  showAadhar: boolean = false;
  maxlengthValue: number;

  alreadyAddedKycDetails = [];

  constructor(public formcontrol: FormControlService, public errormsg: ErrorMessages, 
    public mediaHandler: MediaHandlerService, public helperFn: HelperFunctionService,
    public dataUtility: DataUtilityService, public sharedFn: SharedFunctionService,
    public customAlert: CustomAlertService, public formValidation: FormValidationsService,
    public karzaApi: KarzaApiService, public alertErrorLabel: AlertErrorLabel
  ) {

  }

  ngOnInit() {
    this.newCustomerForm = this.formcontrol.newCustomerDetailsForm()
    this.validation_messages = this.errormsg.newCustomerErrorMsg()
    this.kycDocList = this.kycDocList.filter(
      (val) => val.CODE != '6' && val.CODE != '7' && val.CODE != '8' && val.CODE != '2',
    );
    this.applicantType = this.dataUtility.getApplicantType();
    this.applicantType = "A"
  }

  // async captureConsentForm() {
  //   try {
  //     let consentForm = await this.mediaHandler.captureImage();
  //     if (consentForm) {
  //       this.uploadSuccess = true;
  //       this.dataUtility.setConsentForm(consentForm);
  //     }
  //   } catch (error) {
  //     this.errorHandling.errorLog(
  //       error,
  //       'ChooseCustomerPage-captureConsentForm',
  //     );
  //   }
  // }

  async validateNewCustomer(newCustomerValue) {
    try {
      this.leadId = this.helperFn.generateLeadId();
      if (this.newCustomerForm.valid) {
        if (this.applicantType === this.helperFn.appCustomerTypes().Applicant) {
          this.dataUtility.setApplicantLeadId(this.leadId);
          this.callValidateServices(newCustomerValue, this.leadId);
        } else if (
          this.applicantType === this.helperFn.appCustomerTypes().CoApplicant
        ) {
          this.dataUtility.setCoApplicantLeadId(this.leadId);
          this.alreadyAddedKycDetails =
            await this.sharedFn.serviceCallForApplicantKycDetails();
          if (this.alreadyAddedKycDetails.length > 0) {
            let alreadyAdded = this.alreadyAddedKycDetails.filter(
              (val: any) => val.idValue === newCustomerValue.idValue,
            );
            if (alreadyAdded.length > 0) {
              let kycidName: any = this.kycDocList.find(
                (val) => val.CODE === newCustomerValue.idProof,
              );
              this.customAlert.presentCustomAlert(
                `${kycidName.NAME} already exist!`,
                this.customAlert.warningAlert(),
              );
              this.formValidation.clearFormValues(this.newCustomerForm, [
                'idValue',
              ]);
            } else {
              this.callValidateServices(newCustomerValue, this.leadId);
            }
          }
        }
      }
    } catch (error) {
      console.log(
        error,
        'ChooseCustomerPage-validateNewCustomer',
      );
    }
  }

  /**
   * @method onIdProofChg
   * @description This function will set the validations based on the kyc id selected.
   * @author Rajesh S
   * **/
  onIdProofChg(event) {
    try {
      const idProof = event.target.value;
      this.newCustomerForm.controls['idValue'].setValue('');
      const kycIdCodes = this.helperFn.getKycIdCodes();
      const kycIdNames = this.helperFn.getKycIdNames();
      const entityType = this.helperFn.getEntityType().individual;
      this.textType = 'text';
      this.showAadhar = false;
      let validators: any;
      switch (idProof) {
        case kycIdCodes.Pan:
          this.maxlengthValue = 10;
          validators = this.formValidation.getKycValidators(kycIdNames.Pan);
          if (this.newCustomerForm.controls['custType'].value === entityType) {
            this.newCustomerForm.controls['idValue'].setValidators(
              Validators.compose(validators),
            );
            this.newCustomerForm.controls['idValue'].updateValueAndValidity();
          }
          break;
        case kycIdCodes.Aadhar:
          this.showAadhar = true;
          this.textType = 'tel';
          this.maxlengthValue = 12;
          validators = this.formValidation.getKycValidators(kycIdNames.Aadhar);
          this.newCustomerForm.controls['idValue'].setValidators(
            Validators.compose(validators),
          );
          this.newCustomerForm.controls['idValue'].updateValueAndValidity();
          break;

        case kycIdCodes.VoterId:
          this.maxlengthValue = 16;
          validators = this.formValidation.getKycValidators(kycIdNames.VoterId);
          this.newCustomerForm.controls['idValue'].setValidators(
            Validators.compose(validators),
          );
          this.newCustomerForm.controls['idValue'].updateValueAndValidity();
          break;

        case kycIdCodes.Passport:
          this.maxlengthValue = 8;
          validators = this.formValidation.getKycValidators(
            kycIdNames.Passport,
          );
          this.newCustomerForm.controls['idValue'].setValidators(
            Validators.compose(validators),
          );
          this.newCustomerForm.controls['idValue'].updateValueAndValidity();
          break;

        case kycIdCodes.DrivingLicense:
          this.maxlengthValue = 20;
          validators = this.formValidation.getKycValidators(
            kycIdNames.DrivingLicense,
          );
          this.newCustomerForm.controls['idValue'].setValidators(
            Validators.compose(validators),
          );
          this.newCustomerForm.controls['idValue'].updateValueAndValidity();
          break;

        default:
          this.customAlert.presentCustomAlert(
            'Validation is not set',
            this.customAlert.warningAlert(),
          );
          return;
      }
    } catch (error) {
      console.log(error, 'ChooseCustomerPage-onIdProofChg');
    }
  }


  /**
   * @method callValidateServices
   * @description This function will call the validate services based on the selected kyc id.
   * @author Rajesh S
   * **/
  callValidateServices(newCustomerValue: any, leadId: string): void {
    try {
      const { idProof } = newCustomerValue;
      const kycIdCodes = this.helperFn.getKycIdCodes();

      switch (idProof) {
        case kycIdCodes.Pan:
          this.validatePanNumber(newCustomerValue, leadId);
          break;

        case kycIdCodes.Aadhar:
          this.validateAadharNumber(newCustomerValue, leadId);
          break;

        case kycIdCodes.VoterId:
          this.validateVoterIdNumber(newCustomerValue, leadId);
          break;

        case kycIdCodes.Passport:
        case kycIdCodes.DrivingLicense:
          this.validatePassportAndDL(newCustomerValue, leadId);
          break;

        default:
          this.customAlert.presentCustomAlert(
            'Service not integrated',
            this.customAlert.warningAlert(),
          );
      }
    } catch (error) {
      console.log('ChooseCustomerPage-callValidateServices', error);
    }
  }

  /**
 * @method validatePanNumber
 * @description This function will validate the given PAN number by calling the 
 karza api service.
 * @author Rajesh S
 * **/
  async validatePanNumber(newCustomerValue, leadId) {
    try {
      let panResponse: any = await this.karzaApi.validatePAN(
        newCustomerValue.idValue,
        leadId,
        '',
      );
      if (panResponse) {
        this.proceedToChooseName(
          newCustomerValue,
          leadId,
          JSON.stringify(panResponse),
        );
      }
    } catch (error) {
      console.log(
        error,
        'ChooseCustomerPage-validatePanNumber',
      );
    }
  }

  /**
     * @method validateVoterIdNumber
     * @description This function will validate the given  number by calling the 
     karza api service.
     * @author Rajesh S
     * **/
     async validateVoterIdNumber(newCustomerValue, leadId) {
      try {
        let voterResponse: any = await this.karzaApi.validateVoterId(
          newCustomerValue.idValue,
          leadId,
        );
        if (voterResponse) {
          this.proceedToChooseName(
            newCustomerValue,
            leadId,
            JSON.stringify(voterResponse),
          );
        }
      } catch (error) {
        console.log(
          error,
          'ChooseCustomerPage-validateVoterIdNumber',
        );
      }
    }

    /**
   * @method proceedToChooseName
   * @description This function will navigate to the customer name page.
   * @author Rajesh S
   * **/
  validatePassportAndDL(value, leadId) {
    try {
      this.proceedToChooseName(value, leadId);
    } catch (error) {
      console.log(error, 'ChooseCustomerPage-validatePassport');
    }
  }

 /**
  * @method validateAadharNumber
  * @description This function will validate the given aadhar number by calling the 
  karza api service.
  * @author Rajesh S
  * **/
  async validateAadharNumber(newCustomerValue, leadId) {
    try {
      if (this.applicantType === this.helperFn.appCustomerTypes().CoApplicant) {
        this.aadharVaultLookupforCoApp(newCustomerValue, leadId);
      } else {
        this.callAadharService(newCustomerValue, leadId);
      }
    } catch (error) {
      console.log(
        error,
        'ChooseCustomerPage-validateAadharNumber',
      );
    }
  }

  /**
   * @method proceedToChooseName
   * @description This function will navigate to the customer name page.
   * @author Rajesh S
   * **/
  proceedToChooseName(newCustomerValue, leadId, karzaResponse?) {
    try {
      this.helperFn.navigateToPage('/customer-name', {
        kycValue: JSON.stringify(newCustomerValue),
        leadId,
        karzaResponse: karzaResponse,
      });
    } catch (error) {
      console.log(
        error,
        'ChooseCustomerPage-proceedToChooseName',
      );
    }
  }

  /**
   * @method aadharVaultLookupforCoApp
   * @description This function will check whethr same aadhar number is used in the application.
   * @author Rajesh S
   * **/
  async aadharVaultLookupforCoApp(newCustomerValue, leadId) {
    try {
      let valutResponse: any = await this.karzaApi.aadharVaultLookup(
        newCustomerValue.idValue,
        leadId,
      );
      if (valutResponse.errorCode === this.helperFn.errorCodes().ErrorCode) {
        if (valutResponse.aadharRefNum) {
          let alreadyAdded = this.alreadyAddedKycDetails.filter(
            (val: any) => val.idValue === valutResponse.aadharRefNum,
          );
          if (alreadyAdded.length > 0) {
            this.customAlert.presentCustomAlert(
              this.alertErrorLabel.alertLabels.aadhaarNumberExist,
              this.customAlert.warningAlert(),
            );
            this.formValidation.clearFormValues(this.newCustomerForm, [
              'idValue',
            ]);
          } else {
            this.callAadharService(newCustomerValue, leadId);
          }
        }
      } else if (valutResponse.errorCode === '2') {
        this.callAadharService(newCustomerValue, leadId);
      }
    } catch (error) {
      console.log(
        error,
        'ChooseCustomerPage-aadharVaultLookupforCoApp',
      );
    }
  }

   /**
   * @method callAadharService
   * @description This function will navigate to otp page or bio page based on the user selection.
   * @author Rajesh S
   * **/
   callAadharService(value, leadId) {
    try {
      let aadhaarNum = this.newCustomerForm.controls['idValue'].value;
      if (value.methodType == '1') {
        this.helperFn.navigateToPage('/bio-metric', {
          leadId: leadId,
          aadhaarNum: aadhaarNum,
          applicantType: this.applicantType,
          custType: value.custType,
        });
      } else {
        this.helperFn.navigateToPage('/aadhar-otp', {
          leadId: leadId,
          aadhaarNum: aadhaarNum,
          applicantType: this.applicantType,
          custType: value.custType,
        });
      }
    } catch (error) {
      console.log(error, 'ChooseCustomerPage-validateAadhar');
    }
  }

}
