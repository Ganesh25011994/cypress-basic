/**
 * Service to manage alert and error label messages used across the application.
 */

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class AlertErrorLabel {
    readonly alertLabels = {
        alert: 'Alert',
        success: 'Success',
        failed: 'Failed',
        cancel: 'Cancel',
        enableInternet: 'Enable Internet connection!',
        errorLogsSubmission: 'Error logs submitted successfully!',
        noErrorLogsFound: 'No error logs found!',
        logSent: 'Log sent successfully',
        noLogsFound: 'No logs found!',
        wantDelete: 'Do you want to delete?',
        applicationSubmittedCannotDeleteImages:
            "Application submitted can't delete images",
        takeAgain: 'Please again take photo',
        fetchlocation: 'Fetching Location...',
        enterUserNamePassoword: 'Enter username/password',
        fetchMasters: 'Fetching masters...',
        productListEmpty: 'Product list values are empty!',
        logAlert: 'No logs found!',
        otpSent: 'OTP sent successfully',
        sendOtp: 'Sending OTP...',
        validatePan: 'Validating PAN...',
        validateVoterId: 'Validating voter id...',
        validatePassport: 'Validating passport...',
        validateDl: 'Validating driving license...',
        sendingOtp: 'Sending OTP...',
        verifyingOtp: 'Verifying OTP...',
        invalidAadhaarNumber: 'Invalid Aadhaar number!',
        fetechingReferenceNo: 'Fetching reference number...',
        aadhaarNumberExist: 'This Aadhaar number already used for applicant!',
        fetchingDocCount: 'Fetching documents count...',
        captureImage: 'Please capture image!',
        fetchingPreSanctionDocs: 'Fetching Pre-Sanction documents...',
        cannotAddDocuments: 'Application submitted. Cannot add documents!',
        documentAlreadyAdded: 'This document already added!',
        maxLimitReach: 'Maximum image limit reached!',
        applicationAlreadySubmitCantDelete:
            "Application already submitted, So can't be deleted!",
        applicationAlreadySubmitCantAdd:
            "Application already submitted, So can't upload new Document!",
        applicationAlreadySubmitCantCaptureProfile:
            "Application already submitted, So can't upload new Profule Picture!",
        deleteDocument: 'Would You like to delete the Document?',
        pleaseSelectIdProof: 'Please select Id proof',
        enterPanNumber: 'Enter PAN number!',
        enterAadhaarNumber: 'Please enter aadhaar number!',
        captureProfilePicture:
            'Personal Details Updated Successfully. Please capture profile image!',
        captureProfilePic:
            'Please capture profile image!',
        completePersonaldetails: 'Please complete personal details!',
        completeKyxdetails: 'Please complete kyc details!',
        posidexCompleteDelete: "Posidex completed. Can't delete records!",
        KycIdDeletedSuccessfully: 'Kyc id deleted successfully!',
        savePersonalDetails: 'Saving personal details...',
        personalSaved:
            'Personal Details Saved Successfully...',
        personalUpdated:
            'Personal Details Updated Successfully...',
        personalSavedanddocuploaded:
            'Personal Details Saved and Consent Form Uplaoded Successfully.',
        personalUpdatedanddocuploaded:
            'Personal Details Updated and Consent Form Uplaoded Successfully.',
        // personalUpdated: 'Personal Details Updated Successfully.',
        fetchingPersonalDetails: 'Fetching personal details...',
        fetchingKycDetails: 'Fetching Kyc Details...',
        fetchingPresentAddress: 'Fetching present address details...',
        fetchingPermanentAddress: 'Fetching permanent address details...',
        fetchingPosidexDetails: 'Fetching posidex details...',
        fetchingBureau: 'Fetching bureau details...',
        invalidDateInput: 'Invalid date input',
        saveKarzaLoad: 'Saving karza details...',
        getKarzaLoad: 'Fetching karza details...',
        checkingPosidex: 'Checking posidex details...',
        bureauDetailsMandatory: 'Bureau details are mandatory for this customer.',
        bureauDetailsNonMandatory:
            'Bureau details are non mandatory for this customer.',
        completePosidexDetails: 'Please complete posidex details.',
        savingPermAddress: 'Saving permanent address details...',
        savingPresentAddress: 'Saving present address details...',
        fetchingStateCity: 'Fetching state and city...',
        completePermanentAdress: 'Please complete permanent address details.',
        completePresentAdress: 'Please complete present address details.',
        enterPincode: 'Please enter pincode.',
        VerifyMobileNumber: 'Please verify mobile number',
        submitApplication: 'Submitting application...',
        saveKycDetails: 'Saving kyc details...',
        completeApp: 'Please complete applicant details.',
        savePreSanction: 'Adding...',
        noApplicationFound: 'No applications found!',
        fetchingKycDocuments: 'Fetching kyc documents...',
        Total_Experience_Not_0: "Total Experience Can't be 0 years and 0 months",
        Current_Experience_Not_0:
            "Current Experience Can't be 0 years and 0 months",
        Current_Experience_than_Total_Experience:
            "Current Experience Can't be Greater than Total Experience",
        deleteKycId: 'Would You like to delete the KYC id?',
        deletingKyc: 'Deleting kyc id...',
        saveNomineeDetails: 'Saving Nominee Details Page...',
        fetchingNomineeDetails: 'Fetching Nominee Details Page',
        completeNominee: 'Please complete nominee details',
        completeDocument: 'Please complete document details',
        DeleteDocument: 'Would you like to delete the document?',
        fileNotSupport: 'This Type Of File Is Not Supported',
        fileSizeExceeds: 'File size exceeds',
        addMandatoryDoc: 'Please add mandatory presanction documents',
        uploadform60: 'Uploading form 60 document...',
        fetchingForm60Documents: 'Fetching form 60 documents...',
        captureForm60Documents: 'Please capture form 60 documents.',
        deletePan: 'Please Delete PAN in KYC details then Proceed further!',
        submittedAlready: 'Application submitted already!',
        completeAddressDetails: 'Please complete address details!',
        deletingDocument: 'Deleting document...',
        panAlert: 'PAN cannot be added as Form 60 is selected in personal details.',
        confirmAlertDocumentsWillDelete: "Form 60 documents will be deleted. Do you want to proceed?",
        deletedSucessfully: "Document deleted successfully."
    };
}
