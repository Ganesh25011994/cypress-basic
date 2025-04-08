import { Injectable } from '@angular/core';
import { staticMaster } from '../utility/app-interfaces';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataUtilityService {

  newAppLeadId: string;
  coAppLeadId: string;
  kycDocsList: staticMaster[] = [];
  applicantType: string;
  appCustomerType: string;
  karzaResponseValue: any;
  consentForm: any;
  passportRequest: any;
  personalDetails: any;
  profilePicComplete: boolean;
  kycDetails: any;
  kycDetailsCompleted = new Subject<boolean>();
  kycDetailsComplete: boolean;
  permanentAddressDetails: any;
  presentAddressDetails: any;
  posidexDetails: any;
  savedPagesList: string[] = [];
  loanAmountValue: any;
  bureauAssetFlag: any;
  posidexCompleted = false;
  existingLeads: any = [];
  submitDisable: boolean;

  constructor() { }

  setApplicantType(value: string) {
    this.applicantType = value;
  }

  getApplicantType(): string {
    return this.applicantType;
  }

  setAppCustomerType(value: string) {
    this.appCustomerType = value;
  }

  getAppCustomerType(): string {
    return this.appCustomerType;
  }

  setApplicantLeadId(value: string) {
    this.newAppLeadId = value;
  }

  getApplicantLeadId(): string {
    return this.newAppLeadId;
  }

  setCoApplicantLeadId(value) {
    this.coAppLeadId = value;
  }

  getCoApplicantLeadId() {
    return this.coAppLeadId;
  }

  setConsentForm(value) {
    this.consentForm = value;
  }

  getConsentForm() {
    return this.consentForm;
  }

  setKycDocsList(value) {
    this.kycDocsList = value;
  }

  getKycDocsList() {
    return this.kycDocsList;
  }

  setKarzaResponse(value) {
    this.karzaResponseValue = value;
  }

  getKarzaResponse() {
    return this.karzaResponseValue;
  }

  setPassportRequest(value) {
    this.passportRequest = value;
  }

  getPassportRequest() {
    return this.passportRequest;
  }

  setPersonalDetails(value) {
    this.personalDetails = value;
  }

  getPersonalDetails() {
    return this.personalDetails;
  }

  setProfilePicComplete(value: boolean) {
    this.profilePicComplete = value;
  }

  getProfilePicComplete(): boolean {
    return this.profilePicComplete;
  }

  setKycDetails(value) {
    this.kycDetails = value;
  }

  getKycDetails() {
    return this.kycDetails;
  }

  setKycDetailsCompleted(value) {
    this.kycDetailsCompleted.next(value);
  }

  setKycComplete(value: boolean) {
    this.kycDetailsComplete = value;
  }

  getKycComplete(): boolean {
    return this.kycDetailsComplete;
  }

  setPermanentAddressDetails(value) {
    this.permanentAddressDetails = value;
  }

  getPermanentAddressDetails() {
    return this.permanentAddressDetails;
  }

  setPresentAddressDetails(value) {
    this.presentAddressDetails = value;
  }

  getPresentAddressDetails() {
    return this.presentAddressDetails;
  }

  setPosidexDetails(value) {
    this.posidexDetails = value;
  }

  getPosidexDetails() {
    return this.posidexDetails;
  }

  setSavedPagesList(value: string[]) {
    this.savedPagesList = value;
  }

  getSavedPagesList(): string[] {
    return this.savedPagesList;
  }

  setLoanAmount(value: any) {
    this.loanAmountValue = value
  }

  getLoanAmount() {
    return this.loanAmountValue;
  }

  setAssetFlag(value: any) {
    this.bureauAssetFlag = value
  }

  getAssetFlag() {
    return this.bureauAssetFlag;
  }

  setPosidexCompleted(value) {
    this.posidexCompleted = value;
  }
  getPosidexCompleted() {
    return this.posidexCompleted;
  }

  setExistingLeads(value) {
    this.existingLeads = value;
  }

  getExistingLeads() {
    return this.existingLeads;
  }

  setSubmitDisable(value) {
    this.submitDisable = value;
  }

  getSubmitDisable() {
    return this.submitDisable;
  }


}
