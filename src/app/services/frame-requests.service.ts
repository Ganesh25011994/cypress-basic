import { Injectable } from '@angular/core';
import { DataUtilityService } from './data-utility.service';
import { HelperFunctionService } from './helper-function.service';
import { GlobalService } from './global.service';
import { AadharVault, DlRequest, DocumentDeleteRequest, DocumentUploadRequest, PanRequest, PassportRequest, SaveGetPayload, Vaultlookup, VoterIdRequest } from '../utility/app-interfaces';

@Injectable({
  providedIn: 'root'
})
export class FrameRequestsService {
  applicantLeadId: string;
  borrowerType: string;
  leadId: any;
  constructor(
    public dataUtility: DataUtilityService, public helperFn: HelperFunctionService, public global: GlobalService
  ) { }

  frameGetApplicantAllDetails(pageId) {
    return {
      leadID: this.dataUtility.getApplicantLeadId(),
      branchID: localStorage.getItem('BranchCode'),
      userID: localStorage.getItem('username'),
      verticle: this.helperFn.getVerticle().goldDesc,
      pageID: pageId,
      token: this.global.genToken(),
    };
  }

  framePanRequest(panValues): PanRequest {
    return {
      pan: panValues.idValue,
      uniqueID: panValues.leadId,
      name: panValues.name || '',
      dob: panValues.dob || '',
      fathername: panValues.fatherName || '',
      vertical: this.helperFn.getVerticle().goldDesc,
      token: this.global.genToken(),
    };
  }

  frameVoterIdRequest(idValue, leadId): VoterIdRequest {
    return {
      UniqueID: leadId,
      epicNo: idValue,
      token: this.global.genToken(),
      vertical: this.helperFn.getVerticle().goldCode,
    };
  }

  frameDLRequest(idValue, leadId, dob): DlRequest {
    return {
      dlNo: idValue,
      dob: dob.split('-').reverse().join('-'),
      UniqueID: leadId,
      token: this.global.genToken(),
      vertical: this.helperFn.getVerticle().goldCode,
    };
  }

  pincodeRequest(pincode) {
    return {
      pincode,
      token: this.global.genToken(),
    };
  }

  framePassportRequest(value, leadId, dob): PassportRequest {
    return {
      name: '',
      passportNo: value.idValue,
      fileNo: value.fileNo,
      dob: dob.split('-').reverse().join('/'),
      doi: '',
      UniqueID: leadId,
      token: this.global.genToken(),
      vertical: this.helperFn.getVerticle().goldCode,
    };
  }


  frameAadhaarvaultLookup(
    aadhaarNumber,
    leadId,
    vault?,
  ): AadharVault | Vaultlookup {
    if (vault) {
      return {
        aadharNumber: aadhaarNumber,
        uniqueId: leadId,
        token: this.global.genToken(),
      };
    }
    return {
      aadharNumber: aadhaarNumber,
      aadharRefNum: '',
      uniqueId: leadId,
      token: this.global.genToken(),
    };
  }

  frameSaveGetRequest(
    type: 'SAVE' | 'GET' | string,
    pageID: string,
    jsonData?: any,
  ): SaveGetPayload | undefined{
    const payload = this.frameCommonSaveGetRequest(type, pageID);
    if (type === 'SAVE') {
      return {
        ...payload,
        appStatus: 'E',
        jsonData: jsonData ? JSON.stringify(jsonData) : '',
      };
    } else if (type === 'GET') {
      return payload;
    }
  }

  frameCommonSaveGetRequest(
    type: 'SAVE' | 'GET' | string,
    pageID: string,
    jsonData?: any,
  ): SaveGetPayload {
    const applicantType = this.dataUtility.getApplicantType();
    const verticle = this.helperFn.getVerticle().goldDesc;
    const branchID = localStorage.getItem('BranchCode');
    const userID = localStorage.getItem('username');
    const token = this.global.genToken();

    if (applicantType === 'A') {
      this.applicantLeadId = this.dataUtility.getApplicantLeadId();
      this.borrowerType = 'B';
    } else if (applicantType === 'C') {
      this.applicantLeadId = this.dataUtility.getCoApplicantLeadId();
      this.borrowerType = 'C';
    }
    return {
      leadID: this.dataUtility.getApplicantLeadId(),
      branchID,
      pageID,
      userID,
      verticle,
      applicantId: this.applicantLeadId,
      borrowerType: this.borrowerType,
      type,
      token,
    };
  }

  frameGetLeadRequest(status) {
    return {
      branchID: localStorage.getItem('BranchCode'),
      userID: localStorage.getItem('username'),
      verticle: this.helperFn.getVerticle().goldDesc,
      appStatus: status,
      token: this.global.genToken(),
    };
  }

  frameDocumentUploadRequest(
    type: 'GET' | 'DELETE' | 'UPLOAD' | string,
    jsonData?: any,
    docDetails?: any,
    docType?: any,
    docListArray?: any,
  ): DocumentUploadRequest | DocumentDeleteRequest | undefined{
    try {
      const applicantType = this.dataUtility.getApplicantType();
      const verticle = this.helperFn.getVerticle().goldDesc;
      const branchID = localStorage.getItem('BranchCode');
      const userID = localStorage.getItem('username');
      const token = this.global.genToken();
      if (applicantType === 'A') {
        this.applicantLeadId = this.dataUtility.getApplicantLeadId();
        this.borrowerType = 'B';
      } else if (applicantType === 'C') {
        this.applicantLeadId = this.dataUtility.getCoApplicantLeadId();
        this.borrowerType = 'C';
      }
      let docId = '';
      let docDesc = '';
      switch (docType) {
        case this.helperFn.getDocumentId().loginDocument:
        case this.helperFn.getDocumentId().F60:
          docId = docDetails.idProof;
          docDesc = this.helperFn.getNameOfKycAdded(docListArray, docId);
          break;

        case this.helperFn.getDocumentId().businessDocument:
        case this.helperFn.getDocumentId().postDocument:
        case this.helperFn.getDocumentId().pddDocUpload:
        case this.helperFn.getDocumentId().ohpImage:
        case this.helperFn.getDocumentId().custImage:
        case this.helperFn.getDocumentId().roCpvDocument:
          docId = docDetails.docType || docDetails.docId;
          docDesc = docDetails.docDescription;
          break;
        default:
          docId = docDetails.idProof;
          break;
      }

      if (jsonData?.type === 'IMG' || jsonData?.type === 'jpg') {
        docDesc = `${docDesc}_${new Date().getTime()}.jpg`;
      } else if (jsonData?.type === 'PDF') {
        docDesc = `${docDesc}_${new Date().getTime()}.pdf`;
      }

      if (type === 'GET') {
        return {
          leadID: this.dataUtility.getApplicantLeadId(),
          branchID,
          userID,
          verticle,
          type,
          applicantId: this.applicantLeadId,
          docId,
          docDesc,
          docType,
          borrowerType: this.borrowerType,
          token,
        };
      } else if (type === 'DELETE') {
        return {
          leadID: this.dataUtility.getApplicantLeadId(),
          type,
          applicantId: this.applicantLeadId,
          docId,
          borrowerType: this.borrowerType,
          verticle,
          token,
          docType,
        };
      } else {
        return {
          leadID: this.dataUtility.getApplicantLeadId(),
          branchID,
          userID,
          verticle,
          type,
          applicantId: this.applicantLeadId,
          docId,
          docDesc,
          docType,
          borrowerType: this.borrowerType,
          jsonData: jsonData ? JSON.stringify(jsonData) : '',
          token,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
}
