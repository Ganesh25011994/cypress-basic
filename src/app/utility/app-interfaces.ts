export interface IconClass {
    iconName: string | undefined;
    className: string | undefined;
}

export interface staticMaster {
    CODE: string;
    NAME: string;
}

export interface PanRequest {
    pan: string;
    uniqueID: string;
    name: string;
    dob: string;
    fathername: string;
    vertical: string;
    token: string;
}

export interface VoterIdRequest {
    UniqueID: string;
    epicNo: string;
    token: string;
    vertical: string;
}

export interface DlRequest {
    dlNo: string;
    dob: string;
    UniqueID: string;
    token: string;
    vertical: string;
}
  
  export interface PassportRequest {
    name: string;
    passportNo: string;
    fileNo: string;
    dob: string;
    doi: string;
    UniqueID: string;
    token: string;
    vertical: string;
}

export interface AadharVault {
    aadharNumber: string;
    uniqueId: string;
    token: string;
}

export interface Vaultlookup extends AadharVault {
    aadharRefNum: string;
}

export interface ValidationConfig {
    textType?: string;
    showAadhar?: boolean;
    expiryShow?: boolean;
    showPassportFile?: boolean;
    vaultStatus?: string;
    disableField?: boolean;
    disableFieldDate?: boolean;
    disablePassIssueDate?: boolean;
}

export interface SaveGetPayload {
    leadID: string;
    branchID: string | null;
    pageID: string;
    userID: string | null;
    verticle: string;
    appStatus?: string;
    applicantId: string;
    borrowerType: string;
    type: string;
    jsonData?: string;
    token: string;
}

export interface ApiResponse {
    errorCode: string;
    errorDesc: string;
    responseData: any;
    token: string;
}

export enum applicationStatusValue {
    AppStatusExist = 'E',
    AppStatusCredit = 'F',
    AppStatusApproved = 'A',
    AppStatusRejected = 'R',
}

export enum documentId {
    loginDocument = 'LD',
    businessDocument = 'BB',
    incomeAndExpense = 'M_IB',
    visitReport = 'VR',
    loginFees = 'LF',
    custImage = 'CUST',
    postDocument = 'PS',
    pddDocUpload = 'PDD',
    ohpImage = 'OHP',
    roCpvDocument = 'ROVL',
    F60 = 'F60',
    ProfilePicture = 'CI',
}

export interface DocumentUploadRequest {
    leadID: string;
    branchID?: string | null;
    userID?: string | null;
    verticle: string;
    type: string;
    applicantId: string;
    docId: string;
    docDesc?: string;
    docType?: string;
    borrowerType: string;
    jsonData?: string;
    token: string;
}

export interface DocumentDeleteRequest {
    leadID: string;
    type: string;
    applicantId: string;
    docId: string;
    docType?: string;
    borrowerType: string;
    verticle: string;
    token: string;
}