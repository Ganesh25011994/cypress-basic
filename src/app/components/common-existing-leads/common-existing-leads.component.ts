import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HelperFunctionService } from '../../services/helper-function.service';

@Component({
  selector: 'app-common-existing-leads',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './common-existing-leads.component.html',
  styleUrl: './common-existing-leads.component.scss'
})
export class CommonExistingLeadsComponent {
  @Input() existingLeads: any[] = [];
  // @Input() showSkelt: boolean = true;
  @Input() organisationMaster: any[] = [];
  // @Input() pageType: string;
  showCredit: boolean = false;

  constructor(public helperFn: HelperFunctionService) {

  }
  appstatus(lead) {

  }

  convertDate(data) {
    return this.helperFn.convertDate(data);
  }
}
