import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HelperFunctionService } from '../../services/helper-function.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SharedFunctionService } from '../../services/shared-function.service';
import { DataUtilityService } from '../../services/data-utility.service';

@Component({
  selector: 'app-common-existing-leads',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressBarModule],
  templateUrl: './common-existing-leads.component.html',
  styleUrl: './common-existing-leads.component.scss'
})
export class CommonExistingLeadsComponent {
  @Input() existingLeads: any[] = [];
  // @Input() showSkelt: boolean = true;
  @Input() organisationMaster: any[] = [];
  // @Input() pageType: string;
  showCredit: boolean = false;

  progress = 40;  // Main progress (0-100)
  buffer = 40;  

  customer = {
    username: 'John Doe',
    id: '12345',
    loanAmount: 5000,
    date: '2024-03-27',
    mobile: '+1234567890',
    location: 'New York, USA',
  };

  constructor(public helperFn: HelperFunctionService, public sharedFunction: SharedFunctionService,
    public dataUtility: DataUtilityService
  ) {

  }
  appstatus(lead) {

  }

  convertDate(data) {
    return this.helperFn.convertDate(data);
  }

  async openExistingLeads(lead) {
    try {
      this.setValuesForLead(lead);
      let savePages = lead.pageStatus || [];
      // await this.documentHandler.getProfilePic(
      //   this.helperFn.getMethodTypes().Get,
      // );
      if (savePages.includes(this.helperFn.pageIds().KarzaDetails)) {
        await this.sharedFunction.saveGetKarzaResponse(
          this.helperFn.getMethodTypes().Get,
        );
      }
      if (savePages.includes(this.helperFn.pageIds().PosidexDetails)) {
        this.dataUtility.setPosidexCompleted(true);
      }
      this.helperFn.navigateToPage('/core-tabs');
    } catch (error) {
      console.log(
        error,
        'CommonExisitigLeadsComponent-openExistingLeads',
      );
    }
  }

  setValuesForLead(lead) {
    this.dataUtility.setApplicantLeadId(lead.lcdLeadId);
    this.dataUtility.setApplicantType('A');
    this.dataUtility.setSavedPagesList(lead.pageStatus || []);
    this.dataUtility.setAssetFlag(lead.assetFlag ? lead.assetFlag : "N")
    this.dataUtility.setLoanAmount(lead.lcdLoanAmt)
  }
}
