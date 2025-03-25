import { Injectable } from '@angular/core';
import { CustomLoadingService } from './custom-loading.service';
import { FrameRequestsService } from './frame-requests.service';
import { RestServiceService } from './rest-service.service';
import { HelperFunctionService } from './helper-function.service';
import { CustomAlertService } from './custom-alert.service';
import { AlertErrorLabel } from '../utility/AlertErrorLabel';
import { DataUtilityService } from './data-utility.service';

@Injectable({
  providedIn: 'root'
})
export class KarzaApiService {

  constructor(
    public customLoading: CustomLoadingService, public frameRequest: FrameRequestsService,
    public rest: RestServiceService, public helperFn: HelperFunctionService, public customAlert: CustomAlertService,
    public alertErrorLabel: AlertErrorLabel, public dataUtility: DataUtilityService
  ) { }

   /**
* @method validatePAN
* @description This function will validate the given PAN number by calling the 
karza api service.
* @author Rajesh S
* **/
  async validatePAN(idValue, leadId, personalVal) {
    try {
      let name, fatherName, dob;
      if (personalVal) {
        name = `${personalVal.firstName}${personalVal.middleName.length > 0 ? personalVal.middleName : ' '}${personalVal.lastName}`;
        fatherName = personalVal.fatherName;
        dob = personalVal.dob ? personalVal.dob : personalVal.dateOfBirth;
        dob = dob.split('-').reverse().join('/');
      }
      this.customLoading.presentLoading(
        this.alertErrorLabel.alertLabels.validatePan,
      );
      let panRequest = this.frameRequest.framePanRequest({
        idValue,
        leadId,
        name,
        dob,
        fatherName,
      });
      let response: any = await this.rest.restApiCall(
        this.helperFn.getServiceNames().Panvalidation,
        panRequest,
        'Y',
      );
      let panResponse = response['PanValidation']
        ? response['PanValidation']
        : response;
      if (
        panResponse.ErrorCode == this.helperFn.errorCodes().ErrorCode ||
        panResponse.success
      ) {
        this.customLoading.dismissLoading();
        return panResponse;
      } else {
        this.customLoading.dismissLoading();
        this.customAlert.presentCustomAlert(
          panResponse.ErrorStatus
            ? panResponse.ErrorStatus
            : panResponse.responseData.errorDesc,
          this.customAlert.warningAlert(),
        );
      }
    } catch (error) {
      this.customLoading.dismissLoading();
      console.log(error, 'KarzaApiService-validatePAN');
      throw error;
    }
  }

  /**
  * @method validateVoterId
  * @description This function will validate the given  number by calling the 
  karza api service.
  * @author Rajesh S
  * **/
  async validateVoterId(idValue, leadId) {
    try {
      this.customLoading.presentLoading(
        this.alertErrorLabel.alertLabels.validateVoterId,
      );
      let voterIdRequest = this.frameRequest.frameVoterIdRequest(
        idValue,
        leadId,
      );
      let response: any = await this.rest.restApiCall(
        this.helperFn.getServiceNames().VoterIdAuthentication,
        voterIdRequest,
        'Y',
      );
      let voterResponse = response['voterResp']
        ? response['voterResp']
        : response;
      if (voterResponse.success) {
        this.customLoading.dismissLoading();
        return voterResponse;
      } else {
        this.customLoading.dismissLoading();
        this.customAlert.presentCustomAlert(
          voterResponse.responseData.errorDesc,
          this.customAlert.warningAlert(),
        );
      }
    } catch (error) {
      this.customLoading.dismissLoading();
      console.log(error, 'KarzaApiService-validateVoterId');
      throw error;
    }
  }

  /**
  * @method validateDL
  * @description This function will validate the given driving license number by calling the 
  karza api service and responds with personal infomations such as name,dob,gender, address details etc.
  * @author Rajesh S
  * **/
  async validateDL(idValue, leadId, dob) {
    try {
      this.customLoading.presentLoading(
        this.alertErrorLabel.alertLabels.validateDl,
      );
      let dlRequest = this.frameRequest.frameDLRequest(idValue, leadId, dob);
      let response: any = await this.rest.restApiCall(
        this.helperFn.getServiceNames().DriverLicenseAuthentication,
        dlRequest,
        'Y',
      );
      let dlResponse = response['dlResp'] ? response['dlResp'] : response;
      if (dlResponse.success) {
        this.customLoading.dismissLoading();
        let dlData = JSON.parse(dlResponse.responseData.driverLicense);
        if (dlData.statusCode == 101) {
          dlData = JSON.stringify(dlData);
          dlData = dlData.replace('father/husband', 'fathername');
          dlData = JSON.parse(dlData);
          dlData.result.name = this.helperFn.replaceSpecialCharacters(
            dlData.result.name,
          );
          return dlData;
        } else {
          this.getErrorMessage(dlData.statusCode, dlResponse);
          return;
        }
      } else {
        this.customLoading.dismissLoading();
        this.customAlert.presentAlert(
          'Alert',
          dlResponse.responseData.errorDesc,
        );
      }
    } catch (error) {
      this.customLoading.dismissLoading();
      console.log(error, 'KarzaApiService-validateDL');
      throw error;
    }
  }

  getErrorMessage(statusCode: number, dlPassortResponse?: any) {
    this.customLoading.dismissLoading();
    switch (statusCode) {
      case 102:
        this.customAlert.presentCustomAlert(
          'Invalid ID number or combination of inputs',
          this.customAlert.warningAlert(),
        );
        break;

      case 103:
        this.customAlert.presentCustomAlert(
          'No records found for the given ID or combination of inputs',
          this.customAlert.warningAlert(),
        );
        break;

      case 104:
        this.customAlert.presentCustomAlert(
          'Max retries exceeded',
          this.customAlert.warningAlert(),
        );
        break;

      case 105:
        this.customAlert.presentCustomAlert(
          'Missing Consent',
          this.customAlert.warningAlert(),
        );
        break;

      case 106:
        this.customAlert.presentCustomAlert(
          'Multiple Records Exist',
          this.customAlert.warningAlert(),
        );
        break;

      case 107:
        this.customAlert.presentCustomAlert(
          'Not Supported',
          this.customAlert.warningAlert(),
        );
        break;

      case 108:
        this.customAlert.presentCustomAlert(
          'Internal Resource Unavailable',
          this.customAlert.warningAlert(),
        );
        break;

      case 109:
        this.customAlert.presentCustomAlert(
          'Too many records Found',
          this.customAlert.warningAlert(),
        );
        break;

      default:
        this.customAlert.presentCustomAlert(
          dlPassortResponse.responseData.errorDesc,
          this.customAlert.warningAlert(),
        );
        break;
    }
  }

  /**
  * @method validatePassport
  * @description This function will validate the given passport number by calling the 
  karza api service and responds with personal infomations such as name,dob,gender etc.
  * @author Rajesh S
  * **/
  async validatePassport(value, leadId, dob) {
    try {
      let passportData;
      this.customLoading.presentLoading(
        this.alertErrorLabel.alertLabels.validatePassport,
      );
      let passportRequest = this.frameRequest.framePassportRequest(
        value,
        leadId,
        dob,
      );
      let response: any = await this.rest.restApiCall(
        this.helperFn.getServiceNames().PassportMRZ,
        passportRequest,
        'Y',
      );
      let passportResponse = response['passportResp']
        ? response['passportResp']
        : response;
      if (passportResponse.success) {
        this.dataUtility.setPassportRequest(passportRequest);
        this.customLoading.dismissLoading();
        passportData = JSON.parse(passportResponse.responseData.passport);
        if (passportData.statusCode == 101) {
          passportData.result.name.nameFromPassport =
            this.helperFn.replaceSpecialCharacters(
              passportData.result.name.nameFromPassport,
            );
        }
        return passportData;
      } else {
        this.getErrorMessage(passportData.statusCode, passportResponse);
        return;
      }
    } catch (error) {
      this.customLoading.dismissLoading();
      console.log(error, 'KarzaApiService-validatePassport');
      throw error;
    }
  }


/**
  * @method aadharVaultLookup
  * @description This function will call the service to generate the reference number for 
  the given aadhar number.
  * @author Rajesh S
  * **/
  async aadharVaultLookup(aadhaarNumber, leadId) {
    try {
      this.customLoading.presentLoading(
        this.alertErrorLabel.alertLabels.fetechingReferenceNo,
      );
      let retrieveResponse;
      let body = this.frameRequest.frameAadhaarvaultLookup(
        aadhaarNumber,
        leadId,
      );
      let response: any;
      // if (environment.pointLocal) {
        response = await this.rest.angularHttpService(
          this.helperFn.getServiceNames().aadharvaultlookup,
          body,
          'Y',
        );
      // } else {
      //   response = await this.rest.angularHttpService(this.helperFn.getServiceNames().aadharvaultlookup, body);
      // }
      retrieveResponse = response['VaultLoolUp']
        ? response['VaultLoolUp']
        : response;
      if (
        retrieveResponse.errorCode === this.helperFn.errorCodes().ErrorCode ||
        retrieveResponse.errorCode === '2'
      ) {
        this.customLoading.dismissLoading();
        return retrieveResponse;
      } else if (retrieveResponse.errorCode === '3') {
        this.customLoading.dismissLoading();
        this.customAlert.presentAlert(
          this.alertErrorLabel.alertLabels.alert,
          this.alertErrorLabel.alertLabels.invalidAadhaarNumber,
        );
        return;
      } else {
        this.customLoading.dismissLoading();
        this.customAlert.presentAlert(
          this.alertErrorLabel.alertLabels.alert,
          retrieveResponse.ErrorStatus
            ? retrieveResponse.ErrorStatus
            : retrieveResponse.status,
        );
        return;
      }
    } catch (error) {
      this.customLoading.dismissLoading();
      console.log(error, 'KarzaApiService-aadharVaultLookup');
      throw error;
    }
  }
}
