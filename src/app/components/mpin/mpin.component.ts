import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { FormControlService } from '../../services/form-control.service';
import { RestServiceService } from '../../services/rest-service.service';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../services/global.service';
import { ErrorMessages } from '../../utility/errorMessages';
import { SqliteService } from '../../services/sqlite.service';
import { format, differenceInDays } from 'date-fns';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../modules/sharedModule/shared-module';
import { LoaderComponent } from '../loader/loader.component';

declare var window: any;

@Component({
  selector: 'app-mpin',
  standalone: true,
  imports: [ FormsModule, CommonModule, RouterOutlet, SharedModule, ReactiveFormsModule, LoaderComponent ],
  templateUrl: './mpin.component.html',
  styleUrl: './mpin.component.scss'
})
export class MpinComponent {

  username: any;
  showMpin: boolean = false;
  showSetPin: boolean = true;

  mPinDigits = {
    first: '',
    second: '',
    third: '',
    four: ''
  }
  disableMpinBtn = true;

  otp5 = ''

  pinStatus: any;
  pinResetForgotStatus: any = "N";
  mPin: any;
  pinCreatedDate: any;
  retryCount = 0;
  masterResponse: any;
  masterUpdateVersion: string;

  mpinForm: FormGroup;
  setMpinForm: FormGroup;

  todayDateValidation: any = format(new Date(), "MM/dd/yyyy");

  validation_messages: any

  testingEnvironment: boolean = false
  loading: boolean = false

  constructor(private router: Router, public formcontrol: FormControlService, 
    public errormsg: ErrorMessages, public rest: RestServiceService,
    public global: GlobalService, public httpAngular: HttpClient,
    public sqliteService: SqliteService) {
      
    this.mpinForm = this.formcontrol.mpinForm();
    this.setMpinForm = this.formcontrol.setMpinForm();
    this.username = localStorage.getItem('username')
    this.callPinService()
  }

  /**
   * @method callPinService
   * @description Call MPIN Status.
   * @author GaneshKumar B
   */
  async callPinService() {
    try {
      await this.getMpinStatus();
      // let loggedInUser: any = await this.sqliteService.getLoginDetails(localStorage.getItem('username'));
      let loginResponse: any = localStorage.getItem('loginResponse')
      if (!loginResponse) {
        if ((typeof window !== undefined &&  window.Cypress)) {
          loginResponse = '{"StatusCode":"000","UserName":"GOLD RO","Status":"Success","Orgscode":"469","LPuserID":"GLRO","UserGroups":["1556700"],"token":"U2FsdGVkX1/4WNXs5iI0H0jLvM756WdLFQfPmgAj6/beId8eYRrP00Sj6/uMIXZ+","orgLocationList":["10281","10271"]}'
        }
      }
      let loggedInUser = JSON.parse(loginResponse)
      console.log("loggedInUser", loggedInUser)
      console.log("Window",window)
      this.checkPin();
      // if ((typeof window !== undefined &&  window.Cypress)) {
      //   if (loggedInUser.length == 0) 
      //     loggedInUser = [
      //       {
      //           "columns": [
      //               "seq_id",
      //               "user_name",
      //               "password",
      //               "orgscode",
      //               "status",
      //               "statusCode",
      //               "ro_name",
      //               "userID",
      //               "ILcremUser",
      //               "UserGroups",
      //               "supervoiser",
      //               "supvId",
      //               "supvName",
      //               "Timestamp",
      //               "orgLocationList",
      //               "lastLoginDate"
      //           ],
      //           "values": [
      //               [
      //                   1,
      //                   "SAIGANESH",
      //                   "laps",
      //                   "469",
      //                   "Success",
      //                   "000",
      //                   "GANESH KUMAR B",
      //                   "SAIGANESH",
      //                   "",
      //                   "[\"1556669\",\"1556648\",\"1556728\",\"1556690\",\"1556684\"]",
      //                   "N",
      //                   "",
      //                   "",
      //                   "2025-01-27 15:07:51",
      //                   "[\"10001\",\"10271\",\"11103\"]",
      //                   null
      //               ]
      //           ]
      //       }
      //   ]
      //   console.log("loggedInUser-cypress", loggedInUser)
      // }        
      // if (loggedInUser && loggedInUser.length > 0) {
      //   let columns = loggedInUser[0]["columns"]
      //   let values = loggedInUser[0]["values"][0]
      //   const result = columns.reduce((obj, column, index) => {
      //   obj[column] = values[index];
      //   return obj;
      //   }, {});
      //   // if (result.lastLoginDate) {
      //     // if (this.pinStatus == "N" || this.pinResetForgotStatus == "Y" || new Date(result.lastLoginDate).getTime() != new Date(this.todayDateValidation).getTime()) {
      //     //   this.openOtpModal();
      //     // } else {
      //       this.checkPin();
      //     // }
      //   // } else {
      //   //   this.openOtpModal();
      //   // }
      // }
    } catch (error) {
      console.log(error, "LoginPage-callPinService")
    }
  }

   /**
  * @method getMpinStatus
  * @description Get MPIN Status.
  * @author GaneshKumar B
  */
   async getMpinStatus() {
    try {
      return new Promise(async (resolve, reject) => {
        // this.global.presentLoading("Fetching pin status...");
        this.loading = true
        this.username = localStorage.getItem('username')
        if (!this.username) {
          if ((typeof window !== undefined &&  window.Cypress)) {
            this.username = 'GLRO'
          }
        }
        console.log("getMpinStatus-this.username", this.username)
        let request = {
          "userId": this.username,
          "requestType": "GET",
          "token": this.global.genToken()
        }
        let response: any = await this.rest.angularHttpService("getMpinDetails", request);
        console.log("loaded getMpinStatus", response)
        if (response.map.errorCode === "000") {
          this.loading = false
          this.pinStatus = response.map.existingUser;
          this.mPin = response.map.currentMpin;
          this.pinResetForgotStatus = response.map.resetFlag;
          this.pinCreatedDate = response.map.updatedDate.split(" ")[0];
          resolve(true);
        } else {
          this.loading = false
          alert(response.map.errorDesc);
        }
      })
    } catch (error) {
      this.loading = false
      console.log(error, "LoginPage-getMpinStatus")
    }
  }

  setMpinValues(value) {
    
  }

  /**
   * @method checkPin
   * @description Check MPIN Status.
   * @author GaneshKumar B
   */
  async checkPin() {
    try {
      console.log("passeh here checkPin")
      if (this.pinStatus == "Y") {
        console.log("passeh here checkPin, pinStatus, Y")
        this.showMpin = true;
        this.showSetPin = false;
      } else {
        console.log("passeh here checkPin, pinStatus, N")
        this.showMpin = false;
        this.showSetPin = false;
      }
    } catch (error) {
      console.log(error, "LoginPage-checkPin")
    }
  }


  /**
   * @method otpController
   * @description Show and Hide Mpin.
   * @author GaneshKumar B
   */
  otpController(event, next, prev, index?) {
    try {
      setTimeout(() => {
        if (Object.values(this.mPinDigits).every(val => val != "")) {
          console.log("submit");
          this.disableMpinBtn = false;
        } else {
          this.disableMpinBtn = true;
        }
        if (event.target.value.length < 1 && prev) {
          prev.focus()
        }
        else if (next && event.target.value.length > 0) {
          next.focus();
        }
        else {
          return 0;
        }
      }, 0)
    } catch (error) {
      console.log(error, "LoginPage-otpController")
    }
  }

    /**
   * @method pinLogin
   * @description Mpin Login.
   * @author GaneshKumar B
   */
    async pinLogin() {
      try {
        console.log("pinLogin")
        // let loggedInUser = await this.sqliteService.getLoginDetails(localStorage.getItem('username'));
        let loginResponse: any = localStorage.getItem('loginResponse')
        if (!loginResponse) {
          if ((typeof window !== undefined &&  window.Cypress)) {
            loginResponse = '{"StatusCode":"000","UserName":"GOLD RO","Status":"Success","Orgscode":"469","LPuserID":"GLRO","UserGroups":["1556700"],"token":"U2FsdGVkX1/4WNXs5iI0H0jLvM756WdLFQfPmgAj6/beId8eYRrP00Sj6/uMIXZ+","orgLocationList":["10281","10271"]}'
          }
        }
        let loggedInUser = JSON.parse(loginResponse)
        // if (typeof window !== undefined &&  window.Cypress) {
        //   if (loggedInUser.length == 0) 
        //     loggedInUser = [
        //       {
        //           "columns": [
        //               "seq_id",
        //               "user_name",
        //               "password",
        //               "orgscode",
        //               "status",
        //               "statusCode",
        //               "ro_name",
        //               "userID",
        //               "ILcremUser",
        //               "UserGroups",
        //               "supervoiser",
        //               "supvId",
        //               "supvName",
        //               "Timestamp",
        //               "orgLocationList",
        //               "lastLoginDate"
        //           ],
        //           "values": [
        //               [
        //                   1,
        //                   "SAIGANESH",
        //                   "laps",
        //                   "469",
        //                   "Success",
        //                   "000",
        //                   "GANESH KUMAR B",
        //                   "SAIGANESH",
        //                   "",
        //                   "[\"1556669\",\"1556648\",\"1556728\",\"1556690\",\"1556684\"]",
        //                   "N",
        //                   "",
        //                   "",
        //                   "2025-01-27 15:07:51",
        //                   "[\"10001\",\"10271\",\"11103\"]",
        //                   null
        //               ]
        //           ]
        //       }
        //   ]
        //   console.log("loggedInUser-cypress", loggedInUser)
        // }  
        if (loggedInUser) {
          // let todayDate = moment().format("YYYY-MM-DD");
          // let todayDate = format(new Date(), 'yyyy-MM-dd');
          // console.log(todayDate);
          // let check = moment(todayDate).diff(this.pinCreatedDate, 'days');
          // console.log(check, "check");

          const todayDate = new Date(); // or any other date you have
          const pinCreatedDate = new Date(this.pinCreatedDate); // assuming this.pinCreatedDate is a date string or Date object

          const diffInDays = differenceInDays(todayDate, pinCreatedDate);
          if (typeof window !== undefined &&  window.Cypress) {
            this.retryCount = 1
          }
        console.log(diffInDays);
          if (diffInDays >= 45) {
            this.mPinDigits.first = ""
            this.mPinDigits.second = ""
            this.mPinDigits.third = ""
            this.mPinDigits.four = ""
            alert(`Your MPIN has been expired. Please Reset MPIN.`);
          } else if (this.retryCount > 2) {
            this.mPinDigits.first = ""
            this.mPinDigits.second = ""
            this.mPinDigits.third = ""
            this.mPinDigits.four = ""
            alert(`Retry limit exceeds. Kindly reset MPIN.`);
          } else if (+this.mPin === +Object.values(this.mPinDigits).join('')) {
            // this.login({ username: loggedInUser[0].user_name, password: loggedInUser[0].password });
            this.fetchingMasters()
            await this.sqliteService.updateLastLoginStatus({ lastLoginDate: format(new Date(), "MM/dd/yyyy"), seq_id: loggedInUser[0].seq_id });
          } else {
            this.mPinDigits.first = ""
            this.mPinDigits.second = ""
            this.mPinDigits.third = ""
            this.mPinDigits.four = ""
            this.retryCount++;
            alert('Incorrect MPIN!');
          }
        }
      } catch (error) {
        this.mPinDigits.first = ""
        this.mPinDigits.second = ""
        this.mPinDigits.third = ""
        this.mPinDigits.four = ""
        console.log(error, "LoginPage-pinLogin")
      }
    }

   /**
   * @method openOtpModal
   * @description Otp Model will shown.
   * @author GaneshKumar B
   */
   async openOtpModal() {
    try {
      // this.loginForm.reset();
      // const otpController = await this.modalController.create({
      //   component: LoginOtpComponent,
      //   componentProps: {
      //     details:
      //     {
      //       userId: this.username
      //     },
      //     type: "login"
      //   },
      //   cssClass: '',
      //   showBackdrop: true,
      //   animated: true
      // })
      // otpController.onDidDismiss().then(async (data) => {
      //   if (data.data) {
      //     if (this.pinStatus == "Y" && this.pinResetForgotStatus != "Y") {
      //       this.mPinDigits.first = ""
      //       this.mPinDigits.second = ""
      //       this.mPinDigits.third = ""
      //       this.mPinDigits.four = ""
      //       this.showMpin = true;
      //       this.showSetPin = false;
      //     } else {
      //       this.showMpin = true;
      //       this.showSetPin = true;
      //       this.setMpinForm.reset();
      //     }

      //   }
      // })
      // return await otpController.present();
    } catch (error) {
      console.log(error, "LoginPage-openOtpModal")
    }
  }

    /**
* @method fetchingMasters
* @description This function will call the setup masters service and checks for version. If version
* mismatch, new masters will be inserted into database, if version is same then navigated to dashboard.
* @author Rajesh S
* **/
async fetchingMasters() {
  try {
    let commonMaster;
    // this.global.presentLoading(this.alertErrorLabel.AlertLabels.fetchMasters);
    let versionInfo = await this.sqliteService.getAllRecordsWithoutIds('MASTER_UPDATE_VERSION');
    let masterRequest = {
      "Setupmastval": {
        "setupfinal": versionInfo.length > 0 && versionInfo[0].version ? versionInfo[0].version : '0',
        "setupversion": versionInfo.length > 0 && versionInfo[0].version ? versionInfo[0].version : '0',
        "setupmodule":"VL"
      },
      "token": this.global.genToken()
    };
    this.masterResponse = await this.rest.angularHttpService('Setupresp', masterRequest);
    if (this.masterResponse.errorCode === '000') {
      this.masterUpdateVersion = this.masterResponse.version;
      if (versionInfo.length > 1 && (versionInfo[0].version === this.masterResponse.version)) {
        // this.global.dismissLoading();
        this.navigateToDashboard();
      } else {
        let masterKeys = Object.keys(this.masterResponse.Setupmaster);
        await this.sqliteService.deleteStaticMasters('COMMON_MASTER_DATA');
        for (let i = 0; i < masterKeys.length; i++) {
          if (Array.isArray(this.masterResponse.Setupmaster[masterKeys[i]])) {
            commonMaster = this.masterResponse.Setupmaster[masterKeys[i]].filter(data => data.hasOwnProperty('optionValue'))
            if (commonMaster.length > 0) {
              await this.sqliteService.insertAllMasterData(this.masterResponse.Setupmaster[masterKeys[i]], masterKeys[i]);
            }
          }
          if (i == masterKeys.length - 1) {
            this.navigateToDashboard();
          }
        }
      }
    } else if (this.masterResponse.errorCode == "002") {
      // this.global.dismissLoading();
      this.navigateToDashboard();

    } else {
      // this.global.dismissLoading();
      alert(this.masterResponse.errorDesc)
    }
  } catch (error) {
    console.log(error, "FetchingMasterService-fetchingMasters")
  }

}

  navigateToDashboard() {
    localStorage.setItem("personalgo", "true")
    this.router.navigateByUrl('/personal')
    
  }

}
