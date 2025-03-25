import { Injectable } from '@angular/core';
import { CustomerTypes, EntityType, KycIdNames, KycIds, MethodTypes, PageId, ServiceNames, StatusCodes, Verticles } from '../utility/AppConstants';
import { Router } from '@angular/router';
import { isMatch } from 'date-fns';
import { applicationStatusValue, documentId } from '../utility/app-interfaces';

@Injectable({
  providedIn: 'root'
})
export class HelperFunctionService {

  constructor(public router: Router) { }

  generateLeadId() {
    return new Date().getTime().toString();
  }

  appCustomerTypes() {
    let appCustomerType = CustomerTypes;
    return appCustomerType;
  }

  getKycIdCodes() {
    let kycId = KycIds;
    return kycId;
  }

  getKycIdNames() {
    let kycName = KycIdNames;
    return kycName;
  }

  getEntityType() {
    let entity = EntityType;
    return entity;
  }

  getVerticle() {
    let verticle = Verticles;
    return verticle;
  }

  pageIds() {
    let pageIdValues = PageId;
    return pageIdValues;
  }
  
  getMethodTypes() {
    let methodTypes = MethodTypes;
    return methodTypes;
  }

  getServiceNames() {
    return ServiceNames;
  }

  errorCodes() {
    let _errorCodes = StatusCodes;
    return _errorCodes;
  }

  getApplicationStatus() {
    let applicationStatus = applicationStatusValue;
    return applicationStatus;
  }

  getDocumentId() {
    let documentIdValue = documentId;
    return documentIdValue;
  }


  navigateToPage(route: string, params?: any) {
    this.router.navigate([route], {
      queryParams: params || '',
      skipLocationChange: true,
      replaceUrl: true,
    });
  }

  replaceSpecialCharacters(stringValue: string): string | undefined {
    try {
      return stringValue
        .replace(/[^\w\s]|_/g, ' ') // Replace non-alphanumeric characters and underscores
        .replace(/\s+/g, ' ') // Collapse multiple spaces into a single space
        .trim(); // Remove leading and trailing spaces
    } catch (error) {
      console.error('Error in replaceSpecialCharacters:', error);
    }
  }

  isJson(str: any) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  
  parseJson(value: any): any {
    return this.isJson(value) ? JSON.parse(value) : value;
  }
  
  stringifyData(value) {
    return this.isJson(value) ? value : JSON.stringify(value);
  }
  
  getKycCodeBasedonId(idType: string) {
    if (idType == KycIdNames.Pan) {
      return 2;
    } else if (idType == KycIdNames.VoterId) {
      return 3;
    } else if (idType == KycIdNames.Passport) {
      return 4;
    } else if (idType == KycIdNames.DrivingLicense) {
      return 5;
    } else if (idType == KycIdNames.Aadhar) {
      return 1;
    }
  }

  sortOrder(arrayList) {
    return arrayList.sort((a, b) => Number(a.NAME) - Number(b.NAME));
  }

  getGendertype(gender) {
    try {
      if (gender == 'M' || gender == 'male' || gender == 'm') {
        return '2';
      } else if (gender == 'F' || gender == 'female' || gender == 'f') {
        return '1';
      } else {
        return '3';
      }
    } catch (error) {
      console.log('Error in getGendertype:', error);
    }
  }
  
  getDob(dob) {
    try {
      if (isMatch(dob, 'yyyy-MM-dd')) {
        return dob;
      } else if (isMatch(dob, 'dd-MM-yyyy')) {
        let dateofbirth = dob ? dob.split('-').reverse().join('-') : '';
        return dateofbirth;
      }
    } catch (error) {
      console.log('Error in getDob:', error);
    }
  }

  formatDateValue(date: string, method?: string): string {
    if (method == "posidex") {
      return date ? date.split('-').reverse().join('/') : '';
    } else {
      return date ? date.split('-').reverse().join('-') : '';
    }
  }

  convertDate(str) {
    try {
      var date = new Date(str),
        mnth = ('0' + (date.getMonth() + 1)).slice(-2),
        day = ('0' + date.getDate()).slice(-2);
      return [day, mnth, date.getFullYear()].join('-');
    } catch (error) {
      // this.sqliteService.insertErrorLog(error.stack ? error.stack : error, "ExistingLeadsPage-convertDate");
      console.log('convertDate', error);
    }
  }

  getNameOfKycAdded(docListArray, kycDocId) {
    let kycAddedDocName = docListArray.find((value) => value.CODE == kycDocId);
    return kycAddedDocName ? kycAddedDocName.NAME : '';
  }

  filterLeads(list: any[], searchTerm: string): any[] {
    if (!list || !searchTerm) return list;

    const lowerCaseTerm = searchTerm.toLowerCase();

    return list.filter((lead) => {
      return (
        (lead.lcdcustName
          ? lead.lcdcustName.toLowerCase().includes(lowerCaseTerm)
          : false) ||
        (lead.lcdMobNo ? lead.lcdMobNo.includes(searchTerm) : false) ||
        (lead.lcdLeadId ? lead.lcdLeadId.includes(searchTerm) : false) ||
        (lead.lcdpropno ? lead.lcdpropno.includes(searchTerm) : false)
      );
    });
  }

  concatString(stringOne: string, stringTwo: string): string {
    return `${stringOne}.${stringTwo}`;
  }

}
