import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../modules/sharedModule/shared-module';
import { FormControlService } from '../../services/form-control.service';
import { ErrorMessages } from '../../utility/errorMessages';
import { SharedFunctionService } from '../../services/shared-function.service';
import { FormValidationsService } from '../../utility/form-validations';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-permanent-address',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, MatIconModule],
  templateUrl: './permanent-address.component.html',
  styleUrl: './permanent-address.component.scss'
})
export class PermanentAddressComponent {
  permanentAddressDetails: FormGroup;
  validation_messages: { [key: string]: any };

  kycDocsListPermanent:any[] | undefined = [];

  permstates:any[] = [];
  permcityList:any[] = [];

  permstate: any;
  permcity: any;

  selectedPort: any;
  searchTerm: any;

  permPincodeVerify: boolean = false;
  permpincodeDisable: boolean = true;
  pincodeAvail: boolean = false;

  constructor(public formControlService: FormControlService, public errorMessages: ErrorMessages,
    public sharedFunction: SharedFunctionService, public formValidation: FormValidationsService
  ) {

  }

  ngOnInit() {
    this.permanentAddressDetails = this.formControlService.permanentAddressLeadForm();
    this.validation_messages = this.errorMessages.permanentAddressLeadErrorMsg();
  }

  async setKycAddedList() {
    try {
      this.kycDocsListPermanent = [];
      this.kycDocsListPermanent = await this.sharedFunction.setKycAddedList();
    } catch (error) {
      console.log(error, 'PermanentAddressDetailsComponent-savePermanentAddress');
    }
  }

   /**
   * @method verifyPermPincode
   * @description Call the service to get the state and city based on the pincode and autopopulate
   * the state and city if values found.
   * @author Ganesh
   */
   async verifyPermPincode() {
    try {
      const pincode =
        this.permanentAddressDetails.controls['permPincode'].value || '';
      let pincodeResponse = await this.sharedFunction.verifyPincode(pincode);
      if (pincodeResponse) {
        this.permstates = [
          {
            stateCode: pincodeResponse.stateCode,
            stateName: pincodeResponse.stateName,
          },
        ];
        this.permcityList = [
          {
            cityCode: pincodeResponse.cityCode,
            cityName: pincodeResponse.cityName,
          },
        ];
        this.pincodeAvail = true;
        this.permPincodeVerify = false;
        this.permstate = this.permstates[0];
        this.permcity = this.permcityList[0];
        const stateCityValue = {
          permState: this.permstate,
          permCity: this.permcity,
        };
        this.formValidation.setFormValues(
          this.permanentAddressDetails,
          stateCityValue,
        );
      } else {
        this.pincodeAvail = false;
        this.permPincodeVerify = false;
      }
    } catch (error) {
      this.pincodeAvail = false;
      console.log(
        error,
        'LeadPermanentAddressComponent-verifyPermPincode',
      );
    }
  }

  savePermanentAddress(value) {

  }
  

}
