import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SqliteService } from '../../services/sqlite.service';
import { SharedModule } from '../../modules/sharedModule/shared-module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {

  constructor(public sqliteService: SqliteService) {

  }

  ngOnInit() {
    let allMasterData = this.sqliteService.getMasterData();
    console.log("allMasterData", allMasterData)
    let genderList = this.sqliteService.getStaticDataById('Gender');
    console.log("genderList", genderList)
  }
}
