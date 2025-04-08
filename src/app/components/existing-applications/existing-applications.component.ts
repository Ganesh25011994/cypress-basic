import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { SharedModule } from '../../modules/sharedModule/shared-module';
import { CommonExistingLeadsComponent } from '../common-existing-leads/common-existing-leads.component'
import { HelperFunctionService } from '../../services/helper-function.service';
import { FrameRequestsService } from '../../services/frame-requests.service';
import { RestServiceService } from '../../services/rest-service.service';
import { DataUtilityService } from '../../services/data-utility.service';
import { CustomAlertService } from '../../services/custom-alert.service';
import { AlertErrorLabel } from '../../utility/AlertErrorLabel';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-existing-applications',
  standalone: true,
  imports: [CommonModule, SharedModule, CommonExistingLeadsComponent, MatIconModule],
  templateUrl: './existing-applications.component.html',
  styleUrl: './existing-applications.component.scss'
})
export class ExistingApplicationsComponent {
  organisationMaster: any[] = []
  existingLeads: any[] = [];
  backupAppList = [];

  pagename: string = 'Existing Application'

  constructor(public helperFn: HelperFunctionService, public frameRequest: FrameRequestsService,
    public rest: RestServiceService, public dataUtility: DataUtilityService, public customAlert: CustomAlertService,
    public alertErrorLabel: AlertErrorLabel,     public ref: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    this.organisationMaster = [
      {
        "ORG_ID": 3046,
        "OrgID": "10271",
        "OrgName": "Chennai - Anna Nagar",
        "OrgBranchCode": "469",
        "OrgCity": "263",
        "OrgState": "33",
        "OrgLevel": "1"
      }
    ]

    this.getExistingMobLeads()
  }

  async getExistingMobLeads(event?) {
    try {
      let request = this.frameRequest.frameGetLeadRequest(
        this.helperFn.getApplicationStatus().AppStatusExist,
      );
      let response: any = await this.rest.restApiCall(
        this.helperFn.getServiceNames().Getcustdata,
        request,
      );
      console.log(new Date().toTimeString(), 'After Request');
      let existResponse = response['existingLeadsResp']
        ? response['existingLeadsResp']
        : response;
      if (existResponse.errorCode === this.helperFn.errorCodes().ErrorCode) {
        let allDetails = await existResponse.mobCustData;
        this.existingLeads = allDetails;
        this.existingLeads = this.existingLeads.sort(
          (a, b) =>
            new Date(b.lcdcreatedon).valueOf() -
            new Date(a.lcdcreatedon).valueOf(),
        );
        this.dataUtility.setExistingLeads(this.existingLeads);
        console.log(this.existingLeads);
        this.existingLeads.forEach((i) => (i.enabled = false));
        this.ref.detectChanges();
        event ? event.target.complete() : '';
      } else {
        event ? event.target.complete() : '';
        this.customAlert.presentCustomAlert(
          this.alertErrorLabel.alertLabels.noApplicationFound,
          this.customAlert.warningAlert(),
        );
      }
    } catch (error) {
      event ? event.target.complete() : '';
      console.log(
        error,
        'existingApplicationsPage-getExistingMobApplications',
      );
    }
  }

  handleInput(event) {
    try {
      this.backupAppList = this.dataUtility.getExistingLeads();
      const searchTerm = event.target.value;
      this.existingLeads = this.helperFn.filterLeads(
        this.backupAppList,
        searchTerm,
      );
      console.log(this.existingLeads);
    } catch (error) {
      console.log(
        error.stack,
        'ShowApplicantsDetailsComponent-searchclick',
      );
    }
  }

}
