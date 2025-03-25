import { Injectable } from '@angular/core';
import { CustomLoadingService } from './custom-loading.service';
import { CustomAlertService } from './custom-alert.service';
import { FrameRequestsService } from './frame-requests.service'
import { HelperFunctionService } from './helper-function.service';
import { RestServiceService } from './rest-service.service';
import { DataUtilityService } from './data-utility.service';
import { AlertErrorLabel } from '../utility/AlertErrorLabel';
import { ApiResponse } from '../utility/app-interfaces';

@Injectable({
  providedIn: 'root'
})
export class SharedFunctionService {

  KYCDetailsweb: any;

  constructor(public customLoading: CustomLoadingService, public frameRequest: FrameRequestsService, 
    public helperFn: HelperFunctionService, public restService: RestServiceService,
    public customAlert: CustomAlertService, public dataUtility: DataUtilityService,
    public alertErrorLabel: AlertErrorLabel
  ) { }

  async serviceCallForApplicantKycDetails(): Promise<[]> {
    return new Promise(async (resolve, reject) => {
      this.customLoading.presentLoading('Fetching kyc details...');
      let request = this.frameRequest.frameGetApplicantAllDetails(
        this.helperFn.pageIds().KycDetails,
      );
      let response: any = await this.restService.angularHttpService(
        this.helperFn.getServiceNames().GetpagewiseList,
        request,
      );
      let applicantKYCResponse = response;
      if (
        applicantKYCResponse.errorCode === this.helperFn.errorCodes().ErrorCode
      ) {
        this.customLoading.dismissLoading();
        if (applicantKYCResponse.pagewiseList.length == 1) {
          resolve(JSON.parse(applicantKYCResponse.pagewiseList).responseData);
        } else {
          let allData = applicantKYCResponse.pagewiseList.map(
            (data) => JSON.parse(data).responseData,
          );
          resolve(allData.flat());
        }
      } else {
        this.customLoading.dismissLoading();
        this.customAlert.presentCustomAlert(
          applicantKYCResponse.errorDesc,
          this.customAlert.warningAlert(),
        );
      }
    });
  }

  async setKycAddedList() {
    try {
      let kycAdded: any[] = [];
      kycAdded = [...this.dataUtility.getKycDetails()];
      if (kycAdded.length > 0) {
        let kycDocsList: any[] = [];
        // kycDocsList = await this.sqliteService.getStaticDataById('Idproof');
        kycDocsList = [
          {CODE: "1", NAME: "Aadhaar"},
          {CODE: "2", NAME: "Pan"},
          {CODE: "3", NAME: ""},
          {CODE: "4", NAME: ""},
          {CODE: "5", NAME: ""},
          {CODE: "6", NAME: ""},
          {CODE: "7", NAME: ""},
          {CODE: "8", NAME: ""}
        ]
        kycDocsList = kycDocsList.filter(function (val) {
          return kycAdded.some(function (data: any) {
            return val.CODE == data.idProof;
          });
        });
        kycDocsList = kycDocsList.filter((val) => val.CODE != '2');
        return kycDocsList;
      } else {
        return [];
      }
    } catch (error) { }
  }

  
  async verifyPincode(pincode) {
    try {
      this.customLoading.presentLoading(
        this.alertErrorLabel.alertLabels.fetchingStateCity,
      );
      const request = this.frameRequest.pincodeRequest(pincode);
      let response: any = await this.restService.restApiCall(
        this.helperFn.getServiceNames().stateccity,
        request,
      );
      if (response.ErrorCode === this.helperFn.errorCodes().ErrorCode) {
        this.customLoading.dismissLoading();
        return response;
      } else {
        this.customLoading.dismissLoading();
        this.customAlert.presentCustomAlert(
          response.ErrorStatus,
          this.customAlert.warningAlert(),
        );
        return false;
      }
    } catch (error) {
      this.customLoading.dismissLoading();
      console.log(error, 'PersonalDetailsPage-verifyPincode');
    }
  }

  emitKycCompletedStatus(kycIdArray, panMandatoryFlag?) {
    try {
      const kycIdCount = kycIdArray.length;
      this.KYCDetailsweb = this.dataUtility.getKarzaResponse();
      if (this.KYCDetailsweb.idType == 'Exisiting Customer') {
        this.KYCDetailsweb.karzaResponse = this.KYCDetailsweb.AadhaarResponse;
      }
      if (this.KYCDetailsweb) {
        const kycCode = this.helperFn.getKycCodeBasedonId(
          this.KYCDetailsweb.idType,
        );
        if (this.KYCDetailsweb.customerType === 'N') {
          if (panMandatoryFlag) {
            if (
              kycIdCount >= 2 &&
              kycIdArray.filter((data) => data.idProof == kycCode).length > 0 &&
              kycIdArray.filter((data) => data.idProof == this.helperFn.getKycIdCodes().Pan).length > 0
            ) {
              this.completeKyc();
            } else {
              this.incompleteKyc();
            }
          } else { 
            if (
              kycIdCount >= 2 &&
              kycIdArray.filter((data) => data.idProof == kycCode).length > 0
            ) {
              this.completeKyc();
            } else {
              this.incompleteKyc();
            }

          }
        } else {
          if (panMandatoryFlag) {
            if (
              kycIdCount >= 2 &&
              kycIdArray.filter((data) => data.idProof == this.helperFn.getKycIdCodes().Aadhar).length > 0 &&
              kycIdArray.filter((data) => data.idProof == this.helperFn.getKycIdCodes().Pan).length > 0
            ) {
              this.completeKyc();
            } else {
              this.incompleteKyc();
            }
          } else {
            if (
              kycIdCount >= 2 &&
              kycIdArray.filter(
                (data) => data.idProof == this.helperFn.getKycIdCodes().Aadhar,
              ).length > 0
            ) {
              this.completeKyc();
            } else {
              this.incompleteKyc();
            }
          }
          
        }
      }
    } catch (error) {
      console.log(error, 'LeadKycComponent-emitKycTick');
    }
  }

  completeKyc() {
    this.dataUtility.setKycDetailsCompleted(true);
    this.dataUtility.setKycComplete(true);
    // this.dataUtility.setPageCompletedStatus({
    //   label: PageLabels.KYC,
    //   flag: true,
    // });
  }

  incompleteKyc() {
    this.dataUtility.setKycDetailsCompleted(false);
    this.dataUtility.setKycComplete(false);
    // this.dataUtility.setPageCompletedStatus({
    //   label: PageLabels.KYC,
    //   flag: false,
    // });
  }

  async commonSaveGetDetails(page: string, type: string, value?: any) {
    try {
      const pageDetails = this.getPageDetails(page, type);
      this.customLoading.presentLoading(pageDetails.loadingMsg);
      let request = this.frameRequest.frameSaveGetRequest(
        type,
        pageDetails.pageId,
        value,
      );
      let response: ApiResponse = await this.restService.restApiCall(
        this.helperFn.getServiceNames().GoldOnlineApk,
        request,
      );
      if (response.errorCode === this.helperFn.errorCodes().ErrorCode) {
        this.customLoading.dismissLoading();
        this.setResponseDetails(page, response, type);
        return response.responseData;
      } else {
        this.customLoading.dismissLoading();
        this.customAlert.presentCustomAlert(
          response.errorDesc,
          this.customAlert.warningAlert(),
        );
        return false;
      }
    } catch (error) {
      console.log(
        error,
        'SahredFunctions-saveKarzaResponse',
        page,
        type,
        value ? value : '',
      );
      this.customLoading.dismissLoading();
      console.log(error, 'SahredFunctions-saveKarzaResponse');
      return false;
    }
  }

  getPageDetails(page: string, type: string) {
    let loadingMsg, pageId;
    switch (page) {
      case 'personal':
        loadingMsg = this.alertErrorLabel.alertLabels.fetchingPersonalDetails;
        pageId = this.helperFn.pageIds().personalDetails;
        break;
      case 'kyc':
        loadingMsg =
          type === this.helperFn.getMethodTypes().Save
            ? this.alertErrorLabel.alertLabels.saveKycDetails
            : this.alertErrorLabel.alertLabels.fetchingKycDetails;
        pageId = this.helperFn.pageIds().KycDetails;
        break;
      case 'present':
        loadingMsg =
          type === this.helperFn.getMethodTypes().Save
            ? this.alertErrorLabel.alertLabels.savingPresentAddress
            : this.alertErrorLabel.alertLabels.fetchingPresentAddress;
        pageId = this.helperFn.pageIds().presentAddressDetails;
        break;
      case 'permanent':
        loadingMsg =
          type === this.helperFn.getMethodTypes().Save
            ? this.alertErrorLabel.alertLabels.savingPermAddress
            : this.alertErrorLabel.alertLabels.fetchingPermanentAddress;
        pageId = this.helperFn.pageIds().permanentAddressDetails;
        break;
      case 'posidex':
        loadingMsg = this.alertErrorLabel.alertLabels.fetchingPosidexDetails;
        pageId = this.helperFn.pageIds().PosidexDetails;
        break;
      case 'bureau':
        loadingMsg = this.alertErrorLabel.alertLabels.fetchingBureau;
        pageId = this.helperFn.pageIds().bureauDetails;
        break;
      case 'presanction':
        loadingMsg =
          type === this.helperFn.getMethodTypes().Save
            ? this.alertErrorLabel.alertLabels.savePreSanction
            : this.alertErrorLabel.alertLabels.fetchingPreSanctionDocs;
        pageId = this.helperFn.pageIds().incomeDocs;
        break;
    }
    return { loadingMsg, pageId };
  }

  setResponseDetails(page: string, response: ApiResponse, type: string) {
    try {
      switch (page) {
        case 'personal':
          this.dataUtility.setPersonalDetails(response.responseData);
          break;
        case 'kyc':
          this.dataUtility.setKycDetails(response.responseData);
          break;
        case 'present':
          this.dataUtility.setPresentAddressDetails(response.responseData);
          if (type === this.helperFn.getMethodTypes().Save) {
            this.customAlert.presentCustomAlert(
              `Present Address Details ${response.errorDesc}.`,
              this.customAlert.successAlert(),
            );
          }
          break;
        case 'permanent':
          this.dataUtility.setPermanentAddressDetails(response.responseData);
          if (type === this.helperFn.getMethodTypes().Save) {
            this.customAlert.presentCustomAlert(
              `Permanent Address Details ${response.errorDesc}.`,
              this.customAlert.successAlert(),
            );
          }
          break;
        case 'posidex':
          this.dataUtility.setPosidexDetails(response.responseData);
          break;
        default:
          return;
      }
    } catch (error) {
      console.log(
        error,
        'PersonalDetailsPage-setResponseDetails',
      );
    }
  }

  async saveGetKarzaResponse(type: 'SAVE' | 'GET') {
    try {
      const loadingMsg =
        type === this.helperFn.getMethodTypes().Save
          ? this.alertErrorLabel.alertLabels.saveKarzaLoad
          : this.alertErrorLabel.alertLabels.getKarzaLoad;
      const OnboardKarzaResponse = this.dataUtility.getKarzaResponse() || '';
      this.customLoading.presentLoading(loadingMsg);
      const request = this.frameRequest.frameSaveGetRequest(
        type,
        this.helperFn.pageIds().KarzaDetails,
        OnboardKarzaResponse,
      );
      const response: ApiResponse = await this.restService.restApiCall(
        this.helperFn.getServiceNames().GoldOnlineApk,
        request,
      );
      if (response.errorCode === this.helperFn.errorCodes().ErrorCode) {
        this.customLoading.dismissLoading();
        this.dataUtility.setKarzaResponse(response.responseData);
        return true;
      } else {
        this.customLoading.dismissLoading();
        this.customAlert.presentCustomAlert(
          response.errorDesc,
          this.customAlert.warningAlert(),
        );
        return false;
      }
    } catch (error) {
      this.customLoading.dismissLoading();
      console.log(
        error,
        'PersonalDetailsPage-saveKarzaResponse',
      );
      return false;
    }
  }
}
