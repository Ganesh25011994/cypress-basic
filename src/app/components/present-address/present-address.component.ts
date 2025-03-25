import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../modules/sharedModule/shared-module';
import { MatIconModule } from '@angular/material/icon';
import { FormControlService } from '../../services/form-control.service';
import { ErrorMessages } from '../../utility/errorMessages';
import { SharedFunctionService } from '../../services/shared-function.service';
import { CustomAlertService } from '../../services/custom-alert.service';
import { AlertErrorLabel } from '../../utility/AlertErrorLabel';
import { FormValidationsService } from '../../utility/form-validations';

@Component({
  selector: 'app-present-address',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, MatIconModule],
  templateUrl: './present-address.component.html',
  styleUrl: './present-address.component.scss'
})
export class PresentAddressComponent {
  presentAddressDetails: FormGroup
  validation_messages: { [key: string]: any };

  kycDocsListpresent:any[] | undefined = [];
  presentstates:any[] = [];
  presentcityList:any[] = [];
  presentstate: any;
  city: any;

  presentPincodeVerify: boolean = false;
  presentpincodeAvail: boolean = false;
  presentpincodeDisable: boolean = false;

  yesNoList = [
    {CODE:"Y", NAME: "YES"},
    {CODE:"N", NAME: "NO"}
  ]
  constructor(public formControlService: FormControlService, public errorMessages: ErrorMessages,
    public sharedFunction: SharedFunctionService, public customAlert: CustomAlertService,
    public alertErrorLabel: AlertErrorLabel, public formValidation: FormValidationsService
  ) {

  }
  ngOnInit() {
    this.presentAddressDetails = this.formControlService.presentAddressLeadForm();
    this.validation_messages = this.errorMessages.presentAddressLeadErrorMsg();
  }

  async setKycAddedList() {
    try {
      this.kycDocsListpresent = [];
      this.kycDocsListpresent = await this.sharedFunction.setKycAddedList();
    } catch (error) {
      console.log(error,'PermanentAddressDetailsComponent-savePermanentAddress');
    }
  }

   /**
   * @method verifyPresentPincode
   * @description Call the service to get the state and city based on the pincode and autopopulate
   * the state and city if values found.
   * @author Ganesh
   */
   async verifyPresentPincode() {
    try {
      const pincode =
        this.presentAddressDetails.controls['prePincode'].value || '';
      if (!pincode) {
        this.customAlert.presentCustomAlert(
          this.alertErrorLabel.alertLabels.enterPincode,
          this.customAlert.warningAlert(),
        );
        return;
      }
      const pincodeResponse = await this.sharedFunction.verifyPincode(pincode);
      if (pincodeResponse) {
        this.presentstates = [
          {
            stateCode: pincodeResponse.stateCode,
            stateName: pincodeResponse.stateName,
          },
        ];
        this.presentcityList = [
          {
            cityCode: pincodeResponse.cityCode,
            cityName: pincodeResponse.cityName,
          },
        ];
        this.presentpincodeAvail = true;
        this.presentPincodeVerify = false;
        this.presentpincodeDisable = true;
        this.presentstate = this.presentstates[0];
        this.city = this.presentcityList[0];
        const stateCityValue = {
          preState: this.presentstate,
          preCity: this.city,
        };
        this.formValidation.setFormValues(
          this.presentAddressDetails,
          stateCityValue,
        );
      } else {
        this.presentpincodeAvail = false;
        this.presentPincodeVerify = false;
      }
    } catch (error) {
      console.log(
        error,
        'LeadPermanentAddressComponent-verifyPresentPincode',
      );
    }
  }

  savePresentAddress(value) {
      
  }
}
