export enum CustomerTypes {
    Applicant = 'A',
    Borrower = 'B',
    CoApplicant = 'C',
    Guarantor = 'G',
}

export enum KycIds {
    Aadhar = '1',
    Pan = '2',
    VoterId = '3',
    Passport = '4',
    DrivingLicense = '5',
    Nrega = '6',
    Letterppf = '7',
}

export enum Verticles {
    goldDesc = 'GL',
    goldCode = '16',
}

export enum PageId {
    personalDetails = '1',
    permanentAddressDetails = '2',
    presentAddressDetails = '3',
    nomineeDetails = '4',
    KycDetails = '5',
    profilePic = '6',
    incomeDocs = '10',
    bureauDetails = '9',
    PosidexDetails = '7',
    KarzaDetails = '8',
    Consent = 'CONSENT',
}

export enum ServiceNames {
    Panvalidation = 'panvalidation',
    VoterIdAuthentication = 'VoterIdAuthentication',
    DriverLicenseAuthentication = 'DriverLicenseAuthentication',
    PassportMRZ = 'PassportMRZ',
    LoginService = 'LoginService',
    getMpinDetails = 'getMpinDetails',
    Setupresp = 'Setupresp',
    SendSms = 'sendSms',
    GetpagewiseList = 'getpagewiseList',
    CRMRetailIdSearch = 'CRMRetailIdSearch',
    CRMIdSearch = 'CRMIdSearch',
    GoldOnlineApk = 'goldOnlineApk',
    Mobdocupload = 'mobdocupload',
    VlDocCount = 'vlDocCount',
    Getcustdata = 'getcustdata', //done,
    Posidex = 'Posidex',
    CustProductType = 'custProductType',
    cbCheckForLOS = 'cbCheckForLOS',
    stateccity = 'stateccity',
    glFinalSubmission = 'glFinalSubmission',
    MasterDataLookup = 'MasterDataLookup',
    docStatus = 'docStatus',
    statusCheck = 'statusCheck',
    deletebydocid = 'deletebydocid',
    aadharvault = 'aadharvault',
    aadharvaultlookup = 'aadharvaultlookup',
    AadhaarOtpValidation = 'AadhaarOtpValidation',
    AadhaarOtpGeneration = 'AadhaarOtpGeneration',
}

export enum StatusCodes {
    ErrorCode = '000',
    ErrorCodeSingle = '00',
    NotFound = '404',
    Success = '200',
    BadRequest = '400',
    ErrorCodeExist = '002',
    NoDataFound = '001'
}


export enum KycIdNames {
    Aadhar = 'Aadhaar',
    Pan = 'PAN',
    NonPan = 'NonPAN',
    VoterId = 'voterId',
    Passport = 'passport',
    DrivingLicense = 'dl',
    ExistCust = 'Exisiting Customer',
}

export enum EntityType {
    individual = '1',
    nonIndividual = '2',
}

export enum MethodTypes {
    Save = 'SAVE',
    Get = 'GET',
    delete = 'DELETE',
    upload = 'UPLOAD',
}