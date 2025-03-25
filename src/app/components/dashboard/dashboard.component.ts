import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { SqliteService } from '../../services/sqlite.service';
import { SharedModule } from '../../modules/sharedModule/shared-module';
import { AppLabelNames } from '../../utility/appLabels';
import { MatIconModule } from '@angular/material/icon';
import { DataUtilityService } from '../../services/data-utility.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, MatIconModule, SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {
  textData: any;
  constructor(public sqliteService: SqliteService, public labelName: AppLabelNames, public router: Router,
    public dataUtility: DataUtilityService
  ) {

  }

  ngOnInit() {
    // let allMasterData = this.sqliteService.getMasterData();
    // console.log("allMasterData", allMasterData)
    // let genderList = this.sqliteService.getStaticDataById('Gender');
    // console.log("genderList", genderList)
    this.dataUtility.setApplicantType('');
    this.textData = this.labelName.constants;
  }

  createLead(path) {
    this.dataUtility.setApplicantType('A');
    this.router.navigate([path], {
      skipLocationChange: true,
      replaceUrl: true,
    });
  }
}
