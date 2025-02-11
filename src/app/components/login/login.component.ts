import { Component, ElementRef, NgModule, OnInit, inject } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';
import { ProductsService } from '../../services/products.service'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { FormControlService } from '../../services/form-control.service';
import { ErrorMessages } from '../../utility/errorMessages';
import { SharedModule } from '../../modules/sharedModule/shared-module';
import { RestServiceService } from '../../services/rest-service.service';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { SqliteService } from '../../services/sqlite.service';
import { format } from 'date-fns';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, ReactiveFormsModule,
    SharedModule, LoaderComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  firstApp = 'bad';
  username: any;
  password: any;
  exceldata: any;
  specificColumnData: any[] = [];
  colours = [
    {id: 1, name: "White", code: "#FFFFFF"},
    {id: 2, name: "Black", code: "#000000"},
    {id: 3, name: "Green", code: "#008000"},
  ]


  loginFormDetails: FormGroup;
  
  validation_messages: any;

  loading: boolean = false;


  constructor(private router: Router, public formcontrol: FormControlService, 
    public errormsg: ErrorMessages, public rest: RestServiceService,
    public global: GlobalService, public httpAngular: HttpClient,
    public sqliteService: SqliteService, private el: ElementRef) {
    this.loginFormDetails = this.formcontrol.loginForm()
    this.validation_messages = this.errormsg.loginErrorMsg()
  }

  ngOnInit() {
    
  }

  async loginFormDetailsSave() {
    try {
      if (this.loginFormDetails.valid) {
        let body = {
              "Login": {
                "Loginuser": this.username,
                "Loginpasswd": this.password,
                "IMEI": "0a5eb22847dec0de",
                "LLdate": "",
                "Version": '0.0.1',
                "Brach_code": "",
                "PdTab": "N",
                "Module": "GL"
              },
              "token": this.global.genToken()
            }
            this.loading = true; 
            this.rest.angularHttpService('LoginService', body).then(async (loginResponse:any) => {
              console.log("data", loginResponse)
              if (loginResponse == undefined) {
                this.loading = false; 
                alert("login Response Undefined");
              } else if (loginResponse.StatusCode === '000') {
                this.username = loginResponse.LPuserID;
                localStorage.setItem('username', loginResponse.LPuserID);
                // this.global.userId = loginResponse.LPuserID;
                
                localStorage.setItem('BranchCode', loginResponse.Orgscode);
                localStorage.setItem('roname', loginResponse.UserName ? loginResponse.UserName : this.username);
                localStorage.setItem('loginResponse', JSON.stringify(loginResponse))
                setTimeout(async () => {
                  this.navigateToMpin()
                }, 500)
                // let loggedInUser: any = await this.sqliteService.getLoginDetails(localStorage.getItem('username'));
                // if (loggedInUser.length > 0) {
                //   let columns = loggedInUser[0]["columns"]
                //   let values = loggedInUser[0]["values"][0]
      
                  
                //   const result = columns.reduce((obj, column, index) => {
                //     obj[column] = values[index];
                //     return obj;
                //   }, {});
                  
                //   console.log("getLoginDetails", result);
                  
                //   await this.sqliteService.updateLoginDetails(
                //     {
                //       user_name: this.username,
                //       password: this.password,
                //       orgscode: loginResponse.Orgscode,
                //       status: loginResponse.Status,
                //       statusCode: loginResponse.StatusCode,
                //       UserName: loginResponse.UserName,
                //       userID: loginResponse.LPuserID,
                //       ILcremUser: loginResponse.ILcremUser ? loginResponse.ILcremUser : "",
                //       UserGroups: loginResponse.UserGroups ? JSON.stringify(loginResponse.UserGroups) : "",
                //       supervoiser: loginResponse.supervoiser,
                //       supvId: loginResponse.supvId,
                //       supvName: loginResponse.supvName,
                //       Timestamp: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
                //       orgLocationList: loginResponse.orgLocationList ? JSON.stringify(loginResponse.orgLocationList) : "",
                //       seq_id: loggedInUser[0].seq_id
                //     }
                //   )
                //   this.loading = false; 
                //   setTimeout(async () => {
                //     // await this.callPinService();
                //     this.navigateToMpin()
                //   }, 500)
                // } else {
                //   localStorage.setItem('loginResponse', JSON.stringify(loginResponse))
                //   this.sqliteService.insertLoginMasterDetails("LOGIN_DETAILS",
                //     this.username,
                //     this.password,
                //     loginResponse.Orgscode,
                //     loginResponse.Status,
                //     loginResponse.StatusCode,
                //     loginResponse.UserName,
                //     loginResponse.LPuserID,
                //     loginResponse.ILcremUser ? loginResponse.ILcremUser : "",
                //     loginResponse.UserGroups ? JSON.stringify(loginResponse.UserGroups) : "",
                //     loginResponse.supervoiser,
                //     loginResponse.supvId,
                //     loginResponse.supvName,
                //     format(new Date(), "yyyy-MM-dd HH:mm:ss"),
                //     loginResponse.orgLocationList ? JSON.stringify(loginResponse.orgLocationList) : ""
                //   )
                //   setTimeout(async () => {
                //     this.navigateToMpin()
                //   }, 500)
                // }
              } else { 
                this.loading = false; 
                alert(loginResponse.Status);
              }
            })
      } else {
        Object.keys(this.loginFormDetails.controls).forEach(field => {
          const control: any = this.loginFormDetails.get(field);
          control.markAsTouched();
        });
  
        // Show error messages and scroll to the first invalid control
        this.scrollToFirstInvalidControl();
      }
    } catch (error) {
      this.loading = false; 
    }
    
  }

  private scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
      "form .ion-invalid"
    );
    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstInvalidControl.focus();
    }
  }


  

  onFileChange(event: any) {
    try {
      console.log("document picked")
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        // const binaryStr = e.target.result;
        // const workbook = XLSX.read(binaryStr, { type: 'binary' });
        // const sheetName = workbook.SheetNames[0]; // Get the first sheet
        // const worksheet = workbook.Sheets[sheetName];

        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const worksheet = workbook.Sheets[sheetName];

        // const columnsToRead = ['A','B','C'];

        this.exceldata = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Convert to JSON
        console.log("exceldata", this.exceldata); // Output the data for verification

        // const range: any = worksheet['!ref'];
        // const lastRow = parseInt(range.split(':')[1].replace(/[^\d]/g, ''), 10);


        // for (let row = 1; row <= lastRow; row++) {
        //   const rowData:any[] = [];
        //   columnsToRead.forEach(col => {
        //     const cell = worksheet[col + row]; // Create cell reference (A1, C1, etc.)
        //     if (cell) {
        //       rowData.push(cell.v); // Push the cell value to the row data array
        //     } else {
        //       rowData.push(null); // Handle missing cells
        //     }
        //   });
        //   this.specificColumnData.push(rowData); // Push the row data to the main array
        // }
        // console.log('Column Data:', this.specificColumnData);
        this.specificColumnData = this.exceldata
      };

      if (file) {
        reader.readAsBinaryString(file);
      }
    } catch (error) {
      console.log("onFileChange-error", error)
    }
  }

  


 

async navigateToMpin() {
  this.router.navigateByUrl('/mpin')
}

}
