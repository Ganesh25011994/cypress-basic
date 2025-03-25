import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HelperFunctionService } from './helper-function.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestServiceService {
  apiURL = environment.apiURL;
  constructor( 
    public httpAngular: HttpClient, 
    public global: GlobalService,
    public helperFn: HelperFunctionService
  ) { }


  /**
   * This method to handle API calls based on environment and network status.
   * @param method API method name
   * @param request Payload for the API
   * @param isKarza Optional flag to determine specific endpoints
   */
  async restApiCall(
    method: string,
    request: any,
    isKarza?: string,
  ): Promise<any> {
    try {
      // if (await this.helperFn.getNetworkStatus()) {
        if (environment.pointLocal && isKarza === 'Y') {
          return this.handleLocalKarzaService();
        } else {
          return this.angularHttpService(method, request, isKarza);
        }
      // } else {
      //   this.showNetworkAlert();
      //   return Promise.reject('No Internet connection!');
      // }
    } catch (error) {
      console.error(error, 'Error in restApiCallAngular');
    }
  }

  /**
   * Handles fetching local Karza service data.
   */
  handleLocalKarzaService(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpAngular
        .get('assets/masters/karza.json', { responseType: 'json' })
        .subscribe(
          (response) => resolve(response),
          (error) => reject(error),
        );
    });
  }

async angularHttpService(method, data, isKarza?: string) {
      let link;
      link = this.apiURL + `lendperfect/LOSMobileRestServices/${method}`;

      console.log(link);
      // this.http.setDataSerializer("json");
      let token = this.global.getToken();
      let headers;
      headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "token": this.global.encMyReq(token),
        "deviceId": this.global.encMyReq('0a5eb22847dec0de'),
        // "userid": localStorage.getItem('username')
      }
      let encryptData = this.global.encryptMyReq(data);

      let optionsRest: any = {
        body: encryptData,
        headers: headers
      }
      // this.sqliteService.addAuditTrail(link, method + " Request", JSON.stringify(data)); // need to verify this line
      return new Promise((resolve, reject) => {
        this.httpAngular.request('post', link, optionsRest).subscribe((data) => {
          console.log("httpAngular Data", data)
          let responseToken;
          let decryRes = this.global.decryptMyRes(data);

          if (method != "getMpinDetails") {
            responseToken = this.global.decryptTokenRes(JSON.parse(decryRes.data).token);
          } else {
            responseToken = this.global.decryptTokenRes(JSON.parse(decryRes.data).map.token);
          }
          // if (responseToken && this.global.getToken() == responseToken) {
            resolve(JSON.parse(decryRes.data));
          // } else {
            // this.global.dismissLoading();
            // alert( 'Request malfunctioned!'); //VAPT
            // alert('Request malfunctioned!')
          // }
        }, error => {
            if (error.status === 503) {
              alert('"The requested service is temporarily unavailable. It is either overloaded or under maintenance!"')
              // alert(
              //   "The requested service is temporarily unavailable. It is either overloaded or under maintenance!");
            } else if (error.status === 404) {
              alert(
                "The requested method is not found!");
            } else if (error.status === 400) {
              alert(
                "Bad request!");
            } else if (error.status === 401) {
              alert(
                "Unauthorised!");
            } else if (error.status == "-1" || error.status == "-4") {
              alert(
                "Request Time Out!");
            } else if (error.status == "-3") {
              alert(
                "Host could not be resolved. No address associated with address!");
            } else {
              alert( JSON.stringify(error))
            
            }
            // this.global.dismissLoading();
            reject(error);
          })
      })
  
  }

  // getData(): Observable<any> {
  //   return this.httpAngular.get<any>(this.apiURL);
  // }
}
